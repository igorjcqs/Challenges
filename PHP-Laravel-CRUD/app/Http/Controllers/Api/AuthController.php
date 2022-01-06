<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\mailApp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:sanctum", ['except' => ["register", "login", "send_email_checker", "check_email", "send_resetpass_email", "resetpass"]]);
    }

    private function generate_random_code()
    {

        $chars = "abcdefghijkmnopqrstuvwxyz023456789";
        srand((float)microtime() * 1000000);
        $i = 0;
        $code = '';

        while ($i <= 20) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $code = $code . $tmp;
            $i++;
        }
        return $code;
    }

    public function register(Request $req)
    {
        $req->validate([
            "name" => "required|string",
            "email" => "required|unique:users,email",
            "password" => "required|string|confirmed"
        ]);

        $user = User::create([
            "name" => $req->name,
            "email" => $req->email,
            "password" => Hash::make($req->password),
        ]);

        $token = $user->createToken("token-name")->plainTextToken;

        return response()->json([
            "success" => true,
            "user" => $user,
            "token" => $token
        ], 200);
    }

    public function login(Request $req)
    {
        $req->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        if (!Auth::attempt($req->only("email", "password"))) {
            return response()->json([
                "success" => false,
                "message" => "As credenciais fornecidas estão incorretas.",
            ], 400);
        }

        $user = User::where("email", $req["email"])->firstOrFail();
        $token = $user->createToken("token-name")->plainTextToken;

        return response()->json([
            "success" => true,
            "user" => $user,
            "token" => $token,
            "message" => "Log-in realizado com sucesso.",
        ], 200);
    }

    public function logout(Request $req)
    {
        $req->user()->currentAccessToken()->delete();

        return response()->json([
            "success" => true,
            "message" => "Usuário deslogado som sucesso.",
        ], 200);
    }

    public function send_email_checker(Request $req)
    {
        $req->validate([
            "email" => "required|email",
        ]);

        $user = User::where("email", $req["email"])->firstOrFail();

        if ($user->email_verified_at == null) {
            if ($user->email_verification_code == null) {
                $code = Hash::make($this->generate_random_code());
                $user->update([
                    'email_verification_code' => $code,
                ]);
                Mail::send(new mailApp($user, "Verificação de email.", $code));
                return response()->json([
                    "success" => true,
                    "message" => "E-mail enviado com sucesso.",
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Existe um email de verificação ativo.",
                ], 400);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Este email já foi verificado.",
            ], 400);
        }
    }

    public function check_email(Request $req, $email, $code)
    {
        $user = User::where("email", $req["email"])->firstOrFail();
        $user_code = $user->email_verification_code;
        $current_timestamp = Carbon::now()->toDateTimeString();

        if ($code == $user_code) {
            if ($user->email_verified_at == null) {
                $user->update([
                    'email_verified_at' => $current_timestamp,
                    'email_verification_code' => 'Email verified.',
                ]);
                return response()->json([
                    "success" => true,
                    "message" => "O e-mail ($email) foi verificado com sucesso."
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "O e-mail já foi verificado.",
                    "verified_at" => $user->email_verified_at,
                ], 400);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "O código de verificação está incorreto.",
            ], 400);
        }
    }

    public function change_password(Request $req)
    {
        $req->validate([
            "old_password" => "required",
            "new_password" => "required|min:6|max:100",
            "confirm_new_password" => "required|same:new_password",
        ]);

        $user = $req->user();

        if (Hash::check($req->old_password, $user->password)) {
            $user->update([
                "password" => Hash::make($req->new_password)
            ]);

            return response()->json([
                "success" => true,
                "message" => "Senha atualizada.",
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Senha antiga incorreta.",
            ], 400);
        }
    }

    public function send_resetpass_email(Request $req)
    {
        $req->validate([
            "email" => "required|email",
        ]);

        $user = User::where("email", $req["email"])->firstOrFail();

        if ($user->password_verification_code == null) {
            $code = Hash::make($this->generate_random_code());
            $user->update([
                'password_verification_code' => $code,
            ]);
            Mail::send(new mailApp($user, "Recuperação de senha.", $code));
            return response()->json([
                "success" => true,
                "message" => "E-mail de recuperação de senha enviado com sucesso.",
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Já foi enviado ao email do usuário um código de recuperação de senha.",
            ], 400);
        }
    }

    public function resetpass(Request $req, $email, $code)
    {
        $req->validate([
            "new_password" => "required|min:6|max:100",
            "confirm_new_password" => "required|same:new_password",
        ]);

        $user = User::where("email", $req["email"])->firstOrFail();
        $user_code = $user->password_verification_code;

        if ($code == $user_code) {
                $user->update([
                    'password' => $req->new_password,
                    'password_verification_code' => null,
                ]);
                return response()->json([
                    "success" => true,
                    "message" => "A senha da conta referente ao email: $email foi alterada com sucesso."
                ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "O código de verificação está incorreto.",
            ], 400);
        }
    }
}

<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class mailApp extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $subject, $code)
    {
        $this->user = $user;
        $this->user_email = $user->email;
        $this->subject = $subject;
        $this->code = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject( subject: $this->subject );
        $this->to( address: $this->user->email, name: $this->user->name );
        if($this->subject == "Verificação de email.") {
            return $this->view('mail.emailverify', [
                'subject'=>$this->subject,
                'user'=>$this->user->name,
                'user_email'=>$this->user_email,
                'code'=>$this->code,
            ]);
        } else if($this->subject == "Novo log-in detectado.") {
            return $this->view('mail.newlogin', [
                'subject'=>$this->subject,
                'user'=>$this->user->name,
            ]);
        } else if($this->subject == "Recuperação de senha.") {
            return $this->view('mail.resetpass', [
                'subject'=>$this->subject,
                'user'=>$this->user->name,
                'user_email'=>$this->user_email,
                'code'=>$this->code,
            ]);
        }
    }
}

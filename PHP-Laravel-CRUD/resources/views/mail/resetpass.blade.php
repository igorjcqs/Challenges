<h1 style="text-align: center;">{{ $subject }}</h1>

<p style="text-align: center;">Olá {{ $user }}</p>
<p style="text-align: center;">Para resetar sua senha <a href="{{ url('api/resetpassword/'.$user_email.'/'.$code) }}">CLIQUE AQUI</a></p>
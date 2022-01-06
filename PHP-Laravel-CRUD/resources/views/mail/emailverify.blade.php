<script>
    teste();

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function teste() {
        document.getElementById('mail_message').innerHTML = "TESTE: " + window.location;
    }
</script>

<h1 style="text-align: center;">{{ $subject }}</h1>

<p style="text-align: center;">Olá {{ $user }}</p>
<p style="text-align: center;">Para verificar seu email <a href="{{ url('api/verifyemail/'.$user_email.'/'.$code) }}">CLIQUE AQUI</a></p>
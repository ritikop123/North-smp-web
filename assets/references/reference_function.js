function switchPlatform(platform) {
    const btnJava = document.getElementById('btnJava');
    const btnBedrock = document.getElementById('btnBedrock');
    const inputUsername = document.getElementById('usernameInput');

    if (platform === 'java') {
        btnJava.classList.add('mode-active');
        btnJava.classList.remove('mode-inactive');
        btnBedrock.classList.add('mode-inactive');
        btnBedrock.classList.remove('mode-active');
        inputUsername.value = '';
    } else {
        btnBedrock.classList.add('mode-active');
        btnBedrock.classList.remove('mode-inactive');
        btnJava.classList.add('mode-inactive');
        btnJava.classList.remove('mode-active');
        inputUsername.value = '{{ config("bedrock-prefix") }}';
    }
}
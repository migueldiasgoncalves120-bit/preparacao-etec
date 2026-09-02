const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        message.textContent = "Preencha todos os campos.";
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Entrando...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        message.textContent = "E-mail ou senha incorretos.";
        loginBtn.disabled = false;
        loginBtn.textContent = "Entrar";
        return;
    }

    await supabaseClient.rpc("heartbeat");

    window.location.href = "index.html";
});
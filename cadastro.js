const signupBtn = document.getElementById("signupBtn");
const message = document.getElementById("message");

signupBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        message.textContent = "Preencha todos os campos.";
        return;
    }

    if (username.length < 3) {
        message.textContent = "O nome de usuário precisa ter pelo menos 3 caracteres.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "A senha precisa ter pelo menos 6 caracteres.";
        return;
    }

    signupBtn.disabled = true;
    signupBtn.textContent = "Criando...";

    const { data, error } =
        await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username
                }
            }
        });

    if (error) {
        message.textContent = error.message;
        signupBtn.disabled = false;
        signupBtn.textContent = "Criar conta";
        return;
    }

    message.textContent =
        "Conta criada! Verifique seu e-mail para confirmar a conta.";

    signupBtn.disabled = false;
    signupBtn.textContent = "Criar conta";
});

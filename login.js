const loginBtn =
    document.getElementById("loginBtn");

const forgotPasswordBtn =
    document.getElementById("forgotPasswordBtn");

const message =
    document.getElementById("message");


// ========================================
// LOGIN
// ========================================

loginBtn.addEventListener("click", async () => {

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const password =
        document
            .getElementById("password")
            .value;


    if (!email || !password) {

        message.textContent =
            "Preencha todos os campos.";

        return;
    }


    loginBtn.disabled = true;

    loginBtn.textContent =
        "Entrando...";


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email,
            password

        });


    if (error) {

        message.textContent =
            "E-mail ou senha incorretos.";

        loginBtn.disabled = false;

        loginBtn.textContent =
            "Entrar";

        return;
    }


    await supabaseClient.rpc("heartbeat");


    window.location.href =
        "index.html";

});


// ========================================
// ESQUECI MINHA SENHA
// ========================================

forgotPasswordBtn.addEventListener(
    "click",
    async () => {

        const email =
            document
                .getElementById("email")
                .value
                .trim();


        if (!email) {

            message.textContent =
                "Digite seu e-mail primeiro.";

            return;
        }


        forgotPasswordBtn.disabled =
            true;


        forgotPasswordBtn.textContent =
            "Enviando...";


        const { error } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            window.location.origin +
                            "/redefinir-senha.html"
                    }
                );


        if (error) {

            console.error(error);

            message.textContent =
                "Não foi possível enviar o e-mail de recuperação.";

            forgotPasswordBtn.disabled =
                false;

            forgotPasswordBtn.textContent =
                "Esqueci minha senha";

            return;
        }


        message.textContent =
            "📧 Enviamos um link para seu e-mail. Verifique sua caixa de entrada.";

        forgotPasswordBtn.disabled =
            false;

        forgotPasswordBtn.textContent =
            "E-mail enviado ✓";

    }
);

function mostrarSenha(id, botao) {

    const campo = document.getElementById(id);

    if (campo.type === "password") {

        campo.type = "text";
        botao.textContent = "🙈";

    } else {

        campo.type = "password";
        botao.textContent = "👁️";

    }
}
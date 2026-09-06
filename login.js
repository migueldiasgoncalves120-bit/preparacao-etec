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
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        message.textContent =
            "Preencha todos os campos.";

        return;
    }


    loginBtn.disabled = true;
    loginBtn.textContent = "Entrando...";


    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


    if (error) {

        console.error("Erro de login:", error);

        message.textContent =
            "E-mail ou senha incorretos.";

        loginBtn.disabled = false;
        loginBtn.textContent = "Entrar";

        return;
    }


    await supabaseClient.rpc("heartbeat");


    window.location.href = "index.html";

});


// ========================================
// ESQUECI MINHA SENHA
// ========================================

forgotPasswordBtn.addEventListener(
    "click",
    async () => {

        const email =
            document.getElementById("email").value.trim();


        if (!email) {

            message.textContent =
                "Digite seu e-mail primeiro.";

            return;
        }


        forgotPasswordBtn.disabled = true;

        forgotPasswordBtn.textContent =
            "Enviando...";


        /*
        IMPORTANTE:

        Usa o endereço atual do site.

        Exemplo:
        https://seusite.netlify.app
        */

        const redirectUrl =
            window.location.origin +
            "/redefinir-senha.html";


        console.log(
            "URL de recuperação:",
            redirectUrl
        );


        const { error } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    email,
                    {
                        redirectTo: redirectUrl
                    }
                );


        if (error) {

            console.error(
                "Erro ao enviar recuperação:",
                error
            );


            // Mostra o erro real temporariamente
            message.textContent =
                "Erro: " + error.message;


            forgotPasswordBtn.disabled = false;

            forgotPasswordBtn.textContent =
                "Esqueci minha senha";

            return;
        }


        message.textContent =
            "📧 E-mail enviado! Verifique sua caixa de entrada.";


        forgotPasswordBtn.disabled = false;

        forgotPasswordBtn.textContent =
            "E-mail enviado ✓";

    }
);


// ========================================
// MOSTRAR / OCULTAR SENHA
// ========================================

function mostrarSenha(id, botao) {

    const campo =
        document.getElementById(id);


    if (!campo) return;


    if (campo.type === "password") {

        campo.type = "text";

        botao.textContent = "🙈";

        botao.setAttribute(
            "aria-label",
            "Ocultar senha"
        );

    } else {

        campo.type = "password";

        botao.textContent = "👁️";

        botao.setAttribute(
            "aria-label",
            "Mostrar senha"
        );

    }

}
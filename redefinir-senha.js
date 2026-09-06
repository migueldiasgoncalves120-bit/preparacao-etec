// ========================================
// REDEFINIR SENHA - PREPARAÇÃO ETEC
// ========================================

const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");


// ========================================
// VERIFICAR SESSÃO DE RECUPERAÇÃO
// ========================================

async function verificarSessao() {

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error || !data.session) {

        message.textContent =
            "Este link de recuperação é inválido ou expirou.";

        resetBtn.disabled = true;

        return false;
    }

    return true;
}


// ========================================
// ALTERAR SENHA
// ========================================

resetBtn.addEventListener("click", async () => {

    const permitido = await verificarSessao();

    if (!permitido) return;


    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (!password || !confirmPassword) {

        message.textContent =
            "Preencha os dois campos.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "As senhas não são iguais.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "A senha precisa ter pelo menos 6 caracteres.";

        return;
    }


    resetBtn.disabled = true;

    resetBtn.textContent =
        "Alterando...";


    const { error } =
        await supabaseClient.auth.updateUser({
            password: password
        });


    if (error) {

        console.error(
            "Erro ao alterar senha:",
            error
        );

        message.textContent =
            "Não foi possível alterar a senha: " +
            error.message;

        resetBtn.disabled = false;

        resetBtn.textContent =
            "Alterar senha";

        return;
    }


    message.textContent =
        "✅ Senha alterada com sucesso!";


    resetBtn.textContent =
        "Senha alterada ✓";


    // Encerra a sessão de recuperação

    await supabaseClient.auth.signOut();


    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1800);

});


// ========================================
// INICIAR
// ========================================

verificarSessao();

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
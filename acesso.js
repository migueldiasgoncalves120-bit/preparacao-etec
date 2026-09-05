let acessoLiberado = false;


async function verificarAcesso() {

    const { data: usuarioData, error: usuarioError } =
        await supabaseClient.auth.getUser();

    if (usuarioError || !usuarioData.user) {
        acessoLiberado = false;
        return false;
    }

    const { data, error } =
        await supabaseClient.rpc("tem_acesso");

    if (error) {
        console.error("Erro ao verificar acesso:", error);
        acessoLiberado = false;
        return false;
    }

    acessoLiberado = data === true;

    return acessoLiberado;
}


async function tentarAbrirPagina(pagina) {

    const acesso = await verificarAcesso();

    if (!acesso) {

        const { data } =
            await supabaseClient.auth.getUser();

        if (!data.user) {
            window.location.href = "login.html";
            return;
        }

        abrirPopup();
        return;
    }

    mostrar(pagina);
}


function abrirPopup() {

    const popup =
        document.getElementById("popupAssinatura");

    if (popup) {
        popup.classList.add("ativo");
    }
}


function fecharPopup() {

    const popup =
        document.getElementById("popupAssinatura");

    if (popup) {
        popup.classList.remove("ativo");
    }
}


function assinar() {

    alert(
        "O sistema de pagamento está em fase Beta."
    );
}


async function atualizarUltimoAcesso() {

    const { data } =
        await supabaseClient.auth.getUser();

    if (!data.user) return;

    await supabaseClient.rpc(
        "atualizar_ultimo_acesso"
    );
}


atualizarUltimoAcesso();
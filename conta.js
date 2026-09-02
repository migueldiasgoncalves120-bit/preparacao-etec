async function carregarConta() {

    const usuarioInfo = document.getElementById("usuarioInfo");
    const entrarBtn = document.getElementById("entrarBtn");
    const criarContaBtn = document.getElementById("criarContaBtn");
    const sairBtn = document.getElementById("sairBtn");

    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user) {

        usuarioInfo.textContent = "Não conectado";

        entrarBtn.style.display = "inline-block";
        criarContaBtn.style.display = "inline-block";
        sairBtn.style.display = "none";

        return;
    }

    const user = data.user;

    const { data: perfil } = await supabaseClient
        .from("profiles")
        .select("username, role")
        .eq("id", user.id)
        .single();

    if (perfil) {
        usuarioInfo.textContent = "👤 " + perfil.username;
    } else {
        usuarioInfo.textContent = "👤 Usuário";
    }

    entrarBtn.style.display = "none";
    criarContaBtn.style.display = "none";
    sairBtn.style.display = "inline-block";

    // Atualiza o último acesso
    await supabaseClient.rpc("heartbeat");
}


async function sairDaConta() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Erro ao sair da conta.");
        return;
    }

    window.location.reload();
}


carregarConta();
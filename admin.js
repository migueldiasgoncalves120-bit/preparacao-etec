async function verificarAdmin() {

    const { data: usuarioData, error: usuarioError } =
        await supabaseClient.auth.getUser();

    if (usuarioError || !usuarioData.user) {

        window.location.href = "login.html";

        return false;
    }


    const usuario = usuarioData.user;


    const { data: perfil, error: perfilError } =
        await supabaseClient
            .from("profiles")
            .select("username, role")
            .eq("id", usuario.id)
            .single();


    if (
        perfilError ||
        !perfil ||
        perfil.role !== "admin"
    ) {

        alert("Você não tem permissão para acessar o painel.");

        window.location.href = "index.html";

        return false;
    }


    return true;
}



async function carregarUsuarios() {

    const permitido = await verificarAdmin();

    if (!permitido) return;


    const lista =
        document.getElementById("listaUsuarios");

    const mensagem =
        document.getElementById("mensagem");


    lista.innerHTML = `
        <tr>
            <td colspan="5">
                Carregando contas...
            </td>
        </tr>
    `;


    const { data: usuarios, error } =
        await supabaseClient
            .from("profiles")
            .select(
                "username, role, created_at, last_seen"
            )
            .order(
                "created_at",
                { ascending: false }
            );


    if (error) {

        console.error(error);

        lista.innerHTML = "";

        mensagem.textContent =
            "Erro ao carregar os usuários.";

        return;
    }


    lista.innerHTML = "";


    let admins = 0;

    let online = 0;


    const agora = Date.now();


    usuarios.forEach(usuario => {

        if (usuario.role === "admin") {
            admins++;
        }


        const ultimoAcesso =
            new Date(usuario.last_seen).getTime();


        const estaOnline =
            agora - ultimoAcesso <
            2 * 60 * 1000;


        if (estaOnline) {
            online++;
        }


        const criado =
            new Date(usuario.created_at)
                .toLocaleString("pt-BR");


        const ultimo =
            new Date(usuario.last_seen)
                .toLocaleString("pt-BR");


        const tipo =
            usuario.role === "admin"
                ? `<span class="admin">👑 Admin</span>`
                : `<span class="user">Usuário</span>`;


        const status =
            estaOnline
                ? `<span class="online">🟢 Online</span>`
                : `<span class="offline">⚪ Offline</span>`;


        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td class="usuario">
                ${escapeHTML(usuario.username)}
            </td>

            <td>
                ${tipo}
            </td>

            <td>
                ${criado}
            </td>

            <td>
                ${ultimo}
            </td>

            <td>
                ${status}
            </td>

        `;


        lista.appendChild(linha);

    });


    document.getElementById("totalUsuarios")
        .textContent = usuarios.length;


    document.getElementById("usuariosOnline")
        .textContent = online;


    document.getElementById("totalAdmins")
        .textContent = admins;


    mensagem.textContent =
        "Atualizado às " +
        new Date().toLocaleTimeString("pt-BR");
}



function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}



async function sair() {

    await supabaseClient.auth.signOut();

    window.location.href = "index.html";
}



carregarUsuarios();


setInterval(
    carregarUsuarios,
    15000
);
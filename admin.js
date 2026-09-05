// ========================================
// PAINEL ADMIN - PREPARAÇÃO ETEC
// ========================================

let usuariosAtuais = [];


// ========================================
// VERIFICAR ADMIN
// ========================================

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

        alert(
            "Você não tem permissão para acessar o painel."
        );

        window.location.href = "index.html";

        return false;
    }


    return true;
}



// ========================================
// CARREGAR USUÁRIOS
// ========================================

async function carregarUsuarios() {

    const permitido = await verificarAdmin();

    if (!permitido) return;


    const lista =
        document.getElementById("listaUsuarios");

    const mensagem =
        document.getElementById("mensagem");


    if (!lista) return;


    lista.innerHTML = `
        <tr>
            <td colspan="7">
                Carregando contas...
            </td>
        </tr>
    `;


    const { data: usuarios, error } =
        await supabaseClient.rpc(
            "listar_usuarios_admin"
        );


    if (error) {

        console.error(
            "Erro ao carregar usuários:",
            error
        );


        lista.innerHTML = "";


        if (mensagem) {

            mensagem.textContent =
                "Erro ao carregar os usuários.";

        }


        return;
    }


    usuariosAtuais = usuarios || [];


    lista.innerHTML = "";


    let admins = 0;

    let online = 0;


    const agora = Date.now();


    usuariosAtuais.forEach(usuario => {


        // ========================================
        // CONTAR ADMINS
        // ========================================

        if (usuario.role === "admin") {

            admins++;

        }


        // ========================================
        // VERIFICAR ONLINE
        // ========================================

        let estaOnline = false;


        if (usuario.last_seen) {

            const ultimoAcesso =
                new Date(
                    usuario.last_seen
                ).getTime();


            estaOnline =
                !isNaN(ultimoAcesso) &&
                agora - ultimoAcesso <
                2 * 60 * 1000;

        }


        if (estaOnline) {

            online++;

        }


        // ========================================
        // DATA DE CRIAÇÃO
        // ========================================

        const criado =
            usuario.created_at
                ? new Date(
                    usuario.created_at
                  ).toLocaleString("pt-BR")
                : "—";


        // ========================================
        // ÚLTIMO ACESSO
        // ========================================

        const ultimo =
            usuario.last_seen
                ? new Date(
                    usuario.last_seen
                  ).toLocaleString("pt-BR")
                : "Nunca";


        // ========================================
        // VENCIMENTO
        // ========================================

        let vencimento = "Sem acesso";

        let acessoAtivo = false;


        if (usuario.acesso_expira) {

            const dataExpira =
                new Date(
                    usuario.acesso_expira
                );


            vencimento =
                dataExpira.toLocaleString(
                    "pt-BR"
                );


            acessoAtivo =
                dataExpira.getTime() >
                Date.now();

        }


        // ========================================
        // TIPO
        // ========================================

        const tipo =
            usuario.role === "admin"

                ? `<span class="admin">
                    👑 Admin
                   </span>`

                : `<span class="user">
                    Usuário
                   </span>`;


        // ========================================
        // STATUS ONLINE
        // ========================================

        const status =
            estaOnline

                ? `<span class="online">
                    🟢 Online
                   </span>`

                : `<span class="offline">
                    ⚪ Offline
                   </span>`;


        // ========================================
        // STATUS DO ACESSO
        // ========================================

        const acesso =
            acessoAtivo

                ? `<span class="online">
                    🟢 Ativo
                   </span>`

                : `<span class="offline">
                    🔴 Expirado
                   </span>`;


        // ========================================
        // BOTÕES
        // ========================================

        let botoes = "";


        /*
            Não mostramos os controles
            para outro administrador.

            O admin continua podendo
            administrar os usuários normais.
        */

        if (usuario.role !== "admin") {

            botoes = `

                <button
                    class="btn-gratis"
                    onclick="dar30Dias('${usuario.id}')">

                    🎁 +30 dias

                </button>


                <button
                    class="btn-remover"
                    onclick="removerAcesso('${usuario.id}')">

                    🚫 Remover

                </button>

            `;

        } else {

            botoes = `
                <span class="admin">
                    🔒 Protegido
                </span>
            `;

        }


        // ========================================
        // CRIAR LINHA
        // ========================================

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td class="usuario">
                ${escapeHTML(
                    usuario.username || "Sem nome"
                )}
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
                ${vencimento}

                <br>

                ${acesso}

            </td>


            <td>
                ${status}
            </td>


            <td class="acoes-admin">
                ${botoes}
            </td>

        `;


        lista.appendChild(linha);

    });


    // ========================================
    // ESTATÍSTICAS
    // ========================================

    const totalUsuarios =
        document.getElementById(
            "totalUsuarios"
        );


    const usuariosOnline =
        document.getElementById(
            "usuariosOnline"
        );


    const totalAdmins =
        document.getElementById(
            "totalAdmins"
        );


    if (totalUsuarios) {

        totalUsuarios.textContent =
            usuariosAtuais.length;

    }


    if (usuariosOnline) {

        usuariosOnline.textContent =
            online;

    }


    if (totalAdmins) {

        totalAdmins.textContent =
            admins;

    }


    if (mensagem) {

        mensagem.textContent =
            "Atualizado às " +
            new Date()
                .toLocaleTimeString("pt-BR");

    }

}



// ========================================
// DAR 30 DIAS GRÁTIS
// ========================================

async function dar30Dias(id) {

    const usuario =
        usuariosAtuais.find(
            u => u.id === id
        );


    if (!usuario) {

        alert(
            "Usuário não encontrado."
        );

        return;
    }


    const nome =
        usuario.username ||
        "este usuário";


    const confirmar =
        confirm(
            `🎁 Dar 30 dias de acesso para "${nome}"?`
        );


    if (!confirmar) return;


    const { data, error } =
        await supabaseClient.rpc(
            "admin_dar_30_dias",
            {
                usuario_id: id
            }
        );


    if (error) {

        console.error(
            "Erro ao dar 30 dias:",
            error
        );


        alert(
            "Erro ao dar acesso:\n\n" +
            error.message
        );

        return;
    }


    if (!data) {

        alert(
            "Não foi possível encontrar o usuário."
        );

        return;
    }


    alert(
        `🎁 ${nome} recebeu 30 dias de acesso!`
    );


    await carregarUsuarios();
}



// ========================================
// REMOVER ACESSO
// ========================================

async function removerAcesso(id) {

    const usuario =
        usuariosAtuais.find(
            u => u.id === id
        );


    if (!usuario) {

        alert(
            "Usuário não encontrado."
        );

        return;
    }


    const nome =
        usuario.username ||
        "este usuário";


    const confirmar =
        confirm(
            `🚫 Remover o acesso de "${nome}"?`
        );


    if (!confirmar) return;


    const { data, error } =
        await supabaseClient.rpc(
            "admin_remover_acesso",
            {
                usuario_id: id
            }
        );


    if (error) {

        console.error(
            "Erro ao remover acesso:",
            error
        );


        alert(
            "Erro ao remover acesso:\n\n" +
            error.message
        );

        return;
    }


    if (!data) {

        alert(
            "Não foi possível encontrar o usuário."
        );

        return;
    }


    alert(
        `🚫 O acesso de ${nome} foi removido.`
    );


    await carregarUsuarios();
}



// ========================================
// PROTEÇÃO CONTRA HTML
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;
}



// ========================================
// SAIR
// ========================================

async function sair() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "index.html";
}



// ========================================
// INICIAR
// ========================================

carregarUsuarios();


// Atualizar a cada 15 segundos

setInterval(
    carregarUsuarios,
    15000
);
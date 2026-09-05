// ========================================
// PAINEL ADMIN - PREPARAÇÃO ETEC
// ========================================

let adminVerificado = false;


// ========================================
// VERIFICAR ADMIN
// ========================================

async function verificarAdmin() {

    console.log("🔐 Verificando administrador...");

    const {
        data: usuarioData,
        error: usuarioError
    } = await supabaseClient.auth.getUser();


    if (usuarioError || !usuarioData?.user) {

        console.error("Usuário não está logado.");

        window.location.href = "login.html";

        return false;
    }


    const usuario = usuarioData.user;


    const {
        data: perfil,
        error: perfilError
    } = await supabaseClient
        .from("profiles")
        .select("username, role")
        .eq("id", usuario.id)
        .single();


    if (perfilError || !perfil) {

        console.error(
            "Erro ao encontrar perfil:",
            perfilError
        );

        window.location.href = "sem-acesso.html";

        return false;
    }


    if (perfil.role !== "admin") {

        console.warn("Usuário não é admin.");

        window.location.href = "sem-acesso.html";

        return false;
    }


    console.log(
        "✅ Administrador confirmado:",
        perfil.username
    );


    adminVerificado = true;

    return true;
}



// ========================================
// CARREGAR USUÁRIOS
// ========================================

async function carregarUsuarios() {

    const lista =
        document.getElementById("listaUsuarios");


    if (!lista) return;


    if (!adminVerificado) {

        const permitido =
            await verificarAdmin();


        if (!permitido) return;

    }


    lista.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;">
                ⏳ Carregando contas...
            </td>
        </tr>
    `;


    console.log(
        "📡 Buscando usuários..."
    );


    const {
        data: usuarios,
        error
    } = await supabaseClient.rpc(
        "listar_usuarios_admin"
    );


    if (error) {

        console.error(
            "Erro ao listar usuários:",
            error
        );


        lista.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;color:red;">
                    ❌ Erro ao carregar usuários.
                </td>
            </tr>
        `;


        mostrarMensagem(
            "Erro: " + error.message
        );


        return;
    }


    if (!Array.isArray(usuarios)) {

        console.error(
            "Resposta inválida:",
            usuarios
        );


        lista.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;">
                    ⚠️ Nenhum usuário encontrado.
                </td>
            </tr>
        `;


        return;
    }


    lista.innerHTML = "";


    let admins = 0;
    let online = 0;


    const agora = Date.now();


    usuarios.forEach(usuario => {


        // ==================================
        // ADMIN
        // ==================================

        if (usuario.role === "admin") {

            admins++;

        }


        // ==================================
        // ONLINE
        // ==================================

        let estaOnline = false;


        if (usuario.last_seen) {

            const ultimo =
                new Date(
                    usuario.last_seen
                ).getTime();


            if (!isNaN(ultimo)) {

                estaOnline =
                    agora - ultimo <
                    2 * 60 * 1000;

            }

        }


        if (estaOnline) {

            online++;

        }


        // ==================================
        // DATAS
        // ==================================

        const criado =
            usuario.created_at
                ? new Date(
                    usuario.created_at
                ).toLocaleString("pt-BR")
                : "—";


        const ultimoAcesso =
            usuario.last_seen
                ? new Date(
                    usuario.last_seen
                ).toLocaleString("pt-BR")
                : "Nunca";


        const vencimento =
            usuario.acesso_expira
                ? new Date(
                    usuario.acesso_expira
                ).toLocaleString("pt-BR")
                : "Sem acesso";


        // ==================================
        // TIPO
        // ==================================

        const tipo =
            usuario.role === "admin"

                ? `
                    <span class="admin">
                        👑 Admin
                    </span>
                  `

                : `
                    <span class="user">
                        Usuário
                    </span>
                  `;


        // ==================================
        // STATUS
        // ==================================

        const status =
            estaOnline

                ? `
                    <span class="online">
                        🟢 Online
                    </span>
                  `

                : `
                    <span class="offline">
                        ⚪ Offline
                    </span>
                  `;


        // ==================================
        // AÇÕES
        // ==================================

        let acoes = "";


        if (usuario.role === "admin") {

            acoes = `
                <span>
                    👑 Administrador
                </span>
            `;

        } else {

            acoes = `
                <div class="acoes-usuario">

                    <button
                        class="btn-acao"
                        onclick="dar30Dias('${usuario.id}')">
                        🎁 Dar 30 dias
                    </button>

                    <button
                        class="btn-acao perigo"
                        onclick="removerAcesso('${usuario.id}')">
                        🚫 Remover acesso
                    </button>

                </div>
            `;

        }


        // ==================================
        // CRIAR LINHA
        // ==================================

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
                ${ultimoAcesso}
            </td>

            <td>
                ${vencimento}
            </td>

            <td>
                ${status}
            </td>

            <td>
                ${acoes}
            </td>

        `;


        lista.appendChild(linha);

    });


    // ==================================
    // ESTATÍSTICAS
    // ==================================

    const total =
        document.getElementById(
            "totalUsuarios"
        );


    const onlineElemento =
        document.getElementById(
            "usuariosOnline"
        );


    const adminsElemento =
        document.getElementById(
            "totalAdmins"
        );


    if (total) {

        total.textContent =
            usuarios.length;

    }


    if (onlineElemento) {

        onlineElemento.textContent =
            online;

    }


    if (adminsElemento) {

        adminsElemento.textContent =
            admins;

    }


    mostrarMensagem(
        "Atualizado às " +
        new Date()
            .toLocaleTimeString("pt-BR")
    );


    console.log(
        "✅ Painel atualizado:",
        usuarios.length,
        "usuários"
    );

}



// ========================================
// DAR 30 DIAS
// ========================================

async function dar30Dias(id) {

    if (!adminVerificado) {

        alert("Acesso negado.");

        return;
    }


    const confirmar =
        confirm(
            "Dar 30 dias de acesso para este usuário?"
        );


    if (!confirmar) return;


    console.log(
        "🎁 Concedendo 30 dias:",
        id
    );


    const {
        error
    } = await supabaseClient.rpc(
        "conceder_30_dias",
        {
            usuario_id: id
        }
    );


    if (error) {

        console.error(
            "Erro ao conceder acesso:",
            error
        );


        alert(
            "Não foi possível conceder os 30 dias.\n\n" +
            error.message
        );


        return;
    }


    alert(
        "✅ 30 dias de acesso concedidos!"
    );


    await carregarUsuarios();

}



// ========================================
// REMOVER ACESSO
// ========================================

async function removerAcesso(id) {

    if (!adminVerificado) {

        alert("Acesso negado.");

        return;
    }


    const confirmar =
        confirm(
            "Tem certeza que deseja remover o acesso deste usuário?"
        );


    if (!confirmar) return;


    console.log(
        "🚫 Removendo acesso:",
        id
    );


    const {
        error
    } = await supabaseClient.rpc(
        "remover_acesso",
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
            "Não foi possível remover o acesso.\n\n" +
            error.message
        );


        return;
    }


    alert(
        "✅ Acesso removido!"
    );


    await carregarUsuarios();

}



// ========================================
// PROTEÇÃO CONTRA HTML
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        String(text);


    return div.innerHTML;

}



// ========================================
// MENSAGEM
// ========================================

function mostrarMensagem(texto) {

    const mensagem =
        document.getElementById(
            "mensagem"
        );


    if (mensagem) {

        mensagem.textContent =
            texto;

    }

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

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "🚀 Painel Admin iniciado"
        );


        await carregarUsuarios();

    }
);



// ========================================
// ATUALIZAR A CADA 15 SEGUNDOS
// ========================================

setInterval(
    async function () {

        if (adminVerificado) {

            await carregarUsuarios();

        }

    },
    15000
);
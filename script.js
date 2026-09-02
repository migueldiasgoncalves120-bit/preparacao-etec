// ========================================
// PREPARAÇÃO ETEC - SCRIPT PRINCIPAL
// ========================================

// Datas
const DATA_INICIO = new Date("2026-09-01T00:00:00");
const DATA_PROVA = new Date("2026-12-06T13:30:00");

// ========================================
// CRONOGRAMA
// ========================================

const cronograma = [
    {
        materias: ["Matemática", "Português"],
        temas: ["Frações e operações", "Interpretação de texto"]
    },
    {
        materias: ["Ciências", "Matemática"],
        temas: ["Sistema Solar", "Porcentagem"]
    },
    {
        materias: ["História", "Português"],
        temas: ["Brasil Colônia", "Classes gramaticais"]
    },
    {
        materias: ["Geografia", "Matemática"],
        temas: ["Cartografia", "Regra de três"]
    },
    {
        materias: ["Português", "Ciências"],
        temas: ["Gêneros textuais", "Corpo humano"]
    },
    {
        materias: ["Matemática", "História"],
        temas: ["Equações do 1º grau", "Brasil Império"]
    },
    {
        materias: ["Geografia", "Português"],
        temas: ["Clima e vegetação", "Pontuação"]
    }
];

// ========================================
// AULAS
// ========================================

const aulas = [
    {
        materia: "Matemática",
        titulo: "Frações",
        conteudo: `
            <p>Uma fração representa uma parte de um todo.</p>

            <p>
                O número de cima é o <strong>numerador</strong>
                e o número de baixo é o <strong>denominador</strong>.
            </p>

            <p>
                Quando os denominadores são iguais,
                basta somar os numeradores.
            </p>
        `,
        exemplo: "2/5 + 1/5 = 3/5"
    },

    {
        materia: "Português",
        titulo: "Interpretação de texto",
        conteudo: `
            <p>Leia o texto com atenção antes de olhar as alternativas.</p>

            <p>
                Procure identificar a ideia principal,
                as informações importantes e o objetivo do autor.
            </p>

            <p>
                A resposta deve ser baseada no texto,
                e não apenas na sua opinião.
            </p>
        `,
        exemplo: "Leia → entenda a ideia principal → procure no texto as informações que comprovam a resposta."
    },

    {
        materia: "Ciências",
        titulo: "Sistema Solar",
        conteudo: `
            <p>O Sistema Solar é formado pelo Sol e pelos corpos que orbitam ao seu redor.</p>

            <p>
                Os oito planetas possuem diferentes tamanhos,
                características e distâncias em relação ao Sol.
            </p>
        `,
        exemplo: "A Terra é o terceiro planeta a partir do Sol."
    },

    {
        materia: "Matemática",
        titulo: "Porcentagem",
        conteudo: `
            <p>Porcentagem significa uma parte de 100.</p>

            <p>
                Para calcular uma porcentagem,
                podemos transformar o valor em decimal.
            </p>
        `,
        exemplo: "20% de 200 = 0,20 × 200 = 40."
    },

    {
        materia: "História",
        titulo: "Brasil Colônia",
        conteudo: `
            <p>
                Durante o período colonial,
                o Brasil estava sob domínio de Portugal.
            </p>

            <p>
                Entre as atividades econômicas importantes
                estavam a produção de açúcar e a mineração.
            </p>
        `,
        exemplo: "Portugal foi a metrópole responsável pelo domínio colonial do Brasil."
    },

    {
        materia: "Geografia",
        titulo: "Cartografia",
        conteudo: `
            <p>
                Cartografia é a área que estuda
                a representação do espaço por meio de mapas.
            </p>

            <p>
                Os mapas podem representar cidades,
                países, relevo, clima, população e muito mais.
            </p>
        `,
        exemplo: "A escala de um mapa relaciona a distância representada com a distância real."
    },

    {
        materia: "Matemática",
        titulo: "Regra de três",
        conteudo: `
            <p>
                A regra de três pode ser utilizada
                quando temos grandezas relacionadas
                e precisamos descobrir um valor desconhecido.
            </p>
        `,
        exemplo: "Se 2 cadernos custam R$10, então 4 cadernos custam R$20."
    },

    {
        materia: "Ciências",
        titulo: "Ecologia",
        conteudo: `
            <p>
                Ecologia estuda as relações entre
                os seres vivos e o ambiente.
            </p>

            <p>
                Água, temperatura e luz são exemplos
                de fatores abióticos.
            </p>
        `,
        exemplo: "Uma floresta possui seres vivos e fatores não vivos que interagem entre si."
    }
];

// ========================================
// QUESTÕES
// ========================================

const questoes = [

    // MATEMÁTICA

    {
        materia: "Matemática",
        pergunta: "Quanto é 3/5 + 1/5?",
        alternativas: ["2/5", "3/5", "4/5", "5/5", "1/5"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Quanto é 20% de 200?",
        alternativas: ["20", "30", "40", "50", "60"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Quanto é 15 × 4?",
        alternativas: ["45", "50", "55", "60", "65"],
        resposta: 3
    },

    {
        materia: "Matemática",
        pergunta: "Quanto é 120 ÷ 6?",
        alternativas: ["10", "15", "20", "25", "30"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Qual é a média de 6, 8 e 10?",
        alternativas: ["6", "7", "8", "9", "10"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Um quadrado possui lado de 5 cm. Qual é seu perímetro?",
        alternativas: ["10 cm", "15 cm", "20 cm", "25 cm", "30 cm"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Se 2 cadernos custam R$10, quanto custam 6 cadernos?",
        alternativas: ["R$20", "R$25", "R$30", "R$35", "R$40"],
        resposta: 2
    },

    {
        materia: "Matemática",
        pergunta: "Qual é o resultado de 7²?",
        alternativas: ["14", "21", "42", "49", "56"],
        resposta: 3
    },

    // PORTUGUÊS

    {
        materia: "Português",
        pergunta: "Em uma questão de interpretação, a resposta deve ser baseada principalmente:",
        alternativas: [
            "Na opinião do aluno",
            "No texto apresentado",
            "Na internet",
            "No título apenas",
            "Na alternativa mais longa"
        ],
        resposta: 1
    },

    {
        materia: "Português",
        pergunta: "Qual palavra é um substantivo?",
        alternativas: [
            "Bonito",
            "Correr",
            "Casa",
            "Rapidamente",
            "Estudar"
        ],
        resposta: 2
    },

    {
        materia: "Português",
        pergunta: "Qual frase está corretamente pontuada?",
        alternativas: [
            "Pedro vamos estudar.",
            "Pedro, vamos estudar.",
            "Pedro vamos, estudar.",
            "Pedro vamos estudar,",
            "Pedro, vamos, estudar."
        ],
        resposta: 1
    },

    {
        materia: "Português",
        pergunta: "Qual é o principal objetivo de um texto informativo?",
        alternativas: [
            "Informar",
            "Esconder informações",
            "Fazer contas",
            "Criar personagens",
            "Dar apenas opiniões"
        ],
        resposta: 0
    },

    {
        materia: "Português",
        pergunta: "Qual destas palavras é um verbo?",
        alternativas: [
            "Casa",
            "Azul",
            "Correr",
            "Mesa",
            "Feliz"
        ],
        resposta: 2
    },

    // CIÊNCIAS

    {
        materia: "Ciências",
        pergunta: "Qual planeta é conhecido como planeta vermelho?",
        alternativas: [
            "Terra",
            "Vênus",
            "Marte",
            "Júpiter",
            "Saturno"
        ],
        resposta: 2
    },

    {
        materia: "Ciências",
        pergunta: "Qual destes é um fator abiótico?",
        alternativas: [
            "Árvore",
            "Peixe",
            "Bactéria",
            "Água",
            "Pássaro"
        ],
        resposta: 3
    },

    {
        materia: "Ciências",
        pergunta: "Qual estrutura controla diversas atividades da célula?",
        alternativas: [
            "Núcleo",
            "Pele",
            "Osso",
            "Músculo",
            "Sangue"
        ],
        resposta: 0
    },

    {
        materia: "Ciências",
        pergunta: "Qual gás é essencial para a respiração humana?",
        alternativas: [
            "Oxigênio",
            "Hélio",
            "Hidrogênio",
            "Nitrogênio puro",
            "Metano"
        ],
        resposta: 0
    },

    // HISTÓRIA

    {
        materia: "História",
        pergunta: "Durante o período colonial, o Brasil estava sob domínio de qual país?",
        alternativas: [
            "Espanha",
            "França",
            "Portugal",
            "Inglaterra",
            "Itália"
        ],
        resposta: 2
    },

    {
        materia: "História",
        pergunta: "Qual atividade teve grande importância na economia colonial brasileira?",
        alternativas: [
            "Produção de açúcar",
            "Produção de computadores",
            "Indústria automobilística",
            "Produção de aviões",
            "Indústria de celulares"
        ],
        resposta: 0
    },

    {
        materia: "História",
        pergunta: "A Revolução Industrial começou primeiro em qual país?",
        alternativas: [
            "Brasil",
            "França",
            "Portugal",
            "Inglaterra",
            "Espanha"
        ],
        resposta: 3
    },

    // GEOGRAFIA

    {
        materia: "Geografia",
        pergunta: "O que a cartografia estuda?",
        alternativas: [
            "Somente os oceanos",
            "Mapas e representação do espaço",
            "Somente os animais",
            "Somente os planetas",
            "Somente o clima"
        ],
        resposta: 1
    },

    {
        materia: "Geografia",
        pergunta: "Qual destes é um elemento climático?",
        alternativas: [
            "Temperatura",
            "População",
            "Indústria",
            "Cidade",
            "Rodovia"
        ],
        resposta: 0
    },

    {
        materia: "Geografia",
        pergunta: "Urbanização está relacionada principalmente:",
        alternativas: [
            "Ao crescimento das áreas urbanas",
            "À formação dos oceanos",
            "À rotação da Terra",
            "À formação de vulcões",
            "À formação de estrelas"
        ],
        resposta: 0
    }
];

// ========================================
// DIA ATUAL
// ========================================

function obterDia() {

    const hoje = new Date();

    const diferenca =
        hoje.getTime() - DATA_INICIO.getTime();

    let dia =
        Math.floor(
            diferenca / (1000 * 60 * 60 * 24)
        ) + 1;

    if (dia < 1) {
        dia = 1;
    }

    return dia;
}

const diaAtual = obterDia();


// ========================================
// TROCAR PÁGINA
// ========================================

function mostrar(id) {

    document.querySelectorAll(".pagina").forEach(
        pagina => {
            pagina.classList.remove("ativa");
        }
    );

    const pagina =
        document.getElementById(id);

    if (pagina) {
        pagina.classList.add("ativa");
    }
}


// ========================================
// INÍCIO
// ========================================

function carregarInicio() {

    const plano =
        cronograma[
            (diaAtual - 1) % cronograma.length
        ];

    document.getElementById("diaTitulo").textContent =
        "📅 Dia " + diaAtual + " de preparação";

    document.getElementById("dataAtual").textContent =
        new Date().toLocaleDateString("pt-BR");

    document.getElementById("materia1").textContent =
        plano.materias[0];

    document.getElementById("tema1").textContent =
        plano.temas[0];

    document.getElementById("materia2").textContent =
        plano.materias[1];

    document.getElementById("tema2").textContent =
        plano.temas[1];

    atualizarContador();
}


// ========================================
// CONTADOR DA PROVA
// ========================================

function atualizarContador() {

    const agora = new Date();

    const diferenca =
        DATA_PROVA.getTime() -
        agora.getTime();

    const contador =
        document.getElementById("contador");

    if (!contador) return;

    if (diferenca <= 0) {

        contador.textContent =
            "🎓 Chegou o dia da prova!";

        return;
    }

    const dias =
        Math.ceil(
            diferenca /
            (1000 * 60 * 60 * 24)
        );

    contador.textContent =
        "⏳ Faltam " +
        dias +
        " dias para a prova";
}


// ========================================
// AULA
// ========================================

let aulaAtual = 0;

function carregarAula() {

    aulaAtual =
        (diaAtual - 1) % aulas.length;

    mostrarAula();
}


function mostrarAula() {

    const aula =
        aulas[aulaAtual];

    document.getElementById("tagAula").textContent =
        aula.materia;

    document.getElementById("tituloAula").textContent =
        aula.titulo;

    document.getElementById("conteudoAula").innerHTML =
        aula.conteudo;

    document.getElementById("exemploAula").textContent =
        aula.exemplo;
}


function proximaAula() {

    aulaAtual++;

    if (aulaAtual >= aulas.length) {
        aulaAtual = 0;
    }

    mostrarAula();
}


// ========================================
// QUESTÕES DO DIA
// ========================================

function embaralhar(array, seed) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        seed =
            (seed * 9301 + 49297) %
            233280;

        const j =
            Math.floor(
                (seed / 233280) *
                (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] =
        [
            copia[j],
            copia[i]
        ];
    }

    return copia;
}


function pegarQuestoes(numero) {

    const ordenadas =
        embaralhar(
            questoes,
            diaAtual * 123
        );

    return ordenadas.slice(
        0,
        Math.min(numero, ordenadas.length)
    );
}


// ========================================
// EXERCÍCIOS
// ========================================

let exerciciosDoDia = [];


function carregarExercicios() {

    exerciciosDoDia =
        pegarQuestoes(10);

    const lista =
        document.getElementById(
            "listaQuestoes"
        );

    if (!lista) return;

    lista.innerHTML = "";

    exerciciosDoDia.forEach(
        (questao, indice) => {

            lista.innerHTML +=
                criarQuestao(
                    questao,
                    indice,
                    "ex"
                );
        }
    );
}


// ========================================
// CRIAR QUESTÃO
// ========================================

function criarQuestao(
    questao,
    indice,
    prefixo
) {

    let html = `
        <div class="questao">

            <h3>
                ${indice + 1}.
                ${questao.pergunta}
            </h3>
    `;

    questao.alternativas.forEach(
        (alternativa, numero) => {

            const letra =
                String.fromCharCode(
                    65 + numero
                );

            html += `
                <label class="alternativa">

                    <input
                        type="radio"
                        name="${prefixo}${indice}"
                        value="${numero}"
                    >

                    ${letra}) ${alternativa}

                </label>
            `;
        }
    );

    html += `
        </div>
    `;

    return html;
}


// ========================================
// CORRIGIR EXERCÍCIOS
// ========================================

function corrigirExercicios() {

    let acertos = 0;

    exerciciosDoDia.forEach(
        (questao, indice) => {

            const selecionada =
                document.querySelector(
                    `input[name="ex${indice}"]:checked`
                );

            if (!selecionada) {
                return;
            }

            const resposta =
                Number(
                    selecionada.value
                );

            const acertou =
                resposta === questao.resposta;

            if (acertou) {
                acertos++;
            }

            salvarResultado(
                questao.materia,
                acertou
            );
        }
    );

    const total =
        exerciciosDoDia.length;

    const porcentagem =
        Math.round(
            (acertos / total) * 100
        );

    document.getElementById(
        "resultadoExercicios"
    ).innerHTML = `
        <div class="resultado">

            <h2>🎯 Resultado</h2>

            <h1>
                ${acertos}/${total}
            </h1>

            <p>
                Aproveitamento:
                <strong>${porcentagem}%</strong>
            </p>

            ${
                porcentagem >= 80
                ? "🔥 Excelente!"
                : porcentagem >= 60
                ? "👍 Muito bom!"
                : "💪 Continue treinando!"
            }

        </div>
    `;
}


// ========================================
// SIMULADO
// ========================================

let simuladoDoDia = [];


function carregarSimulado() {

    simuladoDoDia =
        pegarQuestoes(10);

    const lista =
        document.getElementById(
            "listaSimulado"
        );

    if (!lista) return;

    lista.innerHTML = "";

    simuladoDoDia.forEach(
        (questao, indice) => {

            lista.innerHTML +=
                criarQuestao(
                    questao,
                    indice,
                    "sim"
                );
        }
    );
}


function corrigirSimulado() {

    let acertos = 0;

    simuladoDoDia.forEach(
        (questao, indice) => {

            const selecionada =
                document.querySelector(
                    `input[name="sim${indice}"]:checked`
                );

            if (!selecionada) {
                return;
            }

            const resposta =
                Number(
                    selecionada.value
                );

            const acertou =
                resposta === questao.resposta;

            if (acertou) {
                acertos++;
            }

            salvarResultado(
                questao.materia,
                acertou
            );
        }
    );

    const total =
        simuladoDoDia.length;

    const porcentagem =
        Math.round(
            (acertos / total) * 100
        );

    document.getElementById(
        "resultadoSimulado"
    ).innerHTML = `
        <div class="resultado">

            <h2>🏆 Resultado do simulado</h2>

            <h1>
                ${acertos}/${total}
            </h1>

            <p>
                Aproveitamento:
                <strong>${porcentagem}%</strong>
            </p>

            ${
                porcentagem >= 80
                ? "🔥 Excelente desempenho!"
                : porcentagem >= 60
                ? "👍 Bom desempenho!"
                : "📚 Revise os conteúdos!"
            }

        </div>
    `;
}


// ========================================
// DESEMPENHO
// ========================================

function obterDesempenho() {

    const salvo =
        localStorage.getItem(
            "desempenhoEtec"
        );

    if (!salvo) {

        return {
            acertos: 0,
            erros: 0,
            materias: {}
        };
    }

    try {

        return JSON.parse(salvo);

    } catch {

        return {
            acertos: 0,
            erros: 0,
            materias: {}
        };
    }
}


function salvarResultado(
    materia,
    acertou
) {

    const dados =
        obterDesempenho();

    if (acertou) {
        dados.acertos++;
    } else {
        dados.erros++;
    }

    if (!dados.materias[materia]) {

        dados.materias[materia] = {
            acertos: 0,
            erros: 0
        };
    }

    if (acertou) {
        dados.materias[materia].acertos++;
    } else {
        dados.materias[materia].erros++;
    }

    localStorage.setItem(
        "desempenhoEtec",
        JSON.stringify(dados)
    );
}


function atualizarDesempenho() {

    const dados =
        obterDesempenho();

    const total =
        dados.acertos +
        dados.erros;

    const porcentagem =
        total === 0
        ? 0
        : Math.round(
            (dados.acertos / total) * 100
        );

    document.getElementById(
        "totalAcertos"
    ).textContent =
        dados.acertos;

    document.getElementById(
        "totalErros"
    ).textContent =
        dados.erros;

    document.getElementById(
        "porcentagem"
    ).textContent =
        porcentagem + "%";


    const container =
        document.getElementById(
            "materiasDesempenho"
        );

    if (!container) return;

    container.innerHTML = "";

    Object.keys(dados.materias)
        .forEach(materia => {

            const valores =
                dados.materias[materia];

            const totalMateria =
                valores.acertos +
                valores.erros;

            const porcentagemMateria =
                totalMateria === 0
                ? 0
                : Math.round(
                    valores.acertos /
                    totalMateria *
                    100
                );

            container.innerHTML += `

                <div class="materia-box">

                    <strong>
                        ${materia}
                    </strong>

                    <p>
                        ${valores.acertos}
                        acertos /
                        ${valores.erros}
                        erros -
                        ${porcentagemMateria}%
                    </p>

                    <div class="barra">

                        <div
                            style="
                                width:${porcentagemMateria}%;
                            "
                        ></div>

                    </div>

                </div>

            `;
        });
}


// ========================================
// LIMPAR DESEMPENHO
// ========================================

function limparDesempenho() {

    if (
        !confirm(
            "Deseja realmente apagar seu desempenho?"
        )
    ) {
        return;
    }

    localStorage.removeItem(
        "desempenhoEtec"
    );

    atualizarDesempenho();
}


// ========================================
// TIMER
// ========================================

let tempoRestante = 60 * 60;

let timerInterval = null;


function atualizarTimer() {

    const elemento =
        document.getElementById(
            "timer"
        );

    if (!elemento) return;

    const minutos =
        Math.floor(
            tempoRestante / 60
        );

    const segundos =
        tempoRestante % 60;

    elemento.textContent =
        String(minutos).padStart(2, "0")
        + ":"
        +
        String(segundos).padStart(2, "0");
}


function iniciarTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval =
        setInterval(
            function () {

                if (tempoRestante <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    timerInterval = null;

                    alert(
                        "🎉 Você completou 1 hora de estudo!"
                    );

                    return;
                }

                tempoRestante--;

                atualizarTimer();

            },
            1000
        );
}


function pausarTimer() {

    if (timerInterval !== null) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }
}


function resetarTimer() {

    pausarTimer();

    tempoRestante =
        60 * 60;

    atualizarTimer();
}


// ========================================
// INICIAR SITE
// ========================================

function iniciarSite() {

    carregarInicio();

    carregarAula();

    carregarExercicios();

    carregarSimulado();

    atualizarDesempenho();

    atualizarTimer();
}


// ========================================
// EXECUTAR
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarSite
);


// Atualiza o contador da prova
setInterval(
    atualizarContador,
    60000
);


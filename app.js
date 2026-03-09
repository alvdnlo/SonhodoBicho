// ===================================
// SONHO DO BICHO v2 — app.js
// API: Groq (llama-3.3-70b-versatile)
// ===================================

// ====================================================
// 🔑 COLOQUE SUA CHAVE DO GROQ AQUI
// Obtenha grátis em: https://console.groq.com
// ====================================================
const GROQ_API_KEY = "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";

// ---- Frases de loading ----
const LOADING_PHRASES = [
  "Falando com os espíritos do jogo...",
  "O papagaio do cambista tá pensando...",
  "Consultando o Livro dos Sonhos...",
  "Jogando os búzios na mesa...",
  "Pai Véio acendeu a vela...",
  "Os bichos estão se manifestando...",
  "Calculando os números do destino...",
  "O Pai Véio não erra, espera só...",
  "Passando a mão na cabeça dos bichos...",
  "Rezando três ave-marias pra garantir...",
];

// ---- Tabela dos Bichos ----
const BICHOS = {
  "Avestruz":   { grupo: "01", dezenas: ["01","02","03","04"], emoji: "🦤" },
  "Águia":      { grupo: "02", dezenas: ["05","06","07","08"], emoji: "🦅" },
  "Burro":      { grupo: "03", dezenas: ["09","10","11","12"], emoji: "🫏" },
  "Borboleta":  { grupo: "04", dezenas: ["13","14","15","16"], emoji: "🦋" },
  "Cachorro":   { grupo: "05", dezenas: ["17","18","19","20"], emoji: "🐕" },
  "Cabra":      { grupo: "06", dezenas: ["21","22","23","24"], emoji: "🐐" },
  "Carneiro":   { grupo: "07", dezenas: ["25","26","27","28"], emoji: "🐏" },
  "Camelo":     { grupo: "08", dezenas: ["29","30","31","32"], emoji: "🐪" },
  "Cobra":      { grupo: "09", dezenas: ["33","34","35","36"], emoji: "🐍" },
  "Coelho":     { grupo: "10", dezenas: ["37","38","39","40"], emoji: "🐇" },
  "Cavalo":     { grupo: "11", dezenas: ["41","42","43","44"], emoji: "🐎" },
  "Elefante":   { grupo: "12", dezenas: ["45","46","47","48"], emoji: "🐘" },
  "Galo":       { grupo: "13", dezenas: ["49","50","51","52"], emoji: "🐓" },
  "Gato":       { grupo: "14", dezenas: ["53","54","55","56"], emoji: "🐈" },
  "Jacaré":     { grupo: "15", dezenas: ["57","58","59","60"], emoji: "🐊" },
  "Leão":       { grupo: "16", dezenas: ["61","62","63","64"], emoji: "🦁" },
  "Macaco":     { grupo: "17", dezenas: ["65","66","67","68"], emoji: "🐒" },
  "Porco":      { grupo: "18", dezenas: ["69","70","71","72"], emoji: "🐖" },
  "Pavão":      { grupo: "19", dezenas: ["73","74","75","76"], emoji: "🦚" },
  "Peru":       { grupo: "20", dezenas: ["77","78","79","80"], emoji: "🦃" },
  "Touro":      { grupo: "21", dezenas: ["81","82","83","84"], emoji: "🐂" },
  "Tigre":      { grupo: "22", dezenas: ["85","86","87","88"], emoji: "🐅" },
  "Urso":       { grupo: "23", dezenas: ["89","90","91","92"], emoji: "🐻" },
  "Veado":      { grupo: "24", dezenas: ["93","94","95","96"], emoji: "🦌" },
  "Vaca":       { grupo: "25", dezenas: ["97","98","99","00"], emoji: "🐄" },
};

// ---- DOM ----
const dreamInput   = document.getElementById("dream-input");
const btnReveal    = document.getElementById("btn-reveal");
const loadingPhrase= document.getElementById("loading-phrase");
const errorMsg     = document.getElementById("error-msg");

// ---- Ctrl+Enter ----
dreamInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.ctrlKey) interpretDream();
});
btnReveal.addEventListener("click", interpretDream);

// ---- Show/hide sections ----
function showSection(name) {
  ["hero","input","loading","error","result"].forEach(s => {
    const el = document.getElementById(`${s}-section`);
    if (el) el.style.display = "none";
  });
  const target = document.getElementById(`${name}-section`);
  if (target) target.style.display = "block";
  // hero fica sempre visível
  document.getElementById("hero").style.display = "block";
}

// ---- Loading phrases animation ----
let loadingInterval = null;
function startLoading() {
  let i = 0;
  loadingPhrase.textContent = LOADING_PHRASES[0];
  loadingInterval = setInterval(() => {
    i = (i + 1) % LOADING_PHRASES.length;
    loadingPhrase.style.opacity = "0";
    setTimeout(() => {
      loadingPhrase.textContent = LOADING_PHRASES[i];
      loadingPhrase.style.opacity = "1";
    }, 300);
  }, 2500);
}
function stopLoading() {
  if (loadingInterval) clearInterval(loadingInterval);
}

// ---- System prompt ----
function buildSystemPrompt() {
  return `Você é o PAI VÉIO DO BICHO — o velho mais engraçado, sábio e sem papas na língua do subúrbio carioca.
Você é uma mistura de Bezerra da Silva com Chacrinha, temperado com uma pitada de Mussum e pitadas de espiritualidade de terreiro.
Você ADORA zoar o sonho da pessoa, tirar sarro da situação, mas no final entrega os números com seriedade de quem sabe o que faz.
Seu humor é CÔMICO, PICANTE e POPULAR — faz piada do sonho, compara com situações absurdas do cotidiano, usa trocadilhos ruins de propósito.
Você fala "cumpade", "oxe", "eita lasqueira", "tá bom demais", "isso aí é sinal", "num tô nem aí não" , "gagau" (quando se referir a bebida alcolica).

EXEMPLOS DO SEU ESTILO DE CONSELHO:
- "Cumpade, sonhaste com defunto e tá me perguntando de bicho?? O defunto era mais esperto que você! Mas tá bom, o Pai Véio não abandona ninguém..."
- "Eita sonho sem vergonha esse! A cobra apareceu porque você deve dinheiro pra alguém, confessa! Mas bora lá, os números não mentem..."
- "Olha só que sonho ordinário! Mas o Pai Véio é generoso, viu? Até pros sem-vergonha ele revela os números..."
- "Esse sonho cheira a traição e pastel de forno! Mas num importa, o bicho já falou..."

TABELA COMPLETA DOS 25 BICHOS:
Avestruz(01): 01,02,03,04 | Águia(02): 05,06,07,08 | Burro(03): 09,10,11,12 | Borboleta(04): 13,14,15,16
Cachorro(05): 17,18,19,20 | Cabra(06): 21,22,23,24 | Carneiro(07): 25,26,27,28 | Camelo(08): 29,30,31,32
Cobra(09): 33,34,35,36 | Coelho(10): 37,38,39,40 | Cavalo(11): 41,42,43,44 | Elefante(12): 45,46,47,48
Galo(13): 49,50,51,52 | Gato(14): 53,54,55,56 | Jacaré(15): 57,58,59,60 | Leão(16): 61,62,63,64
Macaco(17): 65,66,67,68 | Porco(18): 69,70,71,72 | Pavão(19): 73,74,75,76 | Peru(20): 77,78,79,80
Touro(21): 81,82,83,84 | Tigre(22): 85,86,87,88 | Urso(23): 89,90,91,92 | Veado(24): 93,94,95,96 | Vaca(25): 97,98,99,00

SÍMBOLOS DO LIVRO DOS SONHOS:
- Água/rio/mar → Cobra ou Jacaré
- Fogo/chamas → Galo ou Tigre
- Morte/defunto/caixão → Borboleta ou Cachorro
- Dinheiro/riqueza/ouro → Vaca ou Elefante
- Voar/pássaro/céu → Águia ou Avestruz
- Floresta/mato/selva → Leão ou Macaco
- Amor/coração/romance → Pavão ou Borboleta
- Criança/bebê → Coelho ou Carneiro
- Sangue/briga/ferimento → Touro ou Tigre
- Casa/família/lar → Cachorro ou Gato
- Cavalo/corrida/velocidade → Cavalo ou Touro
- Cobra específica → Cobra sempre
- Mar/peixe/nadar → Jacaré ou Cobra
- Festa/alegria/pagode → Macaco ou Pavão
- Comida/fome/churrasco → Porco ou Vaca
- Trabalho/chefe/emprego → Burro ou Camelo
- Viagem/estrada/mala → Camelo ou Cavalo
- Traição/mentira/inveja → Cobra ou Gato

RESPONDA APENAS COM JSON VÁLIDO, sem markdown, sem texto fora do JSON:
{
  "bicho_principal": "nome exato do bicho (ex: Cobra)",
  "bicho_emoji": "emoji do bicho",
  "grupo": "número do grupo (ex: 09)",
  "dezenas": ["33","34","35","36"],
  "bicho_secundario": "nome do bicho secundário",
  "bicho_secundario_emoji": "emoji",
  "milhar": "4 dígitos (ex: 3347)",
  "mega_sena": [5,12,23,34,45,58],
  "cor_nome": "nome técnico da cor (ex: Azul)",
  "cor_hex": "#código hex",
  "cor_poetico": "nome poético popular e engraçado (ex: Verde Inveja Alheia, Amarelo Fim de Mês)",
  "cor_uso": "dica cômica de como usar a cor no dia (1 frase com humor)",
  "times": [
    {"nome": "Flamengo", "mascote": "Urubu", "tipo": "BR", "emoji": "🔴⚫"},
    {"nome": "Real Madrid", "mascote": "Merengue", "tipo": "INT", "emoji": "⚪"},
    {"nome": "Palmeiras", "mascote": "Porco", "tipo": "BR", "emoji": "💚"},
    {"nome": "Barcelona", "mascote": "Culer", "tipo": "INT", "emoji": "🔴🔵"},
    {"nome": "Fluminense", "mascote": "Guerreiro", "tipo": "BR", "emoji": "🔴🟢⚪"}
  ],
  "conselho": "OBRIGATÓRIO: conselho CÔMICO do Pai Véio — comece ZOANDO o sonho da pessoa com humor popular, faça uma piada sobre o que apareceu no sonho, depois dê a revelação com energia e termine com uma frase de sabedoria torta. Use gírias cariocas, trocadilhos, exageros. Mínimo 4 frases bem humoradas."
}`;
}

// ---- Main function ----
async function interpretDream() {
  const dream = dreamInput.value.trim();
  if (!dream) {
    dreamInput.focus();
    dreamInput.style.borderColor = "var(--red)";
    setTimeout(() => dreamInput.style.borderColor = "", 1500);
    return;
  }

  if (GROQ_API_KEY === "SUA_CHAVE_AQUI") {
    alert("⚠️ Coloque sua chave do Groq no arquivo app.js!\n\nBusque por GROQ_API_KEY e troque 'SUA_CHAVE_AQUI' pela sua chave.\n\nObtenha grátis em: console.groq.com");
    return;
  }

  btnReveal.disabled = true;
  showSection("loading");
  startLoading();

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.85,
        max_tokens: 1200,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: `Meu sonho: ${dream}` }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Resposta inesperada da IA.");
    const result = JSON.parse(match[0]);

    stopLoading();
    renderResult(result);
    showSection("result");

  } catch (e) {
    stopLoading();
    console.error("Erro:", e);

    let msg = "Os espíritos tão com zica hoje... tenta de novo!";
    const err = e.message || "";
    if (err.includes("401") || err.includes("invalid_api_key") || err.includes("Unauthorized")) {
      msg = "🔑 Chave do Groq inválida! Verifique no arquivo app.js se copiou certo.";
    } else if (err.includes("429")) {
      msg = "⏳ Muita gente consultando o Pai Véio! Espera um segundo e tenta de novo.";
    } else if (err.includes("Failed to fetch") || err.includes("NetworkError")) {
      msg = "📡 Sem sinal! Verifique sua internet e tente novamente.";
    } else if (err.includes("JSON")) {
      msg = "🤔 O Pai Véio ficou confuso com esse sonho. Descreve de outro jeito!";
    }

    errorMsg.textContent = msg;
    showSection("error");

  } finally {
    btnReveal.disabled = false;
  }
}

// ---- Render result ----
function renderResult(r) {
  // Bicho principal
  const bichoData = BICHOS[r.bicho_principal] || {};
  document.getElementById("bicho-emoji").textContent = r.bicho_emoji || bichoData.emoji || "🐾";
  document.getElementById("bicho-nome").textContent  = r.bicho_principal || "?";
  document.getElementById("bicho-grupo").textContent = `Grupo ${r.grupo || bichoData.grupo || "?"} do Jogo do Bicho`;

  const dezenas = r.dezenas || bichoData.dezenas || [];
  document.getElementById("bicho-dezenas").innerHTML = dezenas
    .map(d => `<span class="dezena-pill">${d}</span>`).join("");

  // Bicho secundário
  if (r.bicho_secundario) {
    document.getElementById("bicho-secundario").innerHTML =
      `${r.bicho_secundario_emoji || "🐾"} Bicho secundário: <strong>${r.bicho_secundario}</strong>`;
  }

  // Milhar
  document.getElementById("milhar").textContent = r.milhar || "----";

  // Mega-Sena
  const megaEl = document.getElementById("mega");
  megaEl.innerHTML = (r.mega_sena || []).map((n, i) =>
    `<div class="mega-ball" style="animation-delay:${i*0.08}s">${String(n).padStart(2,"0")}</div>`
  ).join("");

  // Cor da sorte
  const hex = r.cor_hex || "#888";
  const circulo = document.getElementById("cor-circulo");
  circulo.style.background = hex;
  circulo.style.setProperty("--cor-shadow", hex + "66");
  circulo.style.boxShadow = `0 0 24px ${hex}88`;
  document.getElementById("cor-nome-poetico").textContent = r.cor_poetico || r.cor_nome || "";
  document.getElementById("cor-nome").textContent = r.cor_nome || "";
  document.getElementById("cor-uso").textContent  = r.cor_uso || "";

  // Times
  const timesEl = document.getElementById("times-list");
  timesEl.innerHTML = (r.times || []).map((t, i) => `
    <div class="time-item" style="animation-delay:${i*0.07}s">
      <div class="time-emoji">${t.emoji || "⚽"}</div>
      <div class="time-info">
        <div class="time-nome">${t.nome}</div>
        <div class="time-mascote">Mascote: ${t.mascote}</div>
      </div>
      <span class="time-tipo ${(t.tipo||"").toLowerCase()}">${t.tipo === "BR" ? "Brasileiro" : "Internacional"}</span>
    </div>`).join("");

  // Conselho
  document.getElementById("conselho-texto").textContent = r.conselho || "";
}

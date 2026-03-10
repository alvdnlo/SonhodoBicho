// ===================================
// SONHO DO BICHO v2 — app.js
// API: Groq (llama-3.3-70b-versatile)
// ===================================


const GROQ_API_KEY = "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";

// ---- Frases de loading (13s total, troca a cada ~2.5s) ----
const LOADING_PHRASES = [
  "Falando com os malandros do jogo...",
  "O papagaio do cambista tá pensando...",
  "Consultando o Livro dos Sonhos...",
  "Jogando os búzios na mesa...",
  "Pai Véio acendeu a vela...",
  "Os bichos estão por aí...",
  "Calculando os números do destino...",
  "O Pai Véio não erra, espera só...",
  "Passando a mão na cabeça dos bichos...",
  "Rezando três ave-marias pra garantir...",
  "O urubu voou, o sinal veio...",
  "Mexendo no baralho sagrado...",
  "Quase lá, o destino tá chegando...",
];

// ---- SVGs clássicos por bicho ----
const BICHO_SVG = {
  "Avestruz":  `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="55" rx="18" ry="14" fill="#f4a261"/><circle cx="40" cy="28" r="10" fill="#f4a261"/><line x1="40" y1="38" x2="40" y2="41" stroke="#f4a261" stroke-width="5"/><line x1="28" y1="62" x2="24" y2="76" stroke="#f4a261" stroke-width="4" stroke-linecap="round"/><line x1="52" y1="62" x2="56" y2="76" stroke="#f4a261" stroke-width="4" stroke-linecap="round"/><circle cx="36" cy="25" r="2.5" fill="#2c1a0e"/><path d="M36,22 L30,18" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/></svg>`,
  "Águia":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="45" rx="14" ry="18" fill="#e8604c"/><path d="M40,30 Q15,20 8,38 Q22,34 34,42" fill="#e8604c"/><path d="M40,30 Q65,20 72,38 Q58,34 46,42" fill="#e8604c"/><circle cx="35" cy="36" r="3" fill="#2c1a0e"/><circle cx="45" cy="36" r="3" fill="#2c1a0e"/><path d="M37,43 L40,50 L43,43" fill="#f5c842"/></svg>`,
  "Burro":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="50" rx="20" ry="14" fill="#9e7f5e"/><circle cx="40" cy="30" r="13" fill="#9e7f5e"/><path d="M33,18 L31,8 M33,18 L29,10" stroke="#9e7f5e" stroke-width="3" stroke-linecap="round"/><path d="M47,18 L49,8 M47,18 L51,10" stroke="#9e7f5e" stroke-width="3" stroke-linecap="round"/><circle cx="35" cy="28" r="3" fill="#2c1a0e"/><circle cx="45" cy="28" r="3" fill="#2c1a0e"/><path d="M37,35 Q40,39 43,35" stroke="#2c1a0e" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="26" y1="63" x2="24" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="35" y1="63" x2="34" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="45" y1="63" x2="46" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="54" y1="63" x2="56" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Borboleta": `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="40" rx="4" ry="18" fill="#9b5de5"/><ellipse cx="22" cy="30" rx="16" ry="12" fill="#e87fab" opacity=".9" transform="rotate(-20,22,30)"/><ellipse cx="58" cy="30" rx="16" ry="12" fill="#e87fab" opacity=".9" transform="rotate(20,58,30)"/><ellipse cx="22" cy="52" rx="12" ry="9" fill="#f5c842" opacity=".85" transform="rotate(15,22,52)"/><ellipse cx="58" cy="52" rx="12" ry="9" fill="#f5c842" opacity=".85" transform="rotate(-15,58,52)"/><line x1="38" y1="22" x2="30" y2="14" stroke="#9b5de5" stroke-width="1.5" stroke-linecap="round"/><line x1="42" y1="22" x2="50" y2="14" stroke="#9b5de5" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  "Cachorro":  `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="50" rx="19" ry="14" fill="#f4a261"/><circle cx="40" cy="30" r="13" fill="#f4a261"/><path d="M28,22 Q24,14 26,10 Q30,16 32,22" fill="#c0844a"/><path d="M52,22 Q56,14 54,10 Q50,16 48,22" fill="#c0844a"/><circle cx="35" cy="28" r="3" fill="#2c1a0e"/><circle cx="45" cy="28" r="3" fill="#2c1a0e"/><ellipse cx="40" cy="35" rx="5" ry="3.5" fill="#e87fab"/><path d="M35,38 Q40,43 45,38" stroke="#2c1a0e" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="26" y1="63" x2="24" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="35" y1="64" x2="34" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="45" y1="64" x2="46" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="54" y1="63" x2="56" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><path d="M59,52 Q70,48 68,58 Q62,58 59,54" fill="#f4a261"/></svg>`,
  "Cabra":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="50" rx="18" ry="13" fill="#9e7f5e"/><circle cx="40" cy="30" r="12" fill="#9e7f5e"/><path d="M33,20 Q30,12 34,8" stroke="#9e7f5e" stroke-width="3" stroke-linecap="round"/><path d="M47,20 Q50,12 46,8" stroke="#9e7f5e" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="28" r="2.5" fill="#2c1a0e"/><circle cx="44" cy="28" r="2.5" fill="#2c1a0e"/><path d="M40,42 Q40,50 38,56" stroke="#9e7f5e" stroke-width="3" stroke-linecap="round"/><line x1="27" y1="62" x2="25" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="63" x2="35" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="44" y1="63" x2="45" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="53" y1="62" x2="55" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Carneiro":  `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="19" ry="13" fill="#ede0cc"/><circle cx="40" cy="30" r="13" fill="#ede0cc"/><path d="M29,25 Q20,18 22,10 Q28,18 32,24" fill="#ede0cc" stroke="#ccc" stroke-width="1"/><path d="M51,25 Q60,18 58,10 Q52,18 48,24" fill="#ede0cc" stroke="#ccc" stroke-width="1"/><circle cx="35" cy="29" r="3" fill="#2c1a0e"/><circle cx="45" cy="29" r="3" fill="#2c1a0e"/><ellipse cx="40" cy="36" rx="4" ry="3" fill="#e87fab"/><line x1="27" y1="64" x2="25" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="65" x2="35" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/><line x1="44" y1="65" x2="45" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/><line x1="53" y1="64" x2="55" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Camelo":    `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="38" cy="55" rx="20" ry="12" fill="#f4a261"/><path d="M25,44 Q20,30 25,20 Q30,35 32,44" fill="#f4a261"/><path d="M45,40 Q42,25 46,18 Q50,30 50,40" fill="#c0844a"/><circle cx="25" cy="20" r="9" fill="#f4a261"/><circle cx="21" cy="17" r="2.5" fill="#2c1a0e"/><path d="M22,24 Q25,28 28,24" stroke="#2c1a0e" stroke-width="1.5" fill="none"/><line x1="24" y1="66" x2="22" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="34" y1="67" x2="33" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="44" y1="67" x2="45" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="54" y1="66" x2="56" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Cobra":     `<svg viewBox="0 0 80 80" fill="none"><path d="M15,65 Q20,40 40,45 Q60,50 65,30 Q68,18 58,12 Q48,6 42,18 Q36,30 48,35" stroke="#3a7d44" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="58" cy="12" r="7" fill="#3a7d44"/><circle cx="55" cy="9" r="2" fill="#2c1a0e"/><circle cx="61" cy="9" r="2" fill="#2c1a0e"/><path d="M56,16 L53,20 M60,16 L63,20" stroke="#e8604c" stroke-width="2" stroke-linecap="round"/></svg>`,
  "Coelho":    `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="17" ry="14" fill="#ede0cc"/><circle cx="40" cy="32" r="12" fill="#ede0cc"/><ellipse cx="33" cy="16" rx="4" ry="10" fill="#ede0cc" stroke="#ccc" stroke-width="1"/><ellipse cx="47" cy="16" rx="4" ry="10" fill="#ede0cc" stroke="#ccc" stroke-width="1"/><ellipse cx="33" cy="16" rx="2" ry="7" fill="#e87fab"/><ellipse cx="47" cy="16" rx="2" ry="7" fill="#e87fab"/><circle cx="36" cy="30" r="2.5" fill="#2c1a0e"/><circle cx="44" cy="30" r="2.5" fill="#2c1a0e"/><ellipse cx="40" cy="36" rx="4" ry="3" fill="#e87fab"/><circle cx="56" cy="56" r="5" fill="#ede0cc"/><line x1="26" y1="65" x2="24" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/><line x1="54" y1="65" x2="56" y2="76" stroke="#ede0cc" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Cavalo":    `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="42" cy="52" rx="20" ry="13" fill="#9e7f5e"/><path d="M26,42 Q22,25 28,15 Q34,28 34,42" fill="#9e7f5e"/><circle cx="28" cy="15" r="11" fill="#9e7f5e"/><path d="M24,6 Q20,2 22,8 Q24,4 26,8 Q27,4 29,8" fill="#2c1a0e"/><circle cx="24" cy="13" r="2.5" fill="#2c1a0e"/><path d="M24,20 Q28,24 32,20" stroke="#2c1a0e" stroke-width="1.5" fill="none"/><line x1="26" y1="64" x2="24" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="65" x2="35" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="48" y1="65" x2="49" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="58" y1="64" x2="60" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><path d="M62,50 Q72,44 70,55 Q64,55 62,50Z" fill="#9e7f5e"/></svg>`,
  "Elefante":  `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="42" cy="50" rx="22" ry="16" fill="#9e7f5e"/><circle cx="32" cy="32" r="16" fill="#9e7f5e"/><path d="M22,35 Q14,42 16,54 Q20,48 24,52" stroke="#9e7f5e" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M22,22 Q18,14 20,10" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><path d="M32,22 Q30,14 32,10" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><circle cx="26" cy="28" r="4" fill="#2c1a0e"/><circle cx="36" cy="28" r="4" fill="#2c1a0e"/><line x1="26" y1="65" x2="24" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="36" y1="66" x2="35" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="48" y1="66" x2="49" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="58" y1="65" x2="60" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/></svg>`,
  "Galo":      `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="18" ry="14" fill="#e8604c"/><circle cx="40" cy="30" r="12" fill="#e8604c"/><path d="M34,20 Q30,14 34,10 Q36,16 38,20" fill="#e87fab"/><path d="M40,20 Q40,12 44,10 Q42,16 42,20" fill="#e87fab"/><path d="M46,20 Q50,14 46,10 Q44,16 44,20" fill="#e87fab"/><path d="M28,36 Q24,34 26,40 Q28,38 30,36" fill="#f5c842"/><circle cx="36" cy="27" r="3" fill="#2c1a0e"/><path d="M38,64 Q40,72 42,64" stroke="#f5c842" stroke-width="5" stroke-linecap="round"/><path d="M36,64 Q34,72 32,68" stroke="#f5c842" stroke-width="4" stroke-linecap="round"/><line x1="46" y1="65" x2="54" y2="72" stroke="#f5c842" stroke-width="3" stroke-linecap="round"/><path d="M55,52 Q68,46 66,58 Q60,56 55,52Z" fill="#e8604c"/></svg>`,
  "Gato":      `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="17" ry="13" fill="#9e7f5e"/><circle cx="40" cy="30" r="13" fill="#9e7f5e"/><path d="M29,20 Q26,10 30,7 Q32,14 34,20" fill="#9e7f5e"/><path d="M51,20 Q54,10 50,7 Q48,14 46,20" fill="#9e7f5e"/><circle cx="35" cy="28" r="3" fill="#2c1a0e"/><circle cx="45" cy="28" r="3" fill="#2c1a0e"/><ellipse cx="40" cy="34" rx="4" ry="3" fill="#e87fab"/><path d="M30,32 L18,30 M30,34 L18,35 M30,36 L18,40" stroke="#ede0cc" stroke-width="1.5" stroke-linecap="round"/><path d="M50,32 L62,30 M50,34 L62,35 M50,36 L62,40" stroke="#ede0cc" stroke-width="1.5" stroke-linecap="round"/><path d="M57,52 Q68,55 65,62 Q60,58 56,57" fill="#9e7f5e"/><line x1="27" y1="64" x2="25" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="53" y1="64" x2="55" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Jacaré":    `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="48" rx="28" ry="10" fill="#3a7d44"/><ellipse cx="20" cy="40" rx="14" ry="7" fill="#3a7d44"/><ellipse cx="20" cy="56" rx="14" ry="7" fill="#3a7d44"/><circle cx="14" cy="38" r="3" fill="#2c1a0e"/><path d="M12,44 L14,40 L16,44 L18,40 L20,44 L22,40 L24,44 L26,40 L28,44" stroke="#ede0cc" stroke-width="1.5" fill="none"/><path d="M12,56 L14,52 L16,56 L18,52 L20,56 L22,52 L24,56 L26,52 L28,56" stroke="#ede0cc" stroke-width="1.5" fill="none"/><path d="M62,46 Q74,44 72,50 Q68,50 62,50Z" fill="#3a7d44"/></svg>`,
  "Leão":      `<svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="38" r="22" fill="none" stroke="#f5c842" stroke-width="10"/><circle cx="40" cy="40" r="16" fill="#f4a261"/><circle cx="34" cy="36" r="4" fill="#2c1a0e"/><circle cx="46" cy="36" r="4" fill="#2c1a0e"/><ellipse cx="40" cy="45" rx="6" ry="4" fill="#e87fab"/><path d="M34,48 Q40,55 46,48" stroke="#2c1a0e" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M26,35 L14,32 M26,38 L14,38 M26,41 L14,44" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/><path d="M54,35 L66,32 M54,38 L66,38 M54,41 L66,44" stroke="#f4a261" stroke-width="2" stroke-linecap="round"/><path d="M40,56 Q38,65 36,72 Q40,69 44,72 Q42,65 40,56Z" fill="#f4a261"/></svg>`,
  "Macaco":    `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="15" ry="12" fill="#9e7f5e"/><circle cx="40" cy="30" r="14" fill="#9e7f5e"/><circle cx="30" cy="34" r="8" fill="#c0844a"/><circle cx="50" cy="34" r="8" fill="#c0844a"/><circle cx="35" cy="26" r="3.5" fill="#2c1a0e"/><circle cx="45" cy="26" r="3.5" fill="#2c1a0e"/><ellipse cx="40" cy="36" rx="7" ry="5" fill="#c0844a"/><path d="M37,38 Q40,42 43,38" stroke="#2c1a0e" stroke-width="2" fill="none"/><path d="M20,30 Q10,24 12,35 Q16,34 20,34" fill="#9e7f5e"/><path d="M60,30 Q70,24 68,35 Q64,34 60,34" fill="#9e7f5e"/><line x1="28" y1="63" x2="26" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><line x1="52" y1="63" x2="54" y2="76" stroke="#9e7f5e" stroke-width="5" stroke-linecap="round"/><path d="M55,55 Q68,58 66,66 Q60,62 55,60" fill="#9e7f5e"/></svg>`,
  "Porco":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="50" rx="22" ry="16" fill="#e87fab"/><circle cx="34" cy="32" r="14" fill="#e87fab"/><ellipse cx="30" cy="38" rx="8" ry="6" fill="#f4a261"/><circle cx="28" cy="37" r="2" fill="#2c1a0e"/><circle cx="32" cy="37" r="2" fill="#2c1a0e"/><circle cx="40" cy="26" r="3.5" fill="#2c1a0e"/><path d="M50,28 Q58,22 56,32 Q52,30 50,28Z" fill="#e87fab"/><line x1="26" y1="65" x2="24" y2="76" stroke="#e87fab" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="66" x2="35" y2="76" stroke="#e87fab" stroke-width="5" stroke-linecap="round"/><line x1="46" y1="66" x2="47" y2="76" stroke="#e87fab" stroke-width="5" stroke-linecap="round"/><line x1="56" y1="65" x2="58" y2="76" stroke="#e87fab" stroke-width="5" stroke-linecap="round"/><path d="M62,52 Q68,62 62,64 Q60,58 60,54Z" fill="#e87fab"/></svg>`,
  "Pavão":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="58" rx="10" ry="8" fill="#2a9d8f"/><circle cx="40" cy="40" r="10" fill="#2a9d8f"/><path d="M40,30 Q20,10 15,20 Q25,22 35,32" fill="#3a7d44"/><path d="M40,30 Q30,8 40,5 Q42,18 42,30" fill="#2a9d8f"/><path d="M40,30 Q60,10 65,20 Q55,22 45,32" fill="#3a7d44"/><path d="M40,30 Q55,12 60,20 Q52,24 44,32" fill="#9b5de5"/><path d="M40,30 Q25,12 20,20 Q28,24 36,32" fill="#9b5de5"/><circle cx="36" cy="37" r="3" fill="#2c1a0e"/><path d="M35,44 L40,50 L45,44" fill="#f5c842"/><circle cx="18" cy="18" r="4" fill="#e8604c"/><circle cx="40" cy="5" r="4" fill="#e8604c"/><circle cx="62" cy="18" r="4" fill="#e8604c"/></svg>`,
  "Peru":      `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="54" rx="18" ry="13" fill="#9e7f5e"/><circle cx="38" cy="34" r="12" fill="#9e7f5e"/><path d="M30,26 Q24,20 26,14 Q30,20 32,26" fill="#e8604c"/><path d="M36,24 Q34,16 38,12 Q38,18 40,24" fill="#e87fab"/><path d="M42,24 Q44,16 42,12 Q40,18 40,24" fill="#f5c842"/><path d="M48,26 Q54,20 52,14 Q48,20 46,26" fill="#e8604c"/><circle cx="34" cy="32" r="3" fill="#2c1a0e"/><path d="M28,38 Q24,36 26,42 Q28,40 30,38" fill="#e8604c"/><line x1="28" y1="66" x2="26" y2="76" stroke="#f5c842" stroke-width="4" stroke-linecap="round"/><line x1="38" y1="67" x2="37" y2="76" stroke="#f5c842" stroke-width="4" stroke-linecap="round"/><line x1="48" y1="67" x2="49" y2="76" stroke="#f5c842" stroke-width="4" stroke-linecap="round"/></svg>`,
  "Touro":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="22" ry="14" fill="#9e7f5e"/><circle cx="40" cy="32" r="14" fill="#9e7f5e"/><path d="M28,22 Q18,14 16,8 Q24,16 30,22" fill="#9e7f5e"/><path d="M52,22 Q62,14 64,8 Q56,16 50,22" fill="#9e7f5e"/><circle cx="35" cy="29" r="4" fill="#2c1a0e"/><circle cx="45" cy="29" r="4" fill="#2c1a0e"/><ellipse cx="40" cy="37" rx="6" ry="4" fill="#c0844a"/><line x1="26" y1="65" x2="24" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="36" y1="66" x2="35" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="44" y1="66" x2="45" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="54" y1="65" x2="56" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/></svg>`,
  "Tigre":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="20" ry="13" fill="#f4a261"/><circle cx="40" cy="30" r="14" fill="#f4a261"/><path d="M30,18 L28,8 M34,17 L34,7 M46,17 L46,7 M50,18 L52,8" stroke="#2c1a0e" stroke-width="3" stroke-linecap="round"/><path d="M28,30 L22,28 M28,34 L22,35 M28,38 L22,40" stroke="#2c1a0e" stroke-width="2" stroke-linecap="round"/><path d="M52,30 L58,28 M52,34 L58,35 M52,38 L58,40" stroke="#2c1a0e" stroke-width="2" stroke-linecap="round"/><circle cx="35" cy="27" r="3.5" fill="#2c1a0e"/><circle cx="45" cy="27" r="3.5" fill="#2c1a0e"/><ellipse cx="40" cy="34" rx="5" ry="3.5" fill="#e87fab"/><path d="M36,38 Q40,43 44,38" stroke="#2c1a0e" stroke-width="2" fill="none"/><line x1="26" y1="64" x2="24" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="65" x2="35" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="44" y1="65" x2="45" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/><line x1="54" y1="64" x2="56" y2="76" stroke="#f4a261" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Urso":      `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="20" ry="14" fill="#9e7f5e"/><circle cx="40" cy="30" r="15" fill="#9e7f5e"/><circle cx="28" cy="20" r="8" fill="#9e7f5e"/><circle cx="52" cy="20" r="8" fill="#9e7f5e"/><circle cx="35" cy="27" r="4" fill="#2c1a0e"/><circle cx="45" cy="27" r="4" fill="#2c1a0e"/><ellipse cx="40" cy="36" rx="7" ry="5" fill="#c0844a"/><path d="M36,39 Q40,44 44,39" stroke="#2c1a0e" stroke-width="2" fill="none"/><line x1="26" y1="65" x2="24" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="36" y1="66" x2="35" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="44" y1="66" x2="45" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/><line x1="54" y1="65" x2="56" y2="76" stroke="#9e7f5e" stroke-width="6" stroke-linecap="round"/></svg>`,
  "Veado":     `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="16" ry="13" fill="#c0844a"/><circle cx="38" cy="32" r="12" fill="#c0844a"/><path d="M30,22 Q22,14 20,6 Q26,14 28,22" fill="#9e7f5e"/><path d="M28,22 Q24,12 28,6 Q30,14 32,22" fill="#9e7f5e"/><path d="M46,22 Q54,14 56,6 Q50,14 48,22" fill="#9e7f5e"/><path d="M48,22 Q52,12 48,6 Q46,14 44,22" fill="#9e7f5e"/><circle cx="34" cy="29" r="3" fill="#2c1a0e"/><circle cx="44" cy="29" r="3" fill="#2c1a0e"/><ellipse cx="38" cy="36" rx="5" ry="3.5" fill="#e87fab"/><line x1="28" y1="64" x2="26" y2="76" stroke="#c0844a" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="65" x2="35" y2="76" stroke="#c0844a" stroke-width="5" stroke-linecap="round"/><line x1="44" y1="65" x2="45" y2="76" stroke="#c0844a" stroke-width="5" stroke-linecap="round"/><line x1="52" y1="64" x2="54" y2="76" stroke="#c0844a" stroke-width="5" stroke-linecap="round"/></svg>`,
  "Vaca":      `<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="52" rx="22" ry="14" fill="#ede0cc"/><circle cx="36" cy="30" r="14" fill="#ede0cc"/><path d="M26,20 Q18,12 18,6 Q24,14 28,20" fill="#ede0cc"/><path d="M46,20 Q54,12 54,6 Q48,14 44,20" fill="#ede0cc"/><circle cx="31" cy="27" r="4" fill="#2c1a0e"/><circle cx="41" cy="27" r="4" fill="#2c1a0e"/><ellipse cx="36" cy="35" rx="6" ry="4" fill="#e87fab"/><ellipse cx="44" cy="62" rx="8" ry="5" fill="#e87fab"/><line x1="24" y1="65" x2="22" y2="76" stroke="#ede0cc" stroke-width="6" stroke-linecap="round"/><line x1="34" y1="66" x2="33" y2="76" stroke="#ede0cc" stroke-width="6" stroke-linecap="round"/><line x1="46" y1="66" x2="47" y2="76" stroke="#ede0cc" stroke-width="6" stroke-linecap="round"/><line x1="56" y1="65" x2="58" y2="76" stroke="#ede0cc" stroke-width="6" stroke-linecap="round"/></svg>`,
};

const SVG_DEFAULT = `<svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="30" stroke="#ede0cc" stroke-width="4"/><text x="40" y="52" text-anchor="middle" font-size="30">🐾</text></svg>`;

// ---- Tabela dos Bichos ----
const BICHOS = {
  "Avestruz":  { grupo:"01", dezenas:["01","02","03","04"] },
  "Águia":     { grupo:"02", dezenas:["05","06","07","08"] },
  "Burro":     { grupo:"03", dezenas:["09","10","11","12"] },
  "Borboleta": { grupo:"04", dezenas:["13","14","15","16"] },
  "Cachorro":  { grupo:"05", dezenas:["17","18","19","20"] },
  "Cabra":     { grupo:"06", dezenas:["21","22","23","24"] },
  "Carneiro":  { grupo:"07", dezenas:["25","26","27","28"] },
  "Camelo":    { grupo:"08", dezenas:["29","30","31","32"] },
  "Cobra":     { grupo:"09", dezenas:["33","34","35","36"] },
  "Coelho":    { grupo:"10", dezenas:["37","38","39","40"] },
  "Cavalo":    { grupo:"11", dezenas:["41","42","43","44"] },
  "Elefante":  { grupo:"12", dezenas:["45","46","47","48"] },
  "Galo":      { grupo:"13", dezenas:["49","50","51","52"] },
  "Gato":      { grupo:"14", dezenas:["53","54","55","56"] },
  "Jacaré":    { grupo:"15", dezenas:["57","58","59","60"] },
  "Leão":      { grupo:"16", dezenas:["61","62","63","64"] },
  "Macaco":    { grupo:"17", dezenas:["65","66","67","68"] },
  "Porco":     { grupo:"18", dezenas:["69","70","71","72"] },
  "Pavão":     { grupo:"19", dezenas:["73","74","75","76"] },
  "Peru":      { grupo:"20", dezenas:["77","78","79","80"] },
  "Touro":     { grupo:"21", dezenas:["81","82","83","84"] },
  "Tigre":     { grupo:"22", dezenas:["85","86","87","88"] },
  "Urso":      { grupo:"23", dezenas:["89","90","91","92"] },
  "Veado":     { grupo:"24", dezenas:["93","94","95","96"] },
  "Vaca":      { grupo:"25", dezenas:["97","98","99","00"] },
};

// ---- DOM ----
const dreamInput    = document.getElementById("dream-input");
const btnReveal     = document.getElementById("btn-reveal");
const loadingPhrase = document.getElementById("loading-phrase");
const errorMsg      = document.getElementById("error-msg");

dreamInput.addEventListener("keydown", e => { if (e.key === "Enter" && e.ctrlKey) interpretDream(); });
btnReveal.addEventListener("click", interpretDream);

// ---- Sections ----
function showSection(name) {
  ["input","loading","error","result"].forEach(s => {
    const el = document.getElementById(`${s}-section`);
    if (el) el.style.display = "none";
  });
  const t = document.getElementById(`${name}-section`);
  if (t) t.style.display = "block";
}

// ---- Loading ----
let loadingInterval = null;
function startLoading() {
  let i = 0;
  loadingPhrase.textContent = LOADING_PHRASES[0];
  loadingPhrase.style.opacity = "1";
  loadingInterval = setInterval(() => {
    loadingPhrase.style.opacity = "0";
    setTimeout(() => {
      i = (i + 1) % LOADING_PHRASES.length;
      loadingPhrase.textContent = LOADING_PHRASES[i];
      loadingPhrase.style.opacity = "1";
    }, 400);
  }, 2600);
}
function stopLoading() {
  if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
}

// ---- System prompt ----
function buildSystemPrompt() {
  return `Você é o PAI VÉIO DO BICHO — o velho mais engraçado, sábio e sem papas na língua do subúrbio carioca.
Você é uma mistura de Bezerra da Silva com Chacrinha, temperado com uma pitada de Mussum e pitadas de espiritualidade de terreiro.
Você ADORA zoar o sonho da pessoa, tirar sarro da situação, mas no final entrega os números com seriedade de quem sabe o que faz.
Seu humor é CÔMICO, PICANTE e POPULAR — faz piada do sonho, compara com situações absurdas do cotidiano, usa trocadilhos ruins de propósito.
Você fala "meu irmão", "oxe", "crê in Deus pai", "tá bom demais", "isso aí é sinal", "num tô nem aí não" "mandiga" "mé (para se referir a bebida).

EXEMPLOS DO SEU ESTILO DE CONSELHO:
- "Meu irmão, sonhaste com defunto e tá me perguntando de bicho?? O defunto era mais esperto que você! Mas tá bom, o Pai Véio não abandona ninguém..."
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

Escolha 3 times aleatórios dessa lista para retornar, variando sempre entre BR, NE e INT

RESPONDA APENAS COM JSON VÁLIDO, sem markdown, sem texto fora do JSON:
{
  "bicho_principal": "nome exato do bicho (ex: Cobra)",
  "grupo": "número do grupo (ex: 09)",
  "dezenas": ["33","34","35","36"],
  "bicho_secundario": "nome do bicho secundário",
  "milhar": "4 dígitos (ex: 3347)",
  "significado": "interpretação CÔMICA e popular do sonho em 2-3 frases — o que os símbolos do sonho representam segundo o Livro dos Sonhos, explicado com humor e gírias",
  "mega_sena": [5,12,23,34,45,58],
  "cor_nome": "nome técnico da cor (ex: Azul)",
  "cor_hex": "#código hex",
  "cor_poetico": "nome poético popular e engraçado (ex: Verde Inveja Alheia, Amarelo Fim de Mês)",
  "cor_uso": "dica cômica de como usar a cor no dia (1 frase com humor)",
  "times": [
    {"nome": "Flamengo", "mascote": "Urubu", "tipo": "BR", "emoji": "🔴⚫"},
  {"nome": "Corinthians", "mascote": "Fiel", "tipo": "BR", "emoji": "⚫⚪"},
  {"nome": "Palmeiras", "mascote": "Porco", "tipo": "BR", "emoji": "💚"},
  {"nome": "São Paulo", "mascote": "Tricolor", "tipo": "BR", "emoji": "🔴⚫⚪"},
  {"nome": "Fluminense", "mascote": "Guerreiro", "tipo": "BR", "emoji": "🔴🟢⚪"},
  {"nome": "Vasco", "mascote": "Gigante da Colina", "tipo": "BR", "emoji": "⚫⚪"},
  {"nome": "Botafogo", "mascote": "Manequinho", "tipo": "BR", "emoji": "⚫⚪"},
  {"nome": "Grêmio", "mascote": "Tricolor Gaúcho", "tipo": "BR", "emoji": "🔵⚫⚪"},
  {"nome": "Internacional", "mascote": "Colorado", "tipo": "BR", "emoji": "🔴⚪"},
  {"nome": "Atlético Mineiro", "mascote": "Galo", "tipo": "BR", "emoji": "⚫⚪"},
  {"nome": "Cruzeiro", "mascote": "Raposa", "tipo": "BR", "emoji": "🔵⚪"},
  {"nome": "Sport Recife", "mascote": "Leão da Ilha", "tipo": "NE", "emoji": "🔴⚫"},
  {"nome": "Náutico", "mascote": "Timbu", "tipo": "NE", "emoji": "🔴⚪"},
  {"nome": "Santa Cruz", "mascote": "Cobra Coral", "tipo": "NE", "emoji": "🔴⚫⚪"},
  {"nome": "Ceará", "mascote": "Vovô", "tipo": "NE", "emoji": "⚫⚪"},
  {"nome": "Fortaleza", "mascote": "Leão do Pici", "tipo": "NE", "emoji": "🔴🔵⚪"},
  {"nome": "Bahia", "mascote": "Esquadrão", "tipo": "NE", "emoji": "🔵🔴⚪"},
  {"nome": "Vitória", "mascote": "Leão da Barra", "tipo": "NE", "emoji": "🔴⚫"},
  {"nome": "CRB", "mascote": "Galo da Praia", "tipo": "NE", "emoji": "🔴⚫"},
  {"nome": "Real Madrid", "mascote": "Merengue", "tipo": "INT", "emoji": "⚪"},
  {"nome": "Barcelona", "mascote": "Culer", "tipo": "INT", "emoji": "🔴🔵"},
  {"nome": "Manchester City", "mascote": "Citizens", "tipo": "INT", "emoji": "🔵"},
  {"nome": "PSG", "mascote": "Parisien", "tipo": "INT", "emoji": "🔵🔴"},
  ],
  "conselho": "OBRIGATÓRIO: conselho CÔMICO do Pai Véio — comece ZOANDO o sonho da pessoa com humor popular, faça uma piada sobre o que apareceu no sonho, depois dê a revelação com energia e termine com uma frase de sabedoria torta. Use gírias cariocas, trocadilhos, exageros. Mínimo 4 frases bem humoradas."
}`;
}

// ---- Main function ----
async function interpretDream() {
  const dream = dreamInput.value.trim();
  if (!dream) {
    dreamInput.focus();
    dreamInput.style.borderColor = "var(--coral)";
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
        temperature: 0.9,
        max_tokens: 1400,
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

    // Aguarda mínimo de 5s no loading para dar clima
    await new Promise(r => setTimeout(r, 3000));

    stopLoading();
    renderResult(result);
    showSection("result");

  } catch (e) {
    stopLoading();
    console.error("Erro:", e);
    let msg = "Os espíritos tão com zica hoje... tenta de novo!";
    const err = e.message || "";
    if (err.includes("401") || err.includes("invalid_api_key") || err.includes("Unauthorized"))
      msg = "🔑 Chave do Groq inválida! Verifique no arquivo app.js.";
    else if (err.includes("429"))
      msg = "⏳ Muita gente consultando o Pai Véio! Espera um segundo e tenta de novo.";
    else if (err.includes("Failed to fetch") || err.includes("NetworkError"))
      msg = "📡 Sem sinal! Verifique sua internet e tente novamente.";
    else if (err.includes("JSON"))
      msg = "🤔 O Pai Véio ficou confuso com esse sonho. Descreve de outro jeito!";
    errorMsg.textContent = msg;
    showSection("error");
  } finally {
    btnReveal.disabled = false;
  }
}

// ---- Render ----
function renderResult(r) {
  // 1. Bicho
  const bichoData = BICHOS[r.bicho_principal] || {};
  const svg = BICHO_SVG[r.bicho_principal] || SVG_DEFAULT;
  document.getElementById("bicho-svg-wrap").innerHTML = svg;
  document.getElementById("bicho-nome").textContent  = r.bicho_principal || "?";
  document.getElementById("bicho-grupo").textContent = `Grupo ${r.grupo || bichoData.grupo || "?"} • Jogo do Bicho`;
  const dezenas = r.dezenas || bichoData.dezenas || [];
  document.getElementById("bicho-dezenas").innerHTML = dezenas.map(d =>
    `<span class="dezena-pill">${d}</span>`).join("");
  if (r.bicho_secundario)
    document.getElementById("bicho-secundario").innerHTML =
      `Bicho secundário: <strong>${r.bicho_secundario}</strong>`;

  // 2. Milhar
  document.getElementById("milhar").textContent = r.milhar || "----";

  // 3. Significado
  document.getElementById("significado").textContent = r.significado || "";

  // 4. Cor
  const hex = r.cor_hex || "#888";
  const circ = document.getElementById("cor-circulo");
  circ.style.background = hex;
  circ.style.boxShadow = `0 4px 20px ${hex}99`;
  document.getElementById("cor-nome-poetico").textContent = r.cor_poetico || r.cor_nome || "";
  document.getElementById("cor-nome").textContent  = r.cor_nome || "";
  document.getElementById("cor-uso").textContent   = r.cor_uso || "";

  // Times
  document.getElementById("times-list").innerHTML = (r.times || []).map((t, i) => `
    <div class="time-item" style="animation-delay:${i*0.07}s">
      <div class="time-escudo">${t.emoji || "⚽"}</div>
      <div><div class="time-nome">${t.nome}</div><div class="time-mascote">${t.mascote}</div></div>
      <span class="time-tipo ${(t.tipo||"").toLowerCase()}">${t.tipo === "BR" ? "BR" : "INT"}</span>
    </div>`).join("");

  // Mega
  document.getElementById("mega").innerHTML = (r.mega_sena || []).map((n, i) =>
    `<div class="mega-ball" style="animation-delay:${i*0.08}s">${String(n).padStart(2,"0")}</div>`
  ).join("");

  // 5. Conselho
  document.getElementById("conselho-texto").textContent = r.conselho || "";
}


const tipsDB = {
  detox: [
    "Stell dein Handy nachts in den Flugmodus. (Cal Newport)",
    "Verzichte 1 Stunde nach dem Aufstehen auf Social Media.",
    "Reduziere Bildschirmzeit mit App-Blockern wie 'One Sec'."
  ],
  mindfulness: [
    "Fokussiere dich 5 Minuten auf deinen Atem. (Jon Kabat-Zinn)",
    "Mache einen 'Bodyscan' von Kopf bis Fuß.",
    "Meditiere mit geschlossenen Augen – ohne Ziel."
  ],
  psychology: [
    "Dopamin motiviert dich zur Handlung – nicht zum Glück. (Anna Lembke)",
    "Weniger Reiz = mehr Sensibilität für echte Freude.",
    "Glück entsteht aus Verbindung, nicht aus Stimulation."
  ],
  movement: [
    "Kalte Dusche = natürlicher Dopamin-Reset. (Andrew Huberman)",
    "Tägliche Bewegung stabilisiert den Dopaminspiegel.",
    "Ein Spaziergang in der Natur wirkt wie ein Mini-Detox."
  ]
};

function openModal() {
  document.getElementById("tipsModal").style.display = "block";
}

function closeModal() {
  document.getElementById("tipsModal").style.display = "none";
}

function showTips(category) {
  const container = document.getElementById("tipsContent");
  container.innerHTML = "";
  tipsDB[category].forEach(tip => {
    const p = document.createElement("p");
    p.innerText = "💬 " + tip;
    container.appendChild(p);
  });
}

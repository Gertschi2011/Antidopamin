
const langSwitch = document.getElementById("langSwitch");
let currentLang = "de";

async function loadTranslations() {
    const res = await fetch("translations.json");
    return await res.json();
}

function updateLabels(translations, lang) {
    document.getElementById("title").innerText = translations[lang]["title"];
    document.getElementById("moodLabel").innerText = translations[lang]["mood"];
    document.getElementById("energyLabel").innerText = translations[lang]["energy"];
    document.getElementById("socialLabel").innerText = translations[lang]["social_media"];
    document.getElementById("whyUsed").placeholder = translations[lang]["why_opened"];
    document.getElementById("afterFeel").placeholder = translations[lang]["after_effect"];
    document.getElementById("activityLabel").innerText = translations[lang]["activities"];
    document.getElementById("reflectionLabel").innerText = translations[lang]["reflection"];
    langSwitch.innerText = lang === "de" ? "🇬🇧" : "🇩🇪";
}

langSwitch.addEventListener("click", async () => {
    const translations = await loadTranslations();
    currentLang = currentLang === "de" ? "en" : "de";
    updateLabels(translations, currentLang);
});

async function init() {
    const translations = await loadTranslations();
    updateLabels(translations, currentLang);
    loadChart();
}

function saveData() {
    const entry = {
        date: new Date().toLocaleDateString(),
        mood: document.getElementById("mood").value,
        energy: document.getElementById("energy").value
    };
    let data = JSON.parse(localStorage.getItem("entries") || "[]");
    data.push(entry);
    localStorage.setItem("entries", JSON.stringify(data));
    loadChart();
}

function loadChart() {
    const data = JSON.parse(localStorage.getItem("entries") || "[]");
    const labels = data.map(e => e.date);
    const moods = data.map(e => e.mood);
    const energies = data.map(e => e.energy);
    const ctx = document.getElementById("progressChart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mood',
                    data: moods,
                    borderColor: '#4caf50',
                    fill: false
                },
                {
                    label: 'Energy',
                    data: energies,
                    borderColor: '#ff9800',
                    fill: false
                }
            ]
        }
    });
}

window.onload = init;

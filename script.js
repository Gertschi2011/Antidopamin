
const langSwitch = document.getElementById("langSwitch");
let currentLang = "de";
let activityOptions = JSON.parse(localStorage.getItem("activityOptions") || "[]");

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

function populateDropdown() {
    const dropdown = document.getElementById("activityDropdown");
    dropdown.innerHTML = "";
    activityOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        dropdown.appendChild(option);
    });
}

function addCustomActivity() {
    const input = document.getElementById("customActivity");
    const value = input.value.trim();
    if (value && !activityOptions.includes(value)) {
        activityOptions.push(value);
        localStorage.setItem("activityOptions", JSON.stringify(activityOptions));
        populateDropdown();
        input.value = "";
    }
}

function saveData() {
    const entry = {
        date: new Date().toLocaleDateString(),
        mood: document.getElementById("mood").value,
        energy: document.getElementById("energy").value,
        activity: document.getElementById("activityDropdown").value
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

async function init() {
    const translations = await loadTranslations();
    updateLabels(translations, currentLang);
    if (activityOptions.length === 0) {
        activityOptions = ["Spaziergang", "Meditation", "Buch gelesen", "Gespräch", "Musik", "Sport"];
        localStorage.setItem("activityOptions", JSON.stringify(activityOptions));
    }
    populateDropdown();
    loadChart();
}

window.onload = init;

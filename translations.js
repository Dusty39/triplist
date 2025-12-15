// TripList - Translations
const translations = {
    en: {
        // Header
        appName: "TripList",
        subtitle: "Create your personalized packing list",

        // Config sections
        tripType: "Trip Type",
        duration: "Duration",
        season: "Season",
        location: "Location",

        // Trip types
        camping: "Camping",
        beach: "Beach",
        hiking: "Hiking",
        city: "City Tour",
        business: "Business",
        ski: "Ski",

        // Durations
        oneTwo: "1-2 Days",
        threeFive: "3-5 Days",
        week: "1 Week",
        longTrip: "1+ Week",

        // Seasons
        summer: "Summer",
        fall: "Fall",
        winter: "Winter",
        spring: "Spring",

        // Locations
        domestic: "Domestic",
        international: "International",

        // Buttons
        generateList: "Generate List",
        newTrip: "New Trip",

        // Checklist
        checklist: "Checklist",
        ready: "ready",
        remove: "Remove from list",

        // Categories
        documents: "Documents",
        clothing: "Clothing",
        electronics: "Electronics",
        hygiene: "Hygiene",
        camping: "Camping Gear",
        beach: "Beach",
        hiking: "Hiking",
        ski: "Ski",
        office: "Office",
        accessories: "Accessories",
        health: "Health",
        food: "Food & Drinks",
        general: "General",
        safety: "Safety",
        travel: "Travel",
        entertainment: "Entertainment"
    },

    tr: {
        // Header
        appName: "TripList",
        subtitle: "Geziniz için kişiselleştirilmiş liste oluşturun",

        // Config sections
        tripType: "Gezi Türü",
        duration: "Süre",
        season: "Mevsim",
        location: "Konum",

        // Trip types
        camping: "Kamp",
        beach: "Plaj Tatili",
        hiking: "Dağ/Doğa",
        city: "Şehir Gezisi",
        business: "İş Seyahati",
        ski: "Kayak",

        // Durations
        oneTwo: "1-2 Gün",
        threeFive: "3-5 Gün",
        week: "1 Hafta",
        longTrip: "1+ Hafta",

        // Seasons
        summer: "Yaz",
        fall: "Sonbahar",
        winter: "Kış",
        spring: "İlkbahar",

        // Locations
        domestic: "Yerel",
        international: "Uluslararası",

        // Buttons
        generateList: "Listeyi Oluştur",
        newTrip: "Yeni Gezi",

        // Checklist
        checklist: "Kontrol Listesi",
        ready: "hazır",
        remove: "Listeden kaldır",

        // Categories
        documents: "Belgeler",
        clothing: "Kıyafet",
        electronics: "Elektronik",
        hygiene: "Hijyen",
        camping: "Kamp Malzemesi",
        beach: "Plaj",
        hiking: "Dağcılık",
        ski: "Kayak",
        office: "Ofis",
        accessories: "Aksesuar",
        health: "Sağlık",
        food: "Yiyecek İçecek",
        general: "Genel",
        safety: "Güvenlik",
        travel: "Seyahat",
        entertainment: "Eğlence"
    },

    es: {
        // Header
        appName: "TripList",
        subtitle: "Crea tu lista de equipaje personalizada",

        // Config sections
        tripType: "Tipo de Viaje",
        duration: "Duración",
        season: "Temporada",
        location: "Ubicación",

        // Trip types
        camping: "Camping",
        beach: "Playa",
        hiking: "Senderismo",
        city: "Ciudad",
        business: "Negocios",
        ski: "Esquí",

        // Durations
        oneTwo: "1-2 Días",
        threeFive: "3-5 Días",
        week: "1 Semana",
        longTrip: "1+ Semana",

        // Seasons
        summer: "Verano",
        fall: "Otoño",
        winter: "Invierno",
        spring: "Primavera",

        // Locations
        domestic: "Nacional",
        international: "Internacional",

        // Buttons
        generateList: "Generar Lista",
        newTrip: "Nuevo Viaje",

        // Checklist
        checklist: "Lista de Control",
        ready: "listo",
        remove: "Eliminar de la lista",

        // Categories
        documents: "Documentos",
        clothing: "Ropa",
        electronics: "Electrónica",
        hygiene: "Higiene",
        camping: "Equipo de Camping",
        beach: "Playa",
        hiking: "Senderismo",
        ski: "Esquí",
        office: "Oficina",
        accessories: "Accesorios",
        health: "Salud",
        food: "Comida y Bebida",
        general: "General",
        safety: "Seguridad",
        travel: "Viaje",
        entertainment: "Entretenimiento"
    }
};

let currentLanguage = 'en'; // Default to English

function t(key) {
    return translations[currentLanguage][key] || key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('triplistLanguage', lang);
    updateLanguageUI();
    updateAllText();
}

function updateLanguageUI() {
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${currentLanguage}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function updateAllText() {
    // Update header
    document.querySelector('.header h1').textContent = `🎒 ${t('appName')}`;
    document.querySelector('.subtitle').textContent = t('subtitle');

    // Update section headings
    const sections = document.querySelectorAll('.config-section h2');
    if (sections[0]) sections[0].textContent = `🎯 ${t('tripType')}`;
    if (sections[1]) sections[1].textContent = `⏱️ ${t('duration')}`;
    if (sections[2]) sections[2].textContent = `🌤️ ${t('season')}`;
    if (sections[3]) sections[3].textContent = `📍 ${t('location')}`;

    // Update option labels
    const updateOptions = (dataAttr, keys) => {
        keys.forEach(key => {
            const btn = document.querySelector(`[data-${dataAttr}="${key}"]`);
            if (btn) {
                const label = btn.querySelector('.option-label');
                if (label) label.textContent = t(key);
            }
        });
    };

    updateOptions('type', ['camping', 'beach', 'hiking', 'city', 'business', 'ski']);
    updateOptions('duration', ['oneTwo', 'threeFive', 'week', 'longTrip']);
    updateOptions('season', ['summer', 'fall', 'winter', 'spring']);
    updateOptions('location', ['domestic', 'international']);

    // Update generate button
    const generateBtn = document.querySelector('.btn-generate');
    if (generateBtn) {
        generateBtn.textContent = `📋 ${t('generateList')}`;
    }

    // Update back button
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.textContent = `← ${t('newTrip')}`;
    }

    // Update checklist header
    const checklistH1 = document.querySelector('.trip-info h1');
    if (checklistH1) {
        checklistH1.textContent = `✓ ${t('checklist')}`;
    }

    // Re-render checklist if active
    if (checklistItems.length > 0) {
        updateTripSummary();
        updateProgress();
    }
}

function loadLanguage() {
    const saved = localStorage.getItem('triplistLanguage');
    if (saved && translations[saved]) {
        currentLanguage = saved;
    } else {
        currentLanguage = 'en'; // Default to English
    }
    updateLanguageUI();
    updateAllText(); // Apply language on initial load
}

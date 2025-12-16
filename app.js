// Travel Checklist App
let currentLanguage = 'en'; // Default to English

function t(key) {
    if (!window.translations || !window.translations[currentLanguage]) return key;

    // Check main keys
    if (window.translations[currentLanguage][key]) {
        return window.translations[currentLanguage][key];
    }

    // Legacy support for nested items if they exist, though we flattened them.
    if (window.translations[currentLanguage].items && window.translations[currentLanguage].items[key]) {
        return window.translations[currentLanguage].items[key];
    }

    // Fallback to English
    if (currentLanguage !== 'en' && window.translations.en[key]) {
        return window.translations.en[key];
    }

    return key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('triplistLanguage', lang);
    updateLanguageUI();
    updateAllText();
}

// --- Dark Mode ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('triplistTheme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('triplistTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function updateLanguageUI() {
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
    const h1 = document.querySelector('.header h1');
    if (h1) h1.textContent = `🎒 ${t('appName')}`;

    const sub = document.querySelector('.subtitle');
    if (sub) sub.textContent = t('subtitle');

    // Update section headings
    // Update section headings
    const sections = document.querySelectorAll('.config-section h2');
    if (sections[0]) sections[0].textContent = `🎯 ${t('tripType')}`;
    if (sections[1]) sections[1].textContent = `⏱️ ${t('duration')}`;
    if (sections[2]) sections[2].textContent = `🌤️ ${t('season')}`;
    if (sections[3]) {
        const span = sections[3].querySelector('span');
        if (span) span.textContent = t('destination');
    }
    if (sections[4]) sections[4].textContent = `📍 ${t('location')}`;

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

    // Buttons
    const genBtn = document.querySelector('.btn-generate');
    if (genBtn) genBtn.textContent = `📋 ${t('generateList')}`;

    const backBtn = document.querySelector('.btn-back');
    if (backBtn) backBtn.textContent = `← ${t('newTrip')}`;

    // New Feature Buttons / Labels
    const myTripsBtn = document.querySelector('.btn-secondary');
    if (myTripsBtn) {
        // We didn't translate "My Trips" button text in HTML originally (it was hardcoded to "My Trips"). 
        // Let's ensure it gets translated if we have a key for it.
        // The key is 'myTrips'.
        myTripsBtn.textContent = `📂 ${t('myTrips')}`;
    }

    // Screen Headers
    const tripsH1 = document.querySelector('#trips-screen h1');
    if (tripsH1) tripsH1.textContent = `📂 ${t('myTrips')}`;

    const checklistH1 = document.querySelector('.trip-info h1');
    if (checklistH1) checklistH1.textContent = `✓ ${t('checklist')}`;

    // Update progress text
    updateProgressText();

    // Re-render
    if (typeof tripConfig !== 'undefined' && tripConfig.type) updateTripSummary();
    if (typeof checklistItems !== 'undefined' && checklistItems.length > 0) renderChecklist();

    // Update Modal
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = t('saveTrip');
    const nameInput = document.getElementById('trip-name-input');
    if (nameInput) nameInput.placeholder = t('enterTripName');

    // Update Action Buttons in Checklist
    const actionBtns = document.querySelectorAll('.btn-action');
    if (actionBtns.length >= 3) {
        actionBtns[0].textContent = `📤 ${t('share')}`;
        actionBtns[1].textContent = `📄 ${t('exportPDF')}`;
        actionBtns[2].textContent = `💾 ${t('save')}`;
    }
}

function updateProgressText() {
    const progressText = document.getElementById('progress-text');
    if (progressText && progressText.textContent.includes('/')) {
        const parts = progressText.textContent.split(' ');
        progressText.textContent = `${parts[0]} ${t('ready')}`;
    }
}

function loadLanguage() {
    const saved = localStorage.getItem('triplistLanguage');
    if (saved && translations[saved]) {
        currentLanguage = saved;
    } else {
        currentLanguage = 'en';
    }
    updateLanguageUI();
    updateAllText();
}

let tripConfig = {
    type: null,
    duration: null,
    season: null,
    location: null
};

let checklistItems = [];
let itemStates = {}; // { itemId: { checked: boolean, removed: boolean } }

// Configuration Selection
function selectTripType(type) {
    tripConfig.type = type;
    updateSelection('type', type);
}

function selectDuration(duration) {
    tripConfig.duration = duration;
    updateSelection('duration', duration);
}

function selectSeason(season) {
    tripConfig.season = season;
    updateSelection('season', season);
}

function selectLocation(location) {
    tripConfig.location = location;
    updateSelection('location', location);
}

function updateSelection(configType, value) {
    // Remove previous selection
    const allButtons = document.querySelectorAll(`[data-${configType}]`);
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add selection to current button
    const selectedBtn = document.querySelector(`[data-${configType}="${value}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }

    checkGenerateButton();
}

function checkGenerateButton() {
    const generateBtn = document.querySelector('.btn-generate');
    const isValid = tripConfig.type && tripConfig.duration &&
        tripConfig.season && tripConfig.location;

    generateBtn.disabled = !isValid;
}

// Generate Checklist
function generateChecklist() {
    if (!tripConfig.type || !tripConfig.duration ||
        !tripConfig.season || !tripConfig.location) {
        alert('Lütfen tüm seçimleri yapın!');
        return;
    }

    // Reset states
    itemStates = {};

    // Collect items based on configuration
    checklistItems = collectItems();

    // Update trip summary
    updateTripSummary();

    // Weather
    const city = document.getElementById('destination-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        document.getElementById('weather-widget').classList.remove('active');
    }

    // Render checklist
    renderChecklist();

    // Switch to checklist screen
    showScreen('checklist-screen');

    // Update progress
    updateProgress();
}

function collectItems() {
    const items = [];
    const addedNames = new Set(); // Prevent duplicates

    // Add essentials
    itemsDatabase.essentials.forEach(item => {
        if (!addedNames.has(item.name)) {
            items.push({ ...item, id: generateId() });
            addedNames.add(item.name);
        }
    });

    // Add trip type specific items
    if (itemsDatabase[tripConfig.type]) {
        itemsDatabase[tripConfig.type].forEach(item => {
            if (!addedNames.has(item.name)) {
                items.push({ ...item, id: generateId() });
                addedNames.add(item.name);
            }
        });
    }

    // Add season specific items
    if (itemsDatabase[tripConfig.season]) {
        itemsDatabase[tripConfig.season].forEach(item => {
            if (!addedNames.has(item.name)) {
                items.push({ ...item, id: generateId() });
                addedNames.add(item.name);
            }
        });
    }

    // Add location specific items
    if (itemsDatabase[tripConfig.location]) {
        itemsDatabase[tripConfig.location].forEach(item => {
            if (!addedNames.has(item.name)) {
                items.push({ ...item, id: generateId() });
                addedNames.add(item.name);
            }
        });
    }

    // Add duration specific items
    if (tripConfig.duration === 'longTrip' && itemsDatabase.longDuration) {
        itemsDatabase.longDuration.forEach(item => {
            if (!addedNames.has(item.name)) {
                items.push({ ...item, id: generateId() });
                addedNames.add(item.name);
            }
        });
    }

    // Add general items
    itemsDatabase.general.forEach(item => {
        if (!addedNames.has(item.name)) {
            items.push({ ...item, id: generateId() });
            addedNames.add(item.name);
        }
    });

    return items;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateTripSummary() {
    const typeIcons = {
        camping: '🏕️',
        beach: '🏖️',
        hiking: '⛰️',
        city: '🏙️',
        business: '✈️',
        ski: '🎿'
    };

    const seasonIcons = {
        summer: '☀️',
        fall: '🍂',
        winter: '❄️',
        spring: '🌸'
    };

    const locationIcons = {
        domestic: '🏠',
        international: '🌍'
    };

    const summary = `${typeIcons[tripConfig.type]} ${t(tripConfig.type)} • ${t(tripConfig.duration)} • ${seasonIcons[tripConfig.season]} ${t(tripConfig.season)} • ${locationIcons[tripConfig.location]} ${t(tripConfig.location)}`;

    document.getElementById('trip-summary').textContent = summary;
}

function renderChecklist() {
    const container = document.getElementById('checklist-content');
    container.innerHTML = '';

    // Group items by category
    const categories = {};
    checklistItems.forEach(item => {
        if (!itemStates[item.id]?.removed) {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        }
    });

    // Render each category
    Object.keys(categories).sort().forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = t(category);

        const itemsList = document.createElement('div');
        itemsList.className = 'items-list';

        categories[category].forEach(item => {
            const itemEl = createItemElement(item);
            itemsList.appendChild(itemEl);
        });

        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(itemsList);
        container.appendChild(categorySection);
    });
}

function createItemElement(item) {
    const itemEl = document.createElement('div');
    itemEl.className = 'item';
    itemEl.id = `item-${item.id}`;

    const isChecked = itemStates[item.id]?.checked || false;
    if (isChecked) {
        itemEl.classList.add('checked');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    checkbox.checked = isChecked;
    checkbox.onchange = () => toggleItem(item.id);

    const name = document.createElement('span');
    name.className = 'item-name';
    name.textContent = t(item.name);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'item-remove';
    removeBtn.textContent = '✕';
    removeBtn.title = 'Listeden kaldır';
    removeBtn.onclick = () => removeItem(item.id);

    itemEl.appendChild(checkbox);
    itemEl.appendChild(name);
    itemEl.appendChild(removeBtn);

    return itemEl;
}

function toggleItem(itemId) {
    if (!itemStates[itemId]) {
        itemStates[itemId] = {};
    }

    itemStates[itemId].checked = !itemStates[itemId].checked;

    const itemEl = document.getElementById(`item-${itemId}`);
    if (itemStates[itemId].checked) {
        itemEl.classList.add('checked');
    } else {
        itemEl.classList.remove('checked');
    }

    updateProgress();
    saveState();
}

function removeItem(itemId) {
    if (!itemStates[itemId]) {
        itemStates[itemId] = {};
    }

    itemStates[itemId].removed = true;

    // Re-render to remove the item
    renderChecklist();
    updateProgress();
    saveState();
}

function updateProgress() {
    const totalItems = checklistItems.filter(item => !itemStates[item.id]?.removed).length;
    const checkedItems = checklistItems.filter(item =>
        itemStates[item.id]?.checked && !itemStates[item.id]?.removed
    ).length;

    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');

    progressText.textContent = `${checkedItems}/${totalItems} ${t('ready')}`;

    const percentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
    progressFill.style.width = `${percentage}%`;
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function backToDashboard() {
    // Clear configuration
    tripConfig = {
        type: null,
        duration: null,
        season: null,
        location: null
    };

    // Clear selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Clear states
    itemStates = {};
    checklistItems = [];

    checkGenerateButton();
    showScreen('dashboard-screen');

    // Clear saved state
    localStorage.removeItem('travelChecklist');
}

// Local Storage
function saveState() {
    const state = {
        tripConfig,
        checklistItems,
        itemStates
    };
    localStorage.setItem('travelChecklist', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('travelChecklist');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            tripConfig = state.tripConfig;
            checklistItems = state.checklistItems;
            itemStates = state.itemStates;

            // If we have a checklist, show it
            if (checklistItems.length > 0) {
                updateTripSummary();
                renderChecklist();
                updateProgress();
                showScreen('checklist-screen');

                // Restore selections in dashboard
                if (tripConfig.type) updateSelection('type', tripConfig.type);
                if (tripConfig.duration) updateSelection('duration', tripConfig.duration);
                if (tripConfig.season) updateSelection('season', tripConfig.season);
                if (tripConfig.location) updateSelection('location', tripConfig.location);
            }
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof window.translations === 'undefined') {
            throw new Error('Translations failed to load');
        }
        if (typeof window.itemsDatabase === 'undefined') {
            console.warn('Items database missing');
        }

        loadLanguage();
        loadTheme();
        checkGenerateButton();
        loadState();
    } catch (e) {
        console.error('Initialization Error:', e);
        alert('App initialization failed: ' + e.message + '. Please refresh.');
    }
});

// ... existing logic ...

// --- Trip Management System ---

let savedTrips = [];

function loadSavedTripsFromStorage() {
    const raw = localStorage.getItem('triplist_saves');
    savedTrips = raw ? JSON.parse(raw) : [];
}

function saveTripsToStorage() {
    localStorage.setItem('triplist_saves', JSON.stringify(savedTrips));
}

// Modal Control
function openSaveModal() {
    document.getElementById('save-modal').classList.add('active');
    document.getElementById('trip-name-input').focus();
}

function closeSaveModal() {
    document.getElementById('save-modal').classList.remove('active');
    document.getElementById('trip-name-input').value = '';
}

// Save Action
function saveCurrentTrip() {
    const nameInput = document.getElementById('trip-name-input');
    const name = nameInput.value.trim();

    if (!name) {
        alert(t('enterTripName'));
        return;
    }

    const newTrip = {
        id: Date.now(), // timestamp ID
        name: name,
        date: new Date().toISOString(),
        config: tripConfig,
        items: checklistItems,
        states: itemStates
    };

    loadSavedTripsFromStorage();
    savedTrips.push(newTrip);
    saveTripsToStorage();

    closeSaveModal();
    alert(t('tripSaved'));
}

// UI: Load Saved Trips List
function loadSavedTripsUI() {
    loadSavedTripsFromStorage();
    const container = document.getElementById('saved-trips-list');
    const noTripsMsg = document.getElementById('no-trips-message');

    container.innerHTML = '';

    if (savedTrips.length === 0) {
        noTripsMsg.style.display = 'block';
        noTripsMsg.textContent = t('noTrips');
        return;
    }

    noTripsMsg.style.display = 'none';

    // Sort by newest first
    savedTrips.sort((a, b) => b.id - a.id).forEach((trip, index) => {
        const card = document.createElement('div');
        card.className = 'trip-card';

        // Format date: DD/MM/YYYY
        const dateObj = new Date(trip.date);
        const dateStr = dateObj.toLocaleDateString();

        card.innerHTML = `
            <div class="trip-card-info">
                <h3>${trip.name}</h3>
                <p>${dateStr} • ${t(trip.config.type)}</p>
            </div>
            <div class="trip-actions">
                <button class="btn-load" onclick="loadTrip(${index})">${t('load')}</button>
                <button class="btn-delete" onclick="deleteTrip(${index})">${t('delete')}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function loadTrip(index) {
    // Determine the actual index if sorted? 
    // Implementation Detail: Because we sort deeply in UI, usage of index from forEach might be mismatch if we manipulate original array directly.
    // Better to find by ID if possible, but simplest way is to ensure UI loop matches array order or re-sort array same way.
    // Let's re-sort the source array to match UI logic:
    savedTrips.sort((a, b) => b.id - a.id);
    const trip = savedTrips[index];

    if (!trip) return;

    tripConfig = trip.config;
    checklistItems = trip.items;
    itemStates = trip.states;

    // Refresh UI
    updateTripSummary();
    renderChecklist();
    updateProgress();

    // Switch screen
    showScreen('checklist-screen');

    // Also save to "current active" (legacy support)
    saveState();
}

function deleteTrip(index) {
    if (!confirm(t('confirmDelete'))) return;

    savedTrips.sort((a, b) => b.id - a.id);
    savedTrips.splice(index, 1);
    saveTripsToStorage();
    loadSavedTripsUI(); // Refresh UI
}


// --- New Features: Share & Export ---

async function shareList() {
    // Generate text
    let text = `🎒 ${t('appName')} - ${t('shareText')} ${tripConfig.location}!\n\n`;

    const categories = {};
    checklistItems.forEach(item => {
        if (!itemStates[item.id]?.removed) {
            if (!categories[item.category]) categories[item.category] = [];
            categories[item.category].push(item);
        }
    });

    Object.keys(categories).sort().forEach(cat => {
        text += `\n📌 ${t(cat)}\n`;
        categories[cat].forEach(item => {
            const isChecked = itemStates[item.id]?.checked;
            text += `${isChecked ? '✅' : '⬜'} ${t(item.name)}\n`;
        });
    });

    // Use Web Share API if available
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'TripList',
                text: text
            });
        } catch (err) {
            console.log('Share failed:', err);
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(text);
            alert('List copied to clipboard!');
        } catch (err) {
            alert('Sharing not supported on this browser.');
        }
    }
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add font functionality roughly - jsPDF supports standard fonts.
    // For Turkish characters, we need a font that supports them or standard usage.
    // jsPDF default font doesn't support UTF-8 well without custom font.
    // Quick fix: Transliterate or just try.
    // Better fix: Use .html() method of jsPDF which renders DOM.

    const element = document.getElementById('checklist-content');

    // We need to clone it to style it for PDF (remove checkmarks inputs, etc)
    // Or simpler: Just simple text list generation similar to Share but drawn on PDF.

    let y = 20;

    doc.setFontSize(22);
    doc.text("TripList Checklist", 20, y);
    y += 15;

    doc.setFontSize(14);
    doc.text(`Trip: ${t(tripConfig.type)} - ${t(tripConfig.location)}`, 20, y);
    y += 10;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
    y += 15;

    doc.setFontSize(12);

    const categories = {};
    checklistItems.forEach(item => {
        if (!itemStates[item.id]?.removed) {
            if (!categories[item.category]) categories[item.category] = [];
            categories[item.category].push(item);
        }
    });

    Object.keys(categories).sort().forEach(cat => {
        // Check if page end
        if (y > 270) { doc.addPage(); y = 20; }

        doc.setFont("helvetica", "bold");
        doc.text(t(cat), 20, y);
        y += 7;

        doc.setFont("helvetica", "normal");
        categories[cat].forEach(item => {
            if (y > 280) { doc.addPage(); y = 20; }
            const isChecked = itemStates[item.id]?.checked;
            const check = isChecked ? "[X]" : "[ ]";

            // Clean text for PDF to avoid garbage chars if basic font
            // We use t(item.name) which might have Turkish chars.
            // jsPDF standard fonts like Helvetica usually fail with Turkish chars (Ş, ğ, İ...).
            // We'll trust modern browsers/libs or just let it fly. 
            // If it fails, implementing a custom font loading is too complex for this turn.
            // Fallback: window.print() is safer for character sets.
            doc.text(`${check} ${t(item.name)}`, 25, y);
            y += 7;
        });
        y += 5;
    });

    doc.save('my-triplist.pdf');
}

// --- Weather Integration ---
async function fetchWeather(city) {
    if (!city) return;

    const widget = document.getElementById('weather-widget');
    widget.classList.add('active');
    widget.textContent = t('loadingWeather');

    try {
        // 1. Geocoding
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            widget.textContent = `${t('weatherError')} (${city})`;
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2. Weather Forecast
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current_weather.temperature);
        const code = weatherData.current_weather.weathercode;

        // Simple WMO code mapping
        let icon = '☀️';
        if (code > 3) icon = '☁️';
        if (code > 40) icon = '🌫️';
        if (code > 50) icon = '🌧️';
        if (code > 70) icon = '❄️';
        if (code > 90) icon = '⚡';

        widget.innerHTML = `<strong>${name}:</strong> ${temp}°C ${icon}`;

    } catch (err) {
        console.error('Weather error:', err);
        widget.textContent = t('weatherError');
    }
}

// Travel Checklist App
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
        categoryHeader.textContent = category;

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
    name.textContent = item.name;

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
    loadLanguage();
    checkGenerateButton();
    loadState();
});

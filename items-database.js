// Travel Checklist Items Database
// Travel Checklist Items Database
window.itemsDatabase = {
    // Essential items shown for every trip
    essentials: [
        { name: "item_id_passport", category: "documents" },
        { name: "item_wallet_money", category: "documents" },
        { name: "item_phone", category: "electronics" },
        { name: "item_phone_charger", category: "electronics" },
        { name: "item_underwear", category: "clothing" },
        { name: "item_socks", category: "clothing" },
        { name: "item_toothbrush_paste", category: "hygiene" },
        { name: "item_sunglasses", category: "accessories" },
    ],

    // Trip Type specific items
    camping: [
        { name: "item_tent", category: "camping" },
        { name: "item_sleeping_bag", category: "camping" },
        { name: "item_sleeping_mat", category: "camping" },
        { name: "item_flashlight", category: "camping" },
        { name: "item_powerbank", category: "electronics" },
        { name: "item_multitool", category: "camping" },
        { name: "item_lighter_matches", category: "camping" },
        { name: "item_cooking_kit", category: "camping" },
        { name: "item_water_bottle", category: "camping" },
        { name: "item_camp_chair", category: "camping" },
        { name: "item_portable_stove", category: "camping" },
        { name: "item_cooler_bag", category: "camping" },
        { name: "item_first_aid_kit", category: "health" },
        { name: "item_bug_spray", category: "health" },
        { name: "item_sneakers", category: "clothing" },
        { name: "item_outdoor_clothes", category: "clothing" },
    ],

    beach: [
        { name: "item_swimsuit", category: "clothing" },
        { name: "item_beach_towel", category: "beach" },
        { name: "item_sunscreen", category: "health" },
        { name: "item_beach_umbrella", category: "beach" },
        { name: "item_beach_bag", category: "beach" },
        { name: "item_flip_flops", category: "clothing" },
        { name: "item_hat", category: "accessories" },
        { name: "item_water_sports_gear", category: "beach" },
        { name: "item_underwater_camera", category: "electronics" },
        { name: "item_book_magazine", category: "entertainment" },
        { name: "item_bikini_coverup", category: "clothing" },
    ],

    hiking: [
        { name: "item_trekking_shoes", category: "clothing" },
        { name: "item_backpack", category: "hiking" },
        { name: "item_trekking_poles", category: "hiking" },
        { name: "item_map_compass", category: "hiking" },
        { name: "item_gps_device", category: "electronics" },
        { name: "item_hydration_pack", category: "hiking" },
        { name: "item_raincoat", category: "clothing" },
        { name: "item_layered_clothing", category: "clothing" },
        { name: "item_helmet", category: "hiking" },
        { name: "item_first_aid_kit", category: "health" },
        { name: "item_energy_bars", category: "food" },
        { name: "item_whistle", category: "safety" },
    ],

    city: [
        { name: "item_fancy_clothes", category: "clothing" },
        { name: "item_walking_shoes", category: "clothing" },
        { name: "item_city_guide", category: "travel" },
        { name: "item_camera", category: "electronics" },
        { name: "item_small_backpack", category: "accessories" },
        { name: "item_museum_tickets", category: "documents" },
        { name: "item_fancy_bag", category: "accessories" },
        { name: "item_headphones", category: "electronics" },
    ],

    business: [
        { name: "item_suit", category: "clothing" },
        { name: "item_shirt_blouse", category: "clothing" },
        { name: "item_formal_shoes", category: "clothing" },
        { name: "item_tie_scarf", category: "accessories" },
        { name: "item_laptop", category: "electronics" },
        { name: "item_laptop_charger", category: "electronics" },
        { name: "item_business_cards", category: "documents" },
        { name: "item_meeting_docs", category: "documents" },
        { name: "item_notebook_pen", category: "office" },
        { name: "item_briefcase", category: "accessories" },
    ],

    ski: [
        { name: "item_ski_clothes", category: "clothing" },
        { name: "item_ski_gloves", category: "clothing" },
        { name: "item_snow_boots", category: "clothing" },
        { name: "item_ski_goggles", category: "accessories" },
        { name: "item_beanie_neckwarmer", category: "accessories" },
        { name: "item_thermal_underwear", category: "clothing" },
        { name: "item_ski_snowboard", category: "ski" },
        { name: "item_warm_coat", category: "clothing" },
        { name: "item_hand_warmers", category: "accessories" },
    ],

    // Season specific items
    summer: [
        { name: "item_light_clothes", category: "clothing" },
        { name: "item_shorts", category: "clothing" },
        { name: "item_tshirt", category: "clothing" },
        { name: "item_sunscreen", category: "health" },
        { name: "item_hat", category: "accessories" },
        { name: "item_sandals", category: "clothing" },
        { name: "item_sunglasses", category: "accessories" },
    ],

    winter: [
        { name: "item_thick_coat", category: "clothing" },
        { name: "item_sweater", category: "clothing" },
        { name: "item_scarf", category: "accessories" },
        { name: "item_gloves", category: "accessories" },
        { name: "item_beanie", category: "accessories" },
        { name: "item_winter_boots", category: "clothing" },
        { name: "item_thermal_underwear", category: "clothing" },
        { name: "item_lip_balm", category: "health" },
    ],

    spring: [
        { name: "item_light_jacket", category: "clothing" },
        { name: "item_raincoat", category: "clothing" },
        { name: "item_umbrella", category: "accessories" },
        { name: "item_seasonal_clothes", category: "clothing" },
    ],

    fall: [
        { name: "item_cardigan", category: "clothing" },
        { name: "item_raincoat", category: "clothing" },
        { name: "item_umbrella", category: "accessories" },
        { name: "item_seasonal_clothes", category: "clothing" },
        { name: "item_scarf", category: "accessories" },
    ],

    // Duration specific items
    longDuration: [
        { name: "item_laundry_detergent", category: "hygiene" },
        { name: "item_clothesline", category: "accessories" },
        { name: "item_extra_clothes", category: "clothing" },
        { name: "item_medication", category: "health" },
        { name: "item_extra_charger", category: "electronics" },
    ],

    // Location specific items
    international: [
        { name: "item_passport", category: "documents" },
        { name: "item_visa", category: "documents" },
        { name: "item_flight_ticket", category: "documents" },
        { name: "item_hotel_booking", category: "documents" },
        { name: "item_travel_insurance", category: "documents" },
        { name: "item_foreign_currency", category: "documents" },
        { name: "item_adapter", category: "electronics" },
        { name: "item_phrasebook", category: "travel" },
        { name: "item_copies_docs", category: "documents" },
    ],

    domestic: [
        { name: "item_bus_flight_ticket", category: "documents" },
        { name: "item_hotel_info", category: "documents" },
    ],

    // General helpful items
    general: [
        { name: "item_toilet_paper", category: "hygiene" },
        { name: "item_wet_wipes", category: "hygiene" },
        { name: "item_trash_bags", category: "general" },
        { name: "item_plastic_bags", category: "general" },
        { name: "item_painkillers", category: "health" },
        { name: "item_bandaids", category: "health" },
        { name: "item_deodorant", category: "hygiene" },
        { name: "item_perfume", category: "hygiene" },
        { name: "item_hairbrush", category: "hygiene" },
    ],
};

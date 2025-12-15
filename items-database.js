// Travel Checklist Items Database
const itemsDatabase = {
    // Essential items shown for every trip
    essentials: [
        { name: "Kimlik/Pasaport", category: "Belgeler" },
        { name: "Cüzdan/Para", category: "Belgeler" },
        { name: "Telefon", category: "Elektronik" },
        { name: "Telefon Şarj Aleti", category: "Elektronik" },
        { name: "İç Çamaşırı", category: "Kıyafet" },
        { name: "Çorap", category: "Kıyafet" },
        { name: "Diş Fırçası ve Macunu", category: "Hijyen" },
        { name: "Güneş Gözlüğü", category: "Aksesuar" },
    ],

    // Trip Type specific items
    camping: [
        { name: "Çadır", category: "Kamp Malzemesi" },
        { name: "Uyku Tulumu", category: "Kamp Malzemesi" },
        { name: "Kamp Matı", category: "Kamp Malzemesi" },
        { name: "Fener/El Feneri", category: "Kamp Malzemesi" },
        { name: "Powerbank", category: "Elektronik" },
        { name: "Çakı/Çok Amaçlı Alet", category: "Kamp Malzemesi" },
        { name: "Çakmak/Kibrit", category: "Kamp Malzemesi" },
        { name: "Yemek Kabı ve Çatal-Kaşık", category: "Kamp Malzemesi" },
        { name: "Su Matarası", category: "Kamp Malzemesi" },
        { name: "Kamp Sandalyesi", category: "Kamp Malzemesi" },
        { name: "Taşınabilir Ocak", category: "Kamp Malzemesi" },
        { name: "Soğutucu Çanta", category: "Kamp Malzemesi" },
        { name: "İlk Yardım Çantası", category: "Sağlık" },
        { name: "Böcek Kovucu Sprey", category: "Sağlık" },
        { name: "Spor Ayakkabı", category: "Kıyafet" },
        { name: "Outdoor Kıyafetler", category: "Kıyafet" },
    ],

    beach: [
        { name: "Mayo/Şort", category: "Kıyafet" },
        { name: "Plaj Havlusu", category: "Plaj" },
        { name: "Güneş Kremi", category: "Sağlık" },
        { name: "Plaj Şemsiyesi", category: "Plaj" },
        { name: "Plaj Çantası", category: "Plaj" },
        { name: "Terlik/Sandalet", category: "Kıyafet" },
        { name: "Şapka/Kep", category: "Aksesuar" },
        { name: "Su Sporları Ekipmanı", category: "Plaj" },
        { name: "Sualtı Kamerası", category: "Elektronik" },
        { name: "Kitap/Dergi", category: "Eğlence" },
        { name: "Bikini/Cover-up", category: "Kıyafet" },
    ],

    hiking: [
        { name: "Trekking Ayakkabısı", category: "Kıyafet" },
        { name: "Sırt Çantası", category: "Dağcılık" },
        { name: "Yürüyüş Sopası", category: "Dağcılık" },
        { name: "Harita/Pusula", category: "Dağcılık" },
        { name: "GPS Cihazı", category: "Elektronik" },
        { name: "Su Matarası/Hidrasyon Çantası", category: "Dağcılık" },
        { name: "Yağmurluk", category: "Kıyafet" },
        { name: "Katmanlı Kıyafet", category: "Kıyafet" },
        { name: "Kask (gerekirse)", category: "Dağcılık" },
        { name: "İlk Yardım Çantası", category: "Sağlık" },
        { name: "Enerji Barları", category: "Yiyecek İçecek" },
        { name: "Düdük", category: "Güvenlik" },
    ],

    city: [
        { name: "Şık Kıyafetler", category: "Kıyafet" },
        { name: "Rahat Yürüyüş Ayakkabısı", category: "Kıyafet" },
        { name: "Şehir Rehberi/Harita", category: "Seyahat" },
        { name: "Kamera/Fotoğraf Makinesi", category: "Elektronik" },
        { name: "Küçük Sırt Çantası", category: "Aksesuar" },
        { name: "Müze/Etkinlik Biletleri", category: "Belgeler" },
        { name: "Şık Çanta/Cüzdan", category: "Aksesuar" },
        { name: "Kulaklık", category: "Elektronik" },
    ],

    business: [
        { name: "Takım Elbise/Blazer", category: "Kıyafet" },
        { name: "Gömlek/Bluz", category: "Kıyafet" },
        { name: "Klasik Ayakkabı", category: "Kıyafet" },
        { name: "Kravat/Fular", category: "Aksesuar" },
        { name: "Laptop", category: "Elektronik" },
        { name: "Laptop Şarj Aleti", category: "Elektronik" },
        { name: "Kartvizit", category: "Belgeler" },
        { name: "Toplantı Dokümanları", category: "Belgeler" },
        { name: "Notebook/Kalem", category: "Ofis" },
        { name: "Evrak Çantası", category: "Aksesuar" },
    ],

    ski: [
        { name: "Kayak Kıyafeti", category: "Kıyafet" },
        { name: "Kayak Eldiveni", category: "Kıyafet" },
        { name: "Kar Botu", category: "Kıyafet" },
        { name: "Kar Gözlüğü", category: "Aksesuar" },
        { name: "Bere/Boyunluk", category: "Aksesuar" },
        { name: "Termal İç Giyim", category: "Kıyafet" },
        { name: "Kayak/Snowboard", category: "Kayak" },
        { name: "Sıcak Tutan Mont", category: "Kıyafet" },
        { name: "El/Ayak Isıtıcı", category: "Aksesuar" },
    ],

    // Season specific items
    summer: [
        { name: "Hafif Kıyafetler", category: "Kıyafet" },
        { name: "Şort", category: "Kıyafet" },
        { name: "T-shirt", category: "Kıyafet" },
        { name: "Güneş Kremi", category: "Sağlık" },
        { name: "Şapka", category: "Aksesuar" },
        { name: "Sandalet", category: "Kıyafet" },
        { name: "Güneş Gözlüğü", category: "Aksesuar" },
    ],

    winter: [
        { name: "Kalın Mont/Kaban", category: "Kıyafet" },
        { name: "Kazak", category: "Kıyafet" },
        { name: "Atkı", category: "Aksesuar" },
        { name: "Eldiven", category: "Aksesuar" },
        { name: "Bere", category: "Aksesuar" },
        { name: "Kışlık Bot", category: "Kıyafet" },
        { name: "Termal İç Giyim", category: "Kıyafet" },
        { name: "Dudak Nemlendiricisi", category: "Sağlık" },
    ],

    spring: [
        { name: "Hafif Ceket", category: "Kıyafet" },
        { name: "Yağmurluk", category: "Kıyafet" },
        { name: "Şemsiye", category: "Aksesuar" },
        { name: "Geçiş Mevsimi Kıyafetleri", category: "Kıyafet" },
    ],

    fall: [
        { name: "Hırka/Ceket", category: "Kıyafet" },
        { name: "Yağmurluk", category: "Kıyafet" },
        { name: "Şemsiye", category: "Aksesuar" },
        { name: "Geçiş Mevsimi Kıyafetleri", category: "Kıyafet" },
        { name: "Hafif Atkı", category: "Aksesuar" },
    ],

    // Duration specific items
    longDuration: [
        { name: "Çamaşır Deterjanı", category: "Hijyen" },
        { name: "Çamaşır İpi", category: "Aksesuar" },
        { name: "İlave Kıyafet Seti", category: "Kıyafet" },
        { name: "Vitamin/İlaç", category: "Sağlık" },
        { name: "Ekstra Şarj Aleti", category: "Elektronik" },
    ],

    // Location specific items
    international: [
        { name: "Pasaport", category: "Belgeler" },
        { name: "Vize (gerekirse)", category: "Belgeler" },
        { name: "Uçak Bileti", category: "Belgeler" },
        { name: "Otel Rezervasyonu", category: "Belgeler" },
        { name: "Seyahat Sigortası", category: "Belgeler" },
        { name: "Yabancı Para/Kredi Kartı", category: "Belgeler" },
        { name: "Adaptör/Priz Çevirici", category: "Elektronik" },
        { name: "Dil Rehberi/Çeviri Uygulaması", category: "Seyahat" },
        { name: "Fotokopi (Pasaport/Kimlik)", category: "Belgeler" },
    ],

    domestic: [
        { name: "Otobüs/Uçak Bileti", category: "Belgeler" },
        { name: "Otel/Konaklama Bilgisi", category: "Belgeler" },
    ],

    // General helpful items
    general: [
        { name: "Tuvalet Kağıdı/Mendil", category: "Hijyen" },
        { name: "Islak Mendil", category: "Hijyen" },
        { name: "Çöp Torbası", category: "Genel" },
        { name: "Plastik Poşet", category: "Genel" },
        { name: "Ağrı Kesici", category: "Sağlık" },
        { name: "Yara Bandı", category: "Sağlık" },
        { name: "Deodorant", category: "Hijyen" },
        { name: "Parfüm/Kolonya", category: "Hijyen" },
        { name: "Saç Fırçası/Tarak", category: "Hijyen" },
    ],
};

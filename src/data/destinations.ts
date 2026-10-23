export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  subtitle: string;
  heroImage: string;
  description: string;
  bestTime: string;
  highlights: string[];
  keyExperiences: string[];
  recommendedNights: number;
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "dest-1",
    slug: "yala-national-park-safari",
    name: "Yala National Park & Wildlife",
    region: "Southern Wild Coast",
    subtitle: "Wild Leopards, Elephants & Coastal Safari Adventures",
    heroImage: "/images/yala_leopard_sunset.jpg",
    description: "Bordering the blue Indian Ocean, Yala National Park has one of the highest densities of leopards in the world. Alongside wild leopards, you can encounter herds of wild elephants, sloth bears, spotted deer, and over 200 species of birds.",
    bestTime: "February to July (Dry season with best waterhole animal sightings)",
    recommendedNights: 2,
    highlights: [
      "World's best location to photograph the elusive Sri Lankan leopard",
      "Spectacular landscape where dry jungle meets sandy ocean beaches",
      "See wild Asian elephants, crocodiles, peacocks, and water buffaloes",
      "Comfortable safari lodges and luxury glamping tent resorts"
    ],
    keyExperiences: [
      "Morning and afternoon 4x4 open-top game drives with a local tracker",
      "Outdoor bush breakfast under shady trees inside the national park",
      "Sunset drinks by the beach dunes after an exciting afternoon safari",
      "Visit the nearby Udawalawe Elephant Transit Home during milk feeding time"
    ]
  },
  {
    id: "dest-2",
    slug: "ceylon-tea-trails-hatton",
    name: "Nuwara Eliya & Tea Country",
    region: "Central Highlands",
    subtitle: "Rolling Tea Plantations, Waterfalls & Cool Mountain Air",
    heroImage: "/images/nuwara_eliya_tea_estate_morning_clouds.jpg",
    description: "Located high in the central mountains at 1,800 meters altitude, Nuwara Eliya and Hatton are known for cool weather, lush green tea fields, colonial-era architecture, and breathtaking waterfalls. It is the center of world-famous Ceylon tea production.",
    bestTime: "December to May (Dry, sunny, and clear skies)",
    recommendedNights: 3,
    highlights: [
      "Visit working tea factories and pluck fresh green tea leaves",
      "Stroll through colonial gardens, Gregory Lake, and tea estates",
      "Marvel at cascading waterfalls like Ramboda Falls and St. Clair's Falls",
      "Cool mountain climate with temperatures between 15°C and 20°C"
    ],
    keyExperiences: [
      "Private guided tea tasting session with an expert tea maker",
      "Traditional afternoon high tea on a historic estate lawn",
      "Early morning trek across Horton Plains to the 1,000m World's End cliff",
      "Cozy evenings by a fireplace in a colonial heritage bungalow"
    ]
  },
  {
    id: "dest-3",
    slug: "sigiriya-cultural-triangle",
    name: "Sigiriya & Cultural Triangle",
    region: "Central Cultural Region",
    subtitle: "Ancient Rock Fortress & UNESCO Cave Temples",
    heroImage: "/images/sigiriya_rock_ancient_steps_sunset.jpg",
    description: "Rising 200 meters above the green jungle, the ancient Sigiriya Lion Rock fortress was built in the 5th century by King Kashyapa. Surrounded by water gardens, colorful cave frescoes, and the nearby Dambulla golden cave temple, this region is the historic heart of Sri Lanka.",
    bestTime: "December to April & July to September",
    recommendedNights: 3,
    highlights: [
      "Climb the UNESCO Sigiriya Lion Rock Fortress and see royal ruins",
      "Explore 5 ancient cave temples in Dambulla with 150+ Buddha statues",
      "Hike Pidurangala Rock at sunrise for the best panoramic view of Sigiriya",
      "Watch wild elephant gatherings at nearby Minneriya National Park"
    ],
    keyExperiences: [
      "Early morning climb to avoid the midday sun and tourist crowds",
      "Sunrise hot air balloon ride floating over the jungle and lakes",
      "Traditional village tour and authentic Sri Lankan rice & curry lunch",
      "Guided walk through the ancient stone city of Polonnaruwa"
    ]
  },
  {
    id: "dest-4",
    slug: "ella-nine-arch-bridge",
    name: "Ella & The Mountain Pass",
    region: "Highland Mountains",
    subtitle: "Nine Arch Bridge, Mountain Hikes & The Blue Train",
    heroImage: "/images/ella_nine_arch_bridge_train_crossing.jpg",
    description: "Ella is a charming mountain village surrounded by pine forests, waterfalls, and steep tea-covered valleys. It is famous worldwide for the iconic Nine Arch Bridge and the scenic blue train that winds through the hills.",
    bestTime: "January to May & August to September",
    recommendedNights: 2,
    highlights: [
      "Walk along the iconic stone Nine Arch Bridge surrounded by tea hills",
      "Hike up Little Adam's Peak for 360-degree mountain views",
      "Swim in the fresh rock pools of Ravana Waterfall",
      "Ride the famous blue train across dramatic bridges and mountain curves"
    ],
    keyExperiences: [
      "Watch the train cross Nine Arch Bridge from the best photography spots",
      "Fly across the valley on the Flying Ravana zip-line",
      "Relax in cozy cafes with fresh passion fruit juice and local food",
      "Sunrise hike up Ella Rock for an unforgettable viewpoint"
    ]
  },
  {
    id: "dest-5",
    slug: "mirissa-galle-southern-coast",
    name: "Galle Dutch Fort & Mirissa Beaches",
    region: "Southern Coastline",
    subtitle: "Historic 17th-Century Fort, Sandy Beaches & Blue Whales",
    heroImage: "/images/galle_fort_lighthouse_twilight.jpg",
    description: "UNESCO World Heritage Galle Fort is a living 17th-century fortress filled with charming cobblestone lanes, boutique cafes, jewelry shops, and historic ramparts. Nearby, Mirissa and Bentota offer golden sandy beaches, clear ocean water, and boat tours to see blue whales.",
    bestTime: "November to April (Calm sea, sunny beach weather, and whale watching)",
    recommendedNights: 3,
    highlights: [
      "Walk the oceanfront ramparts and historic lighthouse of Galle Fort",
      "Spot the largest animals on earth on a morning Blue Whale watching boat tour",
      "See traditional stilt fishermen balancing over breaking ocean waves",
      "Golden sandy swimming beaches in Mirissa, Unawatuna, and Bentota"
    ],
    keyExperiences: [
      "Sunset stroll along Galle Fort walls watching waves crash on coral rocks",
      "Morning boat tour into the deep ocean to spot whales and spinning dolphins",
      "Surf lessons or paddleboarding in the calm waters of Weligama Bay",
      "Fresh seafood dinner right on the beach with tables under tiki torches"
    ]
  },
  {
    id: "dest-6",
    slug: "kandy-sacred-kingdom",
    name: "Kandy & Cultural Heritage",
    region: "Central Hill Capital",
    subtitle: "The Sacred Temple of the Tooth & Royal Botanical Gardens",
    heroImage: "/images/kandy_dalada_maligawa_sunset.jpg",
    description: "Surrounded by lush forested mountains and centered around a picturesque lake, Kandy was the last royal kingdom of Sri Lanka. It houses the sacred Temple of the Tooth Relic and the world-renowned Peradeniya Royal Botanical Gardens.",
    bestTime: "December to April & July to August",
    recommendedNights: 2,
    highlights: [
      "Visit the sacred Temple of the Tooth Relic during traditional drum ceremonies",
      "Stroll through the 147-acre Peradeniya Botanical Gardens with giant palms",
      "Walk around the peaceful Kandy lake in the center of the city",
      "Watch an authentic traditional Kandyan dance and fire-walking performance"
    ],
    keyExperiences: [
      "Evening blessing ceremony at the Golden Temple with traditional drummers",
      "Walk through the famous orchid house and royal spice collections",
      "Scenic viewpoint overlooking Kandy city and the mountain amphitheater",
      "Board the famous scenic train ride from Kandy station towards Ella"
    ]
  }
];

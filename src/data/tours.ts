export interface DayPlan {
  day: number;
  title: string;
  location: string;
  stay: string;
  description: string;
  highlights: string[];
  meals: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  nights: number;
  pricePerPerson: number;
  rating: number;
  reviewsCount: number;
  region: 'central' | 'cultural' | 'south' | 'yala' | 'all';
  style: 'heritage' | 'wildlife' | 'tea' | 'ocean' | 'honeymoon' | 'trekking';
  idealSeason: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationGrade: string;
  transitStyle: string;
  itinerary: DayPlan[];
}

export const TOURS_DATA: TourPackage[] = [
  {
    id: "tour-1",
    slug: "grand-ceylon-sanctuary-circuit",
    title: "Grand Sri Lanka Tour",
    tagline: "The complete 12-day private island tour covering ancient rock citadels, tea hills, wildlife safaris, and golden beaches.",
    duration: "12 Days / 11 Nights",
    nights: 11,
    pricePerPerson: 2450,
    rating: 4.98,
    reviewsCount: 64,
    region: "all",
    style: "heritage",
    idealSeason: "October to May",
    heroImage: "/images/sigiriya_rock_aerial_drone_sunset.jpg",
    galleryImages: [
      "/images/sigiriya_rock_aerial_drone_sunset.jpg",
      "/images/blue_train_tea_plantations.jpg",
      "/images/yala_safari_jeep_elephant_encounter.jpg",
      "/images/ella_nine_arch_bridge_train_crossing.jpg",
      "/images/mirissa_coconut_tree_hill_sunset.jpg"
    ],
    overview: "Our flagship private tour covers the very best of Sri Lanka with comfort and ease. Climb the iconic Sigiriya Rock Fortress at sunrise, relax in beautiful tea country bungalows, enjoy private wildlife safaris in Yala, and explore the historic cobblestone streets of Galle Fort with your personal chauffeur-guide.",
    highlights: [
      "Early morning climb of UNESCO Sigiriya Rock Fortress with a private guide",
      "Scenic 1st-class train ride through tea mountains and across Nine Arch Bridge",
      "Private 4x4 wildlife safari in Yala National Park to spot leopards and elephants",
      "Stay in authentic tea planter bungalows in the cool central highlands",
      "Sunset walking tour along the oceanfront ramparts of Galle Fort",
      "Dedicated air-conditioned vehicle with licensed English-speaking chauffeur-guide"
    ],
    inclusions: [
      "11 nights in handpicked 4-star and 5-star boutique hotels",
      "Daily breakfast and selected gourmet dinners",
      "Private air-conditioned vehicle (Toyota Prado SUV / modern van) with fuel and highway tolls",
      "Dedicated English-speaking chauffeur-guide throughout your entire journey",
      "All national park safari jeep hires, tracker fees, and entrance permits",
      "Reserved 1st-Class scenic train tickets from Kandy to Ella",
      "Airport meet & greet with direct hotel transfer upon arrival",
      "24/7 customer care and local concierge assistance"
    ],
    exclusions: [
      "International flights to and from Sri Lanka",
      "Sri Lanka tourist visa (ETA applied online)",
      "Optional tips for driver, safari trackers, and hotel staff",
      "Personal travel insurance and alcoholic beverages"
    ],
    accommodationGrade: "4-Star & 5-Star Boutique Hotels & Tea Bungalows",
    transitStyle: "Private Air-Conditioned SUV / Van & Scenic Train",
    itinerary: [
      {
        day: 1,
        title: "Welcome to Sri Lanka - Arrival in Negombo",
        location: "Negombo Beach",
        stay: "Heritance Negombo / Jetwing Beach",
        description: "Arrive at Colombo Airport (CMB) where your friendly chauffeur-guide meets you with a personal name board. Take a short 20-minute drive to your coastal hotel in Negombo to relax and recover after your flight.",
        highlights: ["Personal airport pickup", "Welcome King Coconut drink", "Relax on the beach"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Journey to the Cultural Triangle & Dambulla Caves",
        location: "Dambulla & Sigiriya",
        stay: "Aliya Resort & Spa / Water Garden Sigiriya",
        description: "Drive through scenic coconut estates toward the Cultural Triangle. Stop to explore the UNESCO Dambulla Cave Temples, carved into a giant granite rock with ancient Buddhist statues and colorful murals.",
        highlights: ["Dambulla Cave Temples tour", "Scenic drive through the countryside", "Evening pool view of Sigiriya"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Sigiriya Rock Fortress at Sunrise & Elephant Safari",
        location: "Sigiriya & Minneriya",
        stay: "Aliya Resort & Spa / Water Garden Sigiriya",
        description: "Climb the world-famous Sigiriya Lion Rock early in the morning to beat the heat and enjoy panoramic views from the summit. In the afternoon, take a 4x4 open-top safari into Minneriya National Park to see large herds of wild elephants.",
        highlights: ["Sigiriya Lion Rock summit climb", "Ancient royal water gardens and frescoes", "Afternoon wild elephant safari"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Spices of Matale & The Royal City of Kandy",
        location: "Matale & Kandy",
        stay: "Grand Kandyan Hotel / Kings Pavilion",
        description: "Travel south toward the mountain capital of Kandy. Stop at an organic spice garden in Matale to learn how real cinnamon, cardamom, and vanilla grow. In the evening, visit the sacred Temple of the Tooth Relic by Kandy Lake.",
        highlights: ["Organic spice garden walk", "Sacred Temple of the Tooth evening ceremony", "Kandy Lake walking tour"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Scenic Train Ride into the Tea Hills of Nuwara Eliya",
        location: "Nuwara Eliya / Hatton",
        stay: "The Grand Hotel Nuwara Eliya / Heritance Tea Factory",
        description: "Board the famous mountain train through rolling green tea hills, waterfalls, and mountain tunnels. Arrive in Nuwara Eliya, known as 'Little England' for its colonial architecture and cool mountain air.",
        highlights: ["1st-Class scenic train journey", "Visit a working tea factory and taste fresh Ceylon tea", "Stroll through colonial gardens"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Tea Plantation Walk & Horton Plains Hike",
        location: "Nuwara Eliya & Horton Plains",
        stay: "The Grand Hotel Nuwara Eliya / Heritance Tea Factory",
        description: "Enjoy a morning nature walk through misty Horton Plains National Park to the dramatic World's End cliff. In the afternoon, relax with afternoon high tea and stroll around Gregory Lake.",
        highlights: ["World's End viewpoint hike", "Baker's Falls waterfall", "Traditional afternoon tea"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 7,
        title: "Nine Arch Bridge & Mountain Views in Ella",
        location: "Ella",
        stay: "98 Acres Resort & Spa / Hide Ella",
        description: "Drive to the charming mountain village of Ella. Visit the famous Nine Arch Bridge to watch the blue train cross over lush tea valleys, followed by an easy hike up Little Adam's Peak.",
        highlights: ["Nine Arch Bridge photo stop", "Little Adam's Peak hike", "Ravana Waterfall photo stop"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 8,
        title: "Descent to Yala & Afternoon Wildlife Safari",
        location: "Yala National Park",
        stay: "Cinnamon Wild Yala / Jetwing Yala",
        description: "Head south down through mountain passes into the coastal plains of Yala. In the afternoon, hop into a private open-top 4x4 safari jeep with an expert tracker to look for wild leopards, elephants, and spotted deer.",
        highlights: ["Scenic descent from mountains to coast", "Afternoon 4x4 safari in Yala National Park", "Sunset dinner by the wild beach"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 9,
        title: "Morning Leopard Safari & Drive to Galle Fort",
        location: "Yala to Galle",
        stay: "Fort Bazaar / Le Grand Galle",
        description: "Take an early morning game drive when animals are most active. Then travel along the southern coastline past traditional stilt fishermen into the 17th-century walled city of Galle Fort.",
        highlights: ["Early morning wildlife game drive", "Stilt fishermen photography stop", "Evening walk on Galle Fort ramparts"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 10,
        title: "Exploring Galle Dutch Fort & Sandy Beaches",
        location: "Galle & Unawatuna",
        stay: "Fort Bazaar / Le Grand Galle",
        description: "Spend a leisurely day exploring Galle Fort's charming cobblestone streets, boutique shops, and cafes. In the afternoon, swim in the calm turquoise waters of nearby Unawatuna or Mirissa beach.",
        highlights: ["Galle lighthouse and ramparts walk", "Boutique cafes and artisan shops", "Relax on golden sandy swimming beaches"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 11,
        title: "Blue Whale Boat Tour & Coastal Relaxation",
        location: "Mirissa & Galle",
        stay: "Fort Bazaar / Le Grand Galle",
        description: "Optional early morning boat trip from Mirissa harbor to see giant Blue Whales in the open sea. Spend your final afternoon enjoying a relaxing Ayurvedic massage or seaside dinner.",
        highlights: ["Morning whale watching excursion", "Fresh seafood beach dinner", "Sunset over the Indian Ocean"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 12,
        title: "Colombo Highlights & Airport Departure",
        location: "Colombo to Airport",
        stay: "Departure",
        description: "Drive north along the Southern Expressway to Colombo. Take a brief city orientation tour with stops for souvenir shopping and tea before your driver drops you at Colombo Airport for your flight home.",
        highlights: ["Colombo city sights & shopping", "Private airport transfer in air-conditioned comfort"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "tour-2",
    slug: "tea-trails-and-scenic-highlands",
    title: "Highlands, Tea Country & Scenic Train",
    tagline: "Experience emerald tea plantations, misty mountain views, waterfalls, and the famous blue train.",
    duration: "8 Days / 7 Nights",
    nights: 7,
    pricePerPerson: 1650,
    rating: 4.95,
    reviewsCount: 42,
    region: "central",
    style: "tea",
    idealSeason: "Year-Round (Best Dec–Apr)",
    heroImage: "/images/ella_scenic_mountain_train.jpg",
    galleryImages: [
      "/images/ella_scenic_mountain_train.jpg",
      "/images/nuwara_eliya_tea_estate_morning_clouds.jpg",
      "/images/nuwara_eliya_red_train_tea_hills.jpg",
      "/images/ella_nine_arches_bridge_drone.jpg",
      "/images/horton_plains_worlds_end_mist.jpg"
    ],
    overview: "This relaxing mountain tour takes you into the heart of Sri Lanka's central highlands. Travel from the sacred city of Kandy to the tea plantations of Nuwara Eliya and the breathtaking ravines of Ella. Ride the scenic blue train, walk among tea pickers, and sleep in cozy colonial heritage hotels.",
    highlights: [
      "Visit Kandy's Temple of the Tooth and Royal Botanical Gardens",
      "Reserved 1st-class seats on the scenic blue mountain train",
      "Tour working tea estates and taste world-famous Ceylon single-estate teas",
      "Hike to World's End in Horton Plains National Park",
      "Walk across the iconic Demodara Nine Arch Bridge in Ella"
    ],
    inclusions: [
      "7 nights in heritage hotels and boutique mountain resorts",
      "Daily breakfast and selected four-course dinners",
      "Reserved 1st-class train tickets from Kandy to Ella",
      "Private air-conditioned SUV with licensed chauffeur-guide",
      "All park permits, tea factory tours, and entrance tickets"
    ],
    exclusions: [
      "International flights and visa fees",
      "Personal travel insurance",
      "Drinks, tips, and optional activities"
    ],
    accommodationGrade: "Colonial Heritage Hotels & Mountain Boutique Lodges",
    transitStyle: "Private Vehicle & 1st-Class Scenic Train",
    itinerary: [
      {
        day: 1,
        title: "Colombo Airport to Kandy",
        location: "Kandy",
        stay: "Theva Residency / Kings Pavilion",
        description: "Your driver meets you at the airport and drives up into the cool green hills of Kandy. Relax and enjoy an evening visit to the Temple of the Tooth Relic.",
        highlights: ["Airport pickup", "Kandy Lake view", "Evening temple ceremony"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Royal Botanical Gardens & Nuwara Eliya",
        location: "Nuwara Eliya",
        stay: "The Grand Hotel / Heritance Tea Factory",
        description: "Explore the giant palm avenues and orchid house at Peradeniya Botanical Gardens. Drive past Ramboda Falls into high-altitude Nuwara Eliya.",
        highlights: ["Botanical Gardens walk", "Ramboda Falls photo stop", "Colonial hotel check-in"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Horton Plains & The World's End Cliff",
        location: "Horton Plains & Nuwara Eliya",
        stay: "The Grand Hotel / Heritance Tea Factory",
        description: "Early morning nature trek across Horton Plains plateau to the stunning 1,000m sheer drop at World's End and Baker's Falls.",
        highlights: ["World's End cliff view", "Baker's Falls trek", "Highland mountain scenery"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Tea Plucking & Factory Experience",
        location: "Nuwara Eliya & Hatton",
        stay: "The Grand Hotel / Heritance Tea Factory",
        description: "Learn how Ceylon tea is grown, plucked, and fermented into world-famous tea. Savor a guided tea tasting session and high tea.",
        highlights: ["Tea plucking experience", "Factory tasting session", "Afternoon high tea"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Scenic Mountain Train Ride to Ella",
        location: "Ella",
        stay: "98 Acres Resort & Spa / Hide Ella",
        description: "Board the famous blue train for the most scenic rail journey in Sri Lanka, passing through tea fields, waterfalls, and mountain tunnels.",
        highlights: ["Scenic rail journey", "Reserved window seats", "Ella mountain gap view"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Nine Arch Bridge & Little Adam's Peak",
        location: "Ella",
        stay: "98 Acres Resort & Spa / Hide Ella",
        description: "Hike through lush tea terraces up Little Adam's Peak for sunrise, followed by watching the train cross the iconic Nine Arch Bridge.",
        highlights: ["Little Adam's Peak hike", "Nine Arch Bridge photo stop", "Ravana rock pool visit"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 7,
        title: "Ella to Colombo via Southern Expressway",
        location: "Colombo",
        stay: "Galle Face Hotel Colombo",
        description: "Descend from the mountains toward Colombo. Enjoy an evening sunset cocktail overlooking the Indian Ocean from the historic Galle Face terrace.",
        highlights: ["Scenic descent", "Sunset drinks on the ocean terrace", "Farewell dinner"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 8,
        title: "Colombo City Sights & Departure",
        location: "Colombo / Airport",
        stay: "Departure",
        description: "Morning shopping for fine Ceylon tea and souvenirs before your private transfer to Colombo Airport for your flight.",
        highlights: ["Souvenir and tea shopping", "Direct airport transfer"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "tour-3",
    slug: "wild-ceylon-safari-and-leopards",
    title: "Sri Lanka Wildlife Safari Tour",
    tagline: "Thrilling 4x4 safaris in Yala, Udawalawe, and Bundala to photograph leopards, wild elephants, and birds.",
    duration: "7 Days / 6 Nights",
    nights: 6,
    pricePerPerson: 1750,
    rating: 4.97,
    reviewsCount: 38,
    region: "yala",
    style: "wildlife",
    idealSeason: "Year-Round (Best Feb–Oct)",
    heroImage: "/images/yala_leopard_sunset.jpg",
    galleryImages: [
      "/images/yala_leopard_sunset.jpg",
      "/images/yala_safari_jeep_elephant_encounter.jpg",
      "/images/udawalawe_elephant_mother_calf.jpg",
      "/images/safari_elephants_sunset.jpg",
      "/images/yala_leopard_safari_track.jpg"
    ],
    overview: "Sri Lanka has the world's highest density of leopards and hundreds of wild Asian elephants. Designed for wildlife lovers and photographers, this safari expedition includes multiple private 4x4 game drives with experienced local trackers.",
    highlights: [
      "4 private 4x4 game drives in Yala National Park to spot wild leopards",
      "See hundreds of wild elephants at Udawalawe National Park",
      "Visit the famous Udawalawe Elephant Transit Home during feeding hour",
      "Birdwatching in Bundala Ramsar Wetlands for flamingos and storks",
      "Stay in comfortable safari lodges with swimming pools right near the park gates"
    ],
    inclusions: [
      "6 nights in comfortable 4-star safari eco-lodges and beach resorts",
      "All meals included during safari days (breakfast, lunch, dinner)",
      "Private modified 4x4 open-top safari jeeps with local park tracker",
      "All national park entrance fees, vehicle permits, and government taxes",
      "Private air-conditioned road transport throughout the tour"
    ],
    exclusions: [
      "International flights and visa fees",
      "Personal travel insurance",
      "Optional tips for drivers and park trackers"
    ],
    accommodationGrade: "Comfortable Safari Lodges & Beachfront Resorts",
    transitStyle: "Open-Top 4x4 Safari Jeeps & Private SUV",
    itinerary: [
      {
        day: 1,
        title: "Colombo to Udawalawe Elephant Sanctuary",
        location: "Udawalawe",
        stay: "Grand Udawalawe Safari Resort",
        description: "Drive south to Udawalawe. Visit the baby elephant transit home, then embark on your first 4x4 afternoon safari.",
        highlights: ["Elephant Transit Home", "Sunset savannah safari", "Herds of wild elephants"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Udawalawe to Yala National Park",
        location: "Yala",
        stay: "Cinnamon Wild Yala / Jetwing Yala",
        description: "Drive to Yala on the southern coast. Check into your safari resort and head out on an afternoon game drive looking for leopards.",
        highlights: ["Scenic southern drive", "Afternoon Yala safari", "Dinner under starry skies"],
        meals: "Breakfast, Lunch & Dinner"
      },
      {
        day: 3,
        title: "Full Day Yala Safari Exploration",
        location: "Yala National Park",
        stay: "Cinnamon Wild Yala / Jetwing Yala",
        description: "Early morning and late afternoon game drives when predators are on the prowl around waterholes and rock outcrops.",
        highlights: ["Morning leopard tracking", "Picnic lunch in nature", "Afternoon crocodile and elephant sightings"],
        meals: "Breakfast, Lunch & Dinner"
      },
      {
        day: 4,
        title: "Bundala Wetland Sanctuary & Birds",
        location: "Bundala & Yala",
        stay: "Cinnamon Wild Yala / Jetwing Yala",
        description: "Explore the coastal lagoons of Bundala National Park, a paradise for thousands of migratory birds and wildlife.",
        highlights: ["Greater flamingo flocks", "Coastal lagoon safari", "Dusk wildlife drive"],
        meals: "Breakfast, Lunch & Dinner"
      },
      {
        day: 5,
        title: "Yala to Mirissa Beach",
        location: "Mirissa",
        stay: "Sri Sharavi Beach Villas / Weligama Bay",
        description: "Drive along the palm-fringed coast to Mirissa. Relax on the golden beach and enjoy fresh seafood at an oceanfront restaurant.",
        highlights: ["Scenic coastal drive", "Golden sand beach relaxation", "Fresh seafood dinner"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Blue Whale Safari & Galle Fort",
        location: "Mirissa & Galle",
        stay: "The Fortress Resort & Spa / Amangalla",
        description: "Early morning boat trip into the Indian Ocean to see giant Blue Whales. Afternoon walking tour of historic Galle Dutch Fort.",
        highlights: ["Blue whale boat tour", "Historic Galle Fort sunset walk", "Cobblestone street cafes"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 7,
        title: "Coastal Drive to Colombo & Departure",
        location: "Colombo / Airport",
        stay: "Departure",
        description: "Take the Southern Expressway back to Colombo Airport for your flight home, with unforgettable wildlife memories.",
        highlights: ["Fast highway transfer", "Airport drop-off"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "tour-4",
    slug: "pearl-of-ceylon-luxury-honeymoon",
    title: "Romantic Sri Lanka Honeymoon",
    tagline: "Private pool villas, sunrise hot air balloons, tea country fireplaces, and candlelit beach dinners.",
    duration: "10 Days / 9 Nights",
    nights: 9,
    pricePerPerson: 2250,
    rating: 4.99,
    reviewsCount: 51,
    region: "south",
    style: "honeymoon",
    idealSeason: "October to May",
    heroImage: "/images/sigiriya_rock_ancient_steps_sunset.jpg",
    galleryImages: [
      "/images/sigiriya_rock_ancient_steps_sunset.jpg",
      "/images/mirissa_coconut_tree_hill_sunset.jpg",
      "/images/galle_fort_lighthouse_twilight.jpg",
      "/images/south_coast_palm_sunset.jpg",
      "/images/sri_lanka_traditional_stilt_fishermen_gold.jpg"
    ],
    overview: "Designed for couples, this romantic tour balances boutique luxury villas with unforgettable shared adventures. Float in a hot air balloon over Sigiriya at sunrise, sip champagne beside tea estate waterfalls, and relax in private beachfront pool villas in southern Sri Lanka.",
    highlights: [
      "Sunrise hot air balloon flight floating over Sigiriya's ancient forests",
      "Private candlelit dinners in tropical water gardens and secluded beaches",
      "Couples Ayurvedic spa massage and relaxation treatments",
      "First-class scenic train ride through misty mountain passes",
      "Private ocean-view villa with swimming pool along the golden south coast"
    ],
    inclusions: [
      "9 nights in romantic boutique villas and luxury pool suites",
      "Daily breakfast and romantic candlelit dinners",
      "Sunrise hot air balloon flight for two in Sigiriya",
      "Private air-conditioned luxury vehicle with dedicated chauffeur-guide",
      "Couples 90-minute Ayurvedic spa massage package"
    ],
    exclusions: [
      "International flights and tourist visas",
      "Personal shopping and travel insurance"
    ],
    accommodationGrade: "Luxury Boutique Resorts & Private Pool Villas",
    transitStyle: "Private Chauffeur Car & 1st-Class Scenic Train",
    itinerary: [
      {
        day: 1,
        title: "Arrive Colombo & Transfer to Sigiriya",
        location: "Sigiriya",
        stay: "Water Garden Sigiriya (Water Villa)",
        description: "Your chauffeur meets you at the airport and drives you to your private villa resort overlooking Sigiriya rock.",
        highlights: ["Personal airport welcome", "Private villa check-in", "Welcome cocktail"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Sunrise Hot Air Balloon & Sigiriya Starlight Dinner",
        location: "Sigiriya",
        stay: "Water Garden Sigiriya (Water Villa)",
        description: "Float peacefully over jungle canopies and lakes at sunrise. Enjoy an evening candlelit dinner by the pool under the stars.",
        highlights: ["Hot air balloon ride", "Sigiriya rock view", "Private candlelit dinner"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Scenic Drive into the Mountain Tea Hills",
        location: "Kandy to Nuwara Eliya",
        stay: "Heritance Tea Factory / Grand Hotel",
        description: "Drive through emerald tea hills and waterfalls. Check into your cozy mountain suite with garden views.",
        highlights: ["Ramboda waterfall stop", "Tea estate walk", "Fireplace lounge drinks"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Romantic Tea Country & High Tea",
        location: "Nuwara Eliya",
        stay: "Heritance Tea Factory / Grand Hotel",
        description: "Tour a historic tea factory, taste fresh Ceylon tea, and enjoy traditional afternoon high tea on manicured lawns.",
        highlights: ["Private tea tasting", "Afternoon high tea", "Couples spa session"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Scenic Train to Ella & Mountain Views",
        location: "Ella",
        stay: "98 Acres Resort & Spa",
        description: "Ride the iconic mountain train to Ella. Settle into your cliffside villa with sweeping panoramic valley views.",
        highlights: ["Scenic train ride", "Nine Arch Bridge visit", "Sunset balcony drinks"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Drive to Tangalle's Secluded Beach Coves",
        location: "Tangalle",
        stay: "Anantara Peace Haven Tangalle",
        description: "Descend to the dramatic southern shoreline of Tangalle, famous for quiet golden beaches and warm waves.",
        highlights: ["Private beach resort check-in", "Sunset cocktail over the ocean", "Quiet secluded cove"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 7,
        title: "Beachfront Relaxation & Couples Spa",
        location: "Tangalle",
        stay: "Anantara Peace Haven Tangalle",
        description: "A relaxing day dedicated to swimming in warm ocean waves, yoga by the pool, and couples massages.",
        highlights: ["Couples Ayurvedic treatment", "Beach walks", "Candlelit seafood dinner"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 8,
        title: "Galle Fort Sunset Stroll",
        location: "Galle Fort",
        stay: "Fort Bazaar / Amangalla",
        description: "Drive along the coast to historic Galle Fort. Walk hand-in-hand through cobblestone streets and ocean ramparts.",
        highlights: ["Galle Fort walking tour", "Lighthouse sunset view", "Charming boutique shopping"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 9,
        title: "Bentota Beach & Sunset Catamaran Cruise",
        location: "Bentota & Galle",
        stay: "Fort Bazaar / Amangalla",
        description: "Enjoy a scenic boat cruise along the coast, followed by a final celebratory dinner by the water.",
        highlights: ["Sunset boat ride", "Farewell seafood dinner", "Beach relaxation"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 10,
        title: "Farewell Sri Lanka & Airport Departure",
        location: "Colombo / Airport",
        stay: "Departure",
        description: "Smooth highway transfer to Colombo Airport with unforgettable honeymoon memories.",
        highlights: ["Private airport drop-off"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "tour-5",
    slug: "cultural-triangle-and-ancient-kingdoms",
    title: "Ancient Kingdoms & Cultural Heritage",
    tagline: "Explore 2,500 years of history across Anuradhapura, Polonnaruwa, Sigiriya, and Dambulla.",
    duration: "6 Days / 5 Nights",
    nights: 5,
    pricePerPerson: 1250,
    rating: 4.93,
    reviewsCount: 33,
    region: "cultural",
    style: "heritage",
    idealSeason: "Year-Round",
    heroImage: "/images/kandy_dalada_maligawa_sunset.jpg",
    galleryImages: [
      "/images/kandy_dalada_maligawa_sunset.jpg",
      "/images/sigiriya_classic_rock_landscape.jpg",
      "/images/kandy_temple_of_tooth_octagon_night.jpg",
      "/images/kandy_buddha_cultural_statue.jpg",
      "/images/sigiriya_sunrise.jpg"
    ],
    overview: "Discover the ancient wonders of Sri Lanka. Visit monumental Buddhist stupas, walk through the 5th-century royal fortress of Sigiriya, cycle through the medieval city of Polonnaruwa, and marvel at the rock temples of Dambulla.",
    highlights: [
      "Anuradhapura sacred Bodhi tree - the oldest documented planted tree in the world",
      "Sigiriya Lion Rock Fortress climb at sunrise",
      "Bicycle ride through the ancient palace ruins of Polonnaruwa",
      "Dambulla UNESCO Cave Temples with gold statues and rock paintings",
      "Temple of the Tooth Relic in the royal city of Kandy"
    ],
    inclusions: [
      "5 nights in 4-star cultural eco-resorts and heritage hotels",
      "Daily breakfast and dinner",
      "Private air-conditioned car or van with licensed chauffeur-guide",
      "All UNESCO museum passes, monument tickets, and site fees"
    ],
    exclusions: ["International flights", "Travel insurance", "Personal expenses and tips"],
    accommodationGrade: "4-Star Cultural Heritage Hotels & Eco-Resorts",
    transitStyle: "Private Air-Conditioned Vehicle",
    itinerary: [
      {
        day: 1,
        title: "Colombo to Anuradhapura Ancient Capital",
        location: "Anuradhapura",
        stay: "Heritage Hotel Anuradhapura / Palm Garden Village",
        description: "Arrive in Anuradhapura, the first capital of Sri Lanka. See giant white stupas and the sacred Bodhi Tree.",
        highlights: ["Ruwanwelisaya giant stupa", "Sacred Bodhi Tree blessing"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Anuradhapura Ancient City & Mihintale",
        location: "Mihintale & Sigiriya",
        stay: "Aliya Resort & Spa / Habarana Village",
        description: "Explore the rock steps of Mihintale, the cradle of Buddhism in Sri Lanka, before driving to Sigiriya.",
        highlights: ["Mihintale panoramic rock view", "Ancient stone carvings"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Sigiriya Lion Rock Fortress Climb",
        location: "Sigiriya",
        stay: "Aliya Resort & Spa / Habarana Village",
        description: "Climb Sigiriya at sunrise. In the afternoon, enjoy a peaceful village catamaran boat ride across a lotus lake.",
        highlights: ["Sigiriya rock fortress summit", "Catamaran lake cruise", "Village lunch"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Polonnaruwa Medieval City by Bicycle",
        location: "Polonnaruwa",
        stay: "Aliya Resort & Spa / Habarana Village",
        description: "Cycle along tree-lined stone avenues past royal palaces, audience halls, and the famous Gal Vihara Buddha statues.",
        highlights: ["Gal Vihara Buddha rock statues", "Royal palace ruins", "Bicycle tour"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Dambulla Caves & Journey to Kandy",
        location: "Dambulla to Kandy",
        stay: "Grand Kandyan Hotel",
        description: "Visit the 5 gilded cave temples of Dambulla, then head into the hills of Kandy for an evening cultural dance show.",
        highlights: ["Dambulla Cave Temples", "Kandyan cultural dance show", "Kandy Lake walk"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Temple of the Tooth & Airport Departure",
        location: "Kandy to Airport",
        stay: "Departure",
        description: "Morning visit to the Temple of the Tooth Relic, followed by a comfortable drive back to Colombo Airport.",
        highlights: ["Temple of the Tooth ceremony", "Direct airport transfer"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "tour-6",
    slug: "southern-ocean-blue-whales-and-galle",
    title: "Southern Coast, Whales & Beach Holiday",
    tagline: "Blue whale watching boat trips, stilt fishermen, sandy swimming beaches, and historic Galle Dutch Fort.",
    duration: "7 Days / 6 Nights",
    nights: 6,
    pricePerPerson: 1350,
    rating: 4.97,
    reviewsCount: 38,
    region: "south",
    style: "ocean",
    idealSeason: "November to April",
    heroImage: "/images/galle_fort_lighthouse_twilight.jpg",
    galleryImages: [
      "/images/galle_fort_lighthouse_twilight.jpg",
      "/images/sri_lanka_traditional_stilt_fishermen_gold.jpg",
      "/images/mirissa_coconut_tree_hill_sunset.jpg",
      "/images/mirissa_boat_turquoise_ocean.jpg",
      "/images/galle_fort_ramparts_sunset.jpg"
    ],
    overview: "Enjoy the sunny tropical shores of southern Sri Lanka. Take a boat tour from Mirissa to see the largest creatures on earth—Blue Whales. Walk the cobblestone streets and ocean ramparts of 17th-century Galle Dutch Fort, and relax on golden swimming beaches.",
    highlights: [
      "Morning boat tour to observe Blue Whales and spinner dolphins in the wild",
      "Sunset stroll along the historic ramparts of UNESCO Galle Dutch Fort",
      "See traditional stilt fishermen over the waves at Weligama",
      "Relax on golden sandy beaches in Mirissa, Unawatuna, and Bentota",
      "Visit a sea turtle conservation hatchery"
    ],
    inclusions: [
      "6 nights in beachfront hotels and boutique fort accommodations",
      "Daily breakfast and selected seafood dinners",
      "Whale watching boat tickets with safety vests and naturalist guide",
      "Private air-conditioned car with dedicated chauffeur-guide",
      "All museum admissions and site passes"
    ],
    exclusions: [
      "International flights and visa fees",
      "Personal travel insurance",
      "Tips for driver and boat crew"
    ],
    accommodationGrade: "4-Star Beach Resorts & Boutique Heritage Hotels",
    transitStyle: "Private Air-Conditioned Vehicle",
    itinerary: [
      {
        day: 1,
        title: "Colombo Airport to Galle Fort",
        location: "Galle Fort",
        stay: "Fort Bazaar / Le Grand Galle",
        description: "Meet your driver at Colombo Airport and take the fast Southern Expressway straight to historic Galle Fort.",
        highlights: ["Airport pickup", "Fast highway transfer", "Evening walk on Galle Fort ramparts"],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Walking Tour of Historic Galle Fort",
        location: "Galle Fort",
        stay: "Fort Bazaar / Le Grand Galle",
        description: "Discover 400 years of colonial history. Walk past the lighthouse, Dutch Reformed Church, and artisan jewelry shops.",
        highlights: ["Galle lighthouse photo stop", "Historic cobblestone lanes", "Sunset over the ocean walls"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 3,
        title: "Blue Whale Watching Tour in Mirissa",
        location: "Mirissa",
        stay: "Mandara Resort Mirissa / Weligama Bay Marriott",
        description: "Early morning boat tour from Mirissa to spot giant Blue Whales and playful dolphins in their natural ocean habitat.",
        highlights: ["Blue whale spotting", "Dolphin pods", "Afternoon beach relaxation"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 4,
        title: "Stilt Fishermen & Beach Day in Weligama",
        location: "Weligama & Mirissa",
        stay: "Mandara Resort Mirissa / Weligama Bay Marriott",
        description: "Photograph traditional stilt fishermen perched over breaking waves. Try a beginner surf lesson or relax with fresh coconuts.",
        highlights: ["Stilt fishermen photo stop", "Surfing or swimming in Weligama bay", "Sunset cocktails"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 5,
        title: "Sea Turtle Hatchery & Bentota River Safari",
        location: "Bentota",
        stay: "Taj Bentota Resort / Cinnamon Bentota Beach",
        description: "Visit a sea turtle sanctuary to see newly hatched baby turtles, followed by a scenic boat safari on the Madu River.",
        highlights: ["Baby sea turtle conservation", "Madu river mangrove boat safari", "Cinnamon island demonstration"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 6,
        title: "Golden Beach Relaxation & Seafood Dinner",
        location: "Bentota",
        stay: "Taj Bentota Resort / Cinnamon Bentota Beach",
        description: "A full day of relaxation on the wide golden sand beach of Bentota. Enjoy a farewell beachside dinner under the stars.",
        highlights: ["Beach swimming & sunbathing", "Water sports (jet ski / banana boat)", "Farewell seafood dinner"],
        meals: "Breakfast & Dinner"
      },
      {
        day: 7,
        title: "Bentota to Colombo Airport Departure",
        location: "Colombo / Airport",
        stay: "Departure",
        description: "Take the expressway back to Colombo Airport for your flight home with wonderful tropical memories.",
        highlights: ["Direct airport highway transfer"],
        meals: "Breakfast Included"
      }
    ]
  }
];

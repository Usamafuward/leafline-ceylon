export interface ConciergeService {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  image: string;
  badge: string;
  highlightMetric: string;
  description: string;
  features: string[];
}

export const SERVICES_DATA: ConciergeService[] = [
  {
    id: "service-fleet",
    title: "Private Chauffeur & Modern Vehicles",
    tagline: "Air-conditioned sedans, SUVs, and passenger vans with dedicated English-speaking drivers.",
    icon: "directions_car",
    image: "/images/toyota_prado_luxury_suv.jpg",
    badge: "PRIVATE TRANSPORT",
    highlightMetric: "Toyota & Mercedes Fleet",
    description: "Travel across Sri Lanka in comfort and safety. All vehicles are modern, clean, fully insured, and equipped with cold bottled water, wet towels, and onboard Wi-Fi.",
    features: [
      "Toyota Land Cruiser Prado SUVs & Mercedes-Benz sedans",
      "Spacious Toyota HiAce & Vellfire vans for families",
      "Licensed English-speaking driver-guides with 8+ years experience",
      "Full passenger insurance and toll charges included"
    ]
  },
  {
    id: "service-vip-airport",
    title: "Airport Meet & Greet Service",
    tagline: "Friendly personal pickup directly at Colombo Airport (CMB) with no waiting in line.",
    icon: "flight_land",
    image: "/images/sri_lanka_airport_welcome_garland.webp",
    badge: "AIRPORT PICKUP",
    highlightMetric: "24/7 Flight Tracking",
    description: "Your driver welcomes you right at the arrival terminal with a personalized name board, helps carry your luggage, and escorts you straight to your air-conditioned vehicle.",
    features: [
      "Driver waiting at arrivals hall with your name board",
      "Free flight delay tracking so your ride is always ready",
      "Help with currency exchange and local tourist SIM cards",
      "Direct highway transfer to your first hotel or beach resort"
    ]
  },
  {
    id: "service-safari-jeep",
    title: "4x4 National Park Safari Jeeps",
    tagline: "Private open-top safari jeeps with experienced wildlife trackers in Yala and Udawalawe.",
    icon: "pets",
    image: "/images/yala_safari_jeep_elephant_encounter.jpg",
    badge: "WILDLIFE SAFARI",
    highlightMetric: "Yala & Wilpattu Safaris",
    description: "Experience the thrill of seeing wild leopards, elephants, bears, and crocodiles up close in customized safari jeeps designed for photography and safety.",
    features: [
      "Raised open-top seating for clear 360-degree views",
      "Experienced local park tracker and guide on every safari",
      "All park entry tickets and permits arranged in advance",
      "Complimentary water bottles and binoculars provided"
    ]
  },
  {
    id: "service-train-tickets",
    title: "Kandy to Ella Scenic Train Tickets",
    tagline: "Reserved 1st-class train tickets through the famous tea country and Nine Arch Bridge.",
    icon: "train",
    image: "/images/ella_nine_arch_bridge_train_crossing.jpg",
    badge: "SCENIC TRAIN",
    highlightMetric: "Guaranteed Reserved Seats",
    description: "Train tickets through Sri Lanka's tea country sell out weeks in advance. We secure your reserved window seats while your driver carries all heavy luggage ahead by car.",
    features: [
      "Reserved seats in the 1st Class Observation Carriage",
      "Your heavy luggage travels safely ahead in your private vehicle",
      "Driver meets you right on the platform when your train arrives",
      "Best photo stops arranged at Ella and Nine Arch Bridge"
    ]
  },
  {
    id: "service-seaplane-heli",
    title: "Helicopter & Scenic Domestic Flights",
    tagline: "Fast domestic flights and private helicopter transfers between Colombo, Sigiriya, and beaches.",
    icon: "flight",
    image: "/images/cinnamon_air_seaplane_dock.jpg",
    badge: "DOMESTIC FLIGHTS",
    highlightMetric: "Save Hours of Travel",
    description: "Turn a 5-hour drive into a scenic 35-minute flight across waterfalls and mountains. Perfect for travelers with limited time or celebrating a special occasion.",
    features: [
      "Private helicopter charters to Sigiriya, Kandy, and Yala",
      "Scenic flights over Adam's Peak and mountain tea hills",
      "Direct resort-to-resort helipad transfers",
      "Fast check-in with dedicated luggage handling"
    ]
  },
  {
    id: "service-villa-booking",
    title: "Handpicked Boutique Hotels & Beach Resorts",
    tagline: "Stay in colonial tea bungalows, jungle eco-resorts, and private beachfront villas.",
    icon: "hotel",
    image: "/images/galle_fort_colonial_architecture.jpg",
    badge: "CURATED HOTELS",
    highlightMetric: "Best Price Guarantee",
    description: "We partner with top-rated hotels, colonial tea planter bungalows, and private beach villas across Sri Lanka to ensure prime locations and exceptional hospitality.",
    features: [
      "Exclusive partnerships with 4-star and 5-star boutique hotels",
      "Colonial tea bungalows with cozy fireplaces in Nuwara Eliya",
      "Private ocean-view villas with swimming pools in the south",
      "Free room upgrades and late check-out whenever available"
    ]
  }
];

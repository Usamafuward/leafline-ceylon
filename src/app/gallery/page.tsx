'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  MapPinPlus,
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  pill: string;
  title: string;
  category: 'adventure' | 'coast' | 'wildlife' | 'culture' | 'highlands';
  location: string;
  image: string;
  caption: string;
  isBento?: boolean;
  colSpanClass?: string;
  rowSpanClass?: string;
  heightClass?: string;
  titleSizeClass?: string;
}

// 1. The 16-Panel Editorial Bento Grid Items (Exact order and layout matching the reference design)
const BENTO_COLLECTION: GalleryItem[] = [
  // Row 1 & 2
  {
    id: 'bento-1',
    pill: 'ADVENTURE',
    title: 'Whitewater Days',
    category: 'adventure',
    location: 'Kitulgala Rainforest Rapids',
    image: '/images/bento_whitewater_days.jpg',
    caption: 'High-adrenaline river rafting navigating thrilling Grade 3 and 4 churning rapids through Kitulgala’s primordial rainforest canopy.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-2',
    pill: 'COAST',
    title: 'Surf Lines',
    category: 'coast',
    location: 'Ahangama & Weligama Bay',
    image: '/images/weligama_surfing_beach.jpg',
    caption: 'Glassy sunrise peeling waves and reef breaks welcoming longboarders and shortboarders along Sri Lanka’s golden southern coast.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-3',
    pill: 'WILDLIFE',
    title: 'Whales Off Mirissa',
    category: 'wildlife',
    location: 'Mirissa Deep Indian Ocean',
    image: '/images/whale.jpg',
    caption: 'A colossal blue whale breaching majestically into the morning sea spray off Mirissa’s continental shelf drop-off.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1 lg:row-span-2',
    heightClass: 'h-[320px] sm:h-[406px] md:h-[446px]',
    titleSizeClass: 'text-xl sm:text-2xl md:text-3xl font-extrabold',
  },
  {
    id: 'bento-4',
    pill: 'WILDLIFE',
    title: 'Turtles by Moonlight',
    category: 'wildlife',
    location: 'Rekawa & Kosgoda Sands',
    image: '/images/bento_turtles_moonlight.jpg',
    caption: 'Wild sea turtles gliding through the glowing evening shoreline surf on the protected south coast sands.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-5',
    pill: 'CULTURE',
    title: 'Family Kitchens',
    category: 'culture',
    location: 'Southern Village Enclaves',
    image: '/images/bento_family_kitchens.jpg',
    caption: 'Aromatic cinnamon, fresh coconut cream, and hand-ground spice pastes simmering patiently in terracotta clay pots over wood hearths.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },

  // Row 3 (Four 1x1 cards across 4 columns)
  {
    id: 'bento-6',
    pill: 'CULTURE',
    title: 'Tuk-tuk Days',
    category: 'culture',
    location: 'Island Coastal Byways',
    image: '/images/bento_tuktuk_days.jpg',
    caption: 'Winding breezy journeys down sandy palm-lined lanes, past roadside cinnamon peelers and quiet coastal hamlets.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-7',
    pill: 'COAST',
    title: 'Snorkel Coves',
    category: 'coast',
    location: 'Nilaveli & Pigeon Island',
    image: '/images/nilaveli_beach_turquoise_cove.jpg',
    caption: 'Pristine calm turquoise coves and white sand shores sheltered by granite headlands and thriving marine ecosystems.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-8',
    pill: 'COAST',
    title: 'Reef Diving',
    category: 'coast',
    location: 'Hikkaduwa & Southern Reefs',
    image: '/images/snorkeling_sea_turtle_coral_reef.jpg',
    caption: 'Gliding weightlessly beside wild hawksbill turtles across ancient shallow coral gardens teeming with tropical fish.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-9',
    pill: 'HIGHLANDS',
    title: 'Tea-Pluck Mornings',
    category: 'highlands',
    location: 'Nuwara Eliya Tea Terraces',
    image: '/images/bento_tea_pluck_mornings.jpg',
    caption: 'Generations of artisan harvesters hand-picking tender two leaves and a bud across emerald mountain terraces veiled in cloud mist.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },

  // Row 4 (Two wide horizontal 2-column cards)
  {
    id: 'bento-10',
    pill: 'COAST',
    title: 'The Bentota Lagoon',
    category: 'coast',
    location: 'Bentota Peninsula & River',
    image: '/images/bento_bentota_lagoon.jpg',
    caption: 'Aerial sweep of golden beach sands where the serene freshwater Bentota River meets the turquoise swells of the Indian Ocean.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-lg sm:text-xl md:text-2xl font-bold',
  },
  {
    id: 'bento-11',
    pill: 'ADVENTURE',
    title: 'Balloons Over Dambulla',
    category: 'adventure',
    location: 'Cultural Triangle & Sigiriya Lake',
    image: '/images/bento_balloons_dambulla.jpg',
    caption: 'Drifting serenely above mist-filled valleys, ancient irrigation tanks, and dramatic monoliths in the golden light of dawn.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-lg sm:text-xl md:text-2xl font-bold',
  },

  // Row 5 & 6 (Large 2x2 featured card on the left, four 1x1 cards on the right)
  {
    id: 'bento-12',
    pill: 'HIGHLANDS',
    title: 'The Hill Country Train',
    category: 'highlands',
    location: 'Ella & Demodara Viaduct',
    image: '/images/ella_nine_arch_bridge_train_crossing.jpg',
    caption: 'The legendary hill country passenger train curving gently across the 1921 British colonial stone Nine Arch Viaduct surrounded by lush cloud forest.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1 lg:row-span-2',
    heightClass: 'h-[320px] sm:h-[406px] md:h-[446px]',
    titleSizeClass: 'text-xl sm:text-2xl md:text-3xl font-extrabold',
  },
  {
    id: 'bento-13',
    pill: 'HIGHLANDS',
    title: 'Ravana Falls',
    category: 'highlands',
    location: 'Ella Mountain Pass',
    image: '/images/ella_cascading_waterfall_pool.jpg',
    caption: 'Cascading mountain torrents plunging into natural rock pools sheltered by thick tropical foliage and mountain ferns.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-14',
    pill: 'CULTURE',
    title: 'Devil Masks',
    category: 'culture',
    location: 'Ambalangoda Heritage Workshops',
    image: '/images/bento_devil_masks.jpg',
    caption: 'Vibrant hand-carved Kaduru wood Raksha masks used in traditional Kolam rituals, painted with natural pigments to protect against evil.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-15',
    pill: 'CULTURE',
    title: 'Master Carvers',
    category: 'culture',
    location: 'Galle & Kandy Wood Guilds',
    image: '/images/bento_master_carvers.jpg',
    caption: 'Generations of master craftsmen sculpting intricate elephant statues and teak filigree in heritage artisan studios.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'bento-16',
    pill: 'CULTURE',
    title: 'Sapphire Country',
    category: 'culture',
    location: 'Ratnapura Gem Enclaves',
    image: '/images/bento_sapphire_country.jpg',
    caption: 'World-renowned Ceylon cornflower and royal blue sapphires, cut and polished by master lapidaries since the Silk Road era.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
];

// 2. The 20-Panel Classic Curator Archives (Engineered into a mathematically balanced 4-column Bento Grid!)
const CLASSIC_ARCHIVES: GalleryItem[] = [
  // Rows 1 & 2: Two 1x1 on Left + 2x2 Hero on Right (Sigiriya Aerial Citadel) + Two 1x1 below on Left
  {
    id: 'arch-1',
    pill: 'CULTURE',
    title: 'Ancient Sky Steps',
    category: 'culture',
    location: 'Sigiriya, Cultural Triangle',
    image: '/images/sigiriya_rock_ancient_steps_sunset.jpg',
    caption: 'Ancient 5th-century stone steps leading up to King Kashyapa’s sky citadel under a dramatic sunset sky.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-2',
    pill: 'WILDLIFE',
    title: 'Yala Granite Leopard',
    category: 'wildlife',
    location: 'Yala National Park',
    image: '/images/yala_leopard_sunset.jpg',
    caption: 'Wild Sri Lankan leopard resting peacefully atop sun-warmed rocks as golden sunset washes across the park.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-11',
    pill: 'CULTURE',
    title: 'Sigiriya Aerial Citadel',
    category: 'culture',
    location: 'Sigiriya World Heritage Site',
    image: '/images/sigiriya_rock_aerial_drone_sunset.jpg',
    caption: 'Breathtaking bird’s-eye perspective of the 200-meter monolith and Pidurangala Rock bathed in sunset gold.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1 lg:row-span-2',
    heightClass: 'h-[320px] sm:h-[406px] md:h-[446px]',
    titleSizeClass: 'text-xl sm:text-2xl md:text-3xl font-extrabold',
  },
  {
    id: 'arch-3',
    pill: 'COAST',
    title: 'Artisanal Stilt Surf',
    category: 'coast',
    location: 'Ahangama & Weligama Bay',
    image: '/images/sri_lanka_traditional_stilt_fishermen_gold.jpg',
    caption: 'Centuries-old artisanal stilt fishing tradition in the glowing evening surf of Sri Lanka’s south coast.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-4',
    pill: 'CULTURE',
    title: 'Dalada Maligawa Twilight',
    category: 'culture',
    location: 'Kandy Lake, Central Province',
    image: '/images/kandy_dalada_maligawa_sunset.jpg',
    caption: 'The venerated Sri Dalada Maligawa reflected across the calm waters of Kandy Lake at twilight.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },

  // Row 3: Four balanced single 1x1 cards across all 4 columns
  {
    id: 'arch-5',
    pill: 'WILDLIFE',
    title: 'Wild Tusker Trail',
    category: 'wildlife',
    location: 'Yala National Park',
    image: '/images/yala_safari_jeep_elephant_encounter.jpg',
    caption: 'A magnificent wild elephant walking along the red safari track in front of our open 4x4 safari jeep.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-6',
    pill: 'HIGHLANDS',
    title: 'Highland Cloud Sea',
    category: 'highlands',
    location: 'Nuwara Eliya & Ella',
    image: '/images/nuwara_eliya_tea_estate_morning_clouds.jpg',
    caption: 'Sweeping Ceylon tea terraces and viaduct veiled in high-altitude mountain mist and golden morning sun.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-7',
    pill: 'COAST',
    title: 'Galle Fort Lighthouse',
    category: 'coast',
    location: 'UNESCO Galle Fort',
    image: '/images/galle_fort_lighthouse_twilight.jpg',
    caption: 'The iconic whitewashed 1939 lighthouse and Utrecht bastion against a pastel sunset sky.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-8',
    pill: 'HIGHLANDS',
    title: 'Ceylon Blue Rail Pass',
    category: 'highlands',
    location: 'Kandy to Ella Rail Pass',
    image: '/images/ella_scenic_mountain_train.jpg',
    caption: 'One of the world’s most scenic railway journeys winding through mist-shrouded green tea plantations.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },

  // Row 4: Two wide 2-column panoramic landscape cards
  {
    id: 'arch-9',
    pill: 'COAST',
    title: 'Mirissa Coconut Tree Hill',
    category: 'coast',
    location: 'Mirissa, Southern Province',
    image: '/images/mirissa_coconut_tree_hill_sunset.jpg',
    caption: 'Slender coconut palms perched on a headland overlooking the golden Indian Ocean sunset.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-lg sm:text-xl md:text-2xl font-bold',
  },
  {
    id: 'arch-12',
    pill: 'HIGHLANDS',
    title: 'World’s End Escarpment',
    category: 'highlands',
    location: 'Horton Plains National Park',
    image: '/images/horton_plains_worlds_end_mist.jpg',
    caption: 'Layers of misty mountain ridges dropping dramatically 1,000 meters into southern tea valleys.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-lg sm:text-xl md:text-2xl font-bold',
  },

  // Rows 5 & 6: 2x2 Hero on Left (Galle Dutch Ramparts) + Four 1x1 cards on the Right
  {
    id: 'arch-14',
    pill: 'CULTURE',
    title: 'Galle Dutch Ramparts',
    category: 'culture',
    location: 'Galle Fort Ramparts',
    image: '/images/galle_fort_ramparts_sunset.jpg',
    caption: 'Visitors and locals enjoying the sea breeze along the centuries-old 17th-century coral rampart walls.',
    isBento: true,
    colSpanClass: 'col-span-1 sm:col-span-2 lg:col-span-2',
    rowSpanClass: 'row-span-1 lg:row-span-2',
    heightClass: 'h-[320px] sm:h-[406px] md:h-[446px]',
    titleSizeClass: 'text-xl sm:text-2xl md:text-3xl font-extrabold',
  },
  {
    id: 'arch-10',
    pill: 'WILDLIFE',
    title: 'Giants of Udawalawe',
    category: 'wildlife',
    location: 'Udawalawe / Minneriya',
    image: '/images/udawalawe_elephant_mother_calf.jpg',
    caption: 'A wild elephant mother and her playful young calf kicking up dust along the safari trail.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-13',
    pill: 'WILDLIFE',
    title: 'Dawn Leopard Prowl',
    category: 'wildlife',
    location: 'Yala National Park',
    image: '/images/yala_leopard_safari_track.jpg',
    caption: 'Panthera pardus kotiya on the move through the coastal scrub during early morning light.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-15',
    pill: 'CULTURE',
    title: 'The Sacred Octagon',
    category: 'culture',
    location: 'Kandy Kingdom',
    image: '/images/kandy_temple_of_tooth_octagon_night.jpg',
    caption: 'The historic Paththirippuwa octagon illuminated under the night sky during evening Pooja ceremonies.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-16',
    pill: 'CULTURE',
    title: 'Colonial Dutch Quarter',
    category: 'culture',
    location: 'Galle Fort',
    image: '/images/galle_fort_colonial_architecture.jpg',
    caption: 'Restored Dutch colonial architecture, terracotta roofs, and historic cobblestone street atmosphere.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },

  // Row 7: Four balanced 1x1 cards to anchor the base
  {
    id: 'arch-17',
    pill: 'HIGHLANDS',
    title: 'Highland Cloud Forest',
    category: 'highlands',
    location: 'Central Highlands',
    image: '/images/horton_plains_cloud_forest_mist.jpg',
    caption: 'Ethereal morning sun piercing through highland cloud forest canopy reflecting in pristine mountain pools.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-18',
    pill: 'COAST',
    title: 'Southern Palms Twilight',
    category: 'coast',
    location: 'Southern Coast Beaches',
    image: '/images/south_coast_palm_sunset.jpg',
    caption: 'Fiery crimson and indigo skies behind iconic tropical coconut palms bordering the Indian Ocean.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-19',
    pill: 'CULTURE',
    title: 'Polonnaruwa Vatadage',
    category: 'culture',
    location: 'Polonnaruwa Quadrangle',
    image: '/images/polonnaruwa_vatadage_ancient_relic.jpg',
    caption: 'Circular 12th-century Buddhist shrine adorned with guard stones, moonstones, and stone-carved stupa pillars.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
  {
    id: 'arch-20',
    pill: 'COAST',
    title: 'Ahangama Reef Surf',
    category: 'coast',
    location: 'Ahangama Coastal Reef',
    image: '/images/ahangama_surf_coast.jpg',
    caption: 'Crystalline turquoise reef breaks and white foam along the south coast’s most celebrated surf enclave.',
    isBento: true,
    colSpanClass: 'col-span-1',
    rowSpanClass: 'row-span-1',
    heightClass: 'h-[195px] md:h-[215px]',
    titleSizeClass: 'text-base md:text-lg',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Photographs' },
  { id: 'coast', label: 'Azure Coast' },
  { id: 'highlands', label: 'Tea Country & Rail' },
  { id: 'wildlife', label: 'Wildlife & Safaris' },
  { id: 'culture', label: 'Ancient Citadels' },
  { id: 'adventure', label: 'Adventure' },
];

// All images combined for universal filtering and modal navigation
const ALL_GALLERY_ITEMS: GalleryItem[] = [...BENTO_COLLECTION, ...CLASSIC_ARCHIVES];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? ALL_GALLERY_ITEMS
    : ALL_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNextModal = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  }, [activeModalItem, filteredItems]);

  const handlePrevModal = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  }, [activeModalItem, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === 'Escape') setActiveModalItem(null);
      if (e.key === 'ArrowRight') handleNextModal();
      if (e.key === 'ArrowLeft') handlePrevModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, handleNextModal, handlePrevModal]);

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* 1. HERO BANNER */}
      <section className="w-full bg-[#103c2e] text-white pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(178,240,209,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-container relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-secondary-fixed mb-5">
            <Link href="/" className="text-white/80 hover:text-white no-underline transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">Visual Archives</span>
          </nav>

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase text-secondary-fixed font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
            THE VISUAL CHRONICLE
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] max-w-4xl mb-4">
            A Photographic Ode to Ceylon
          </h1>

          <p className="text-white/85 text-sm sm:text-base max-w-3xl leading-relaxed">
            Curated imagery captured during private voyages across the island. Every granite precipice, sapphire wave, and tea mist valley tells the story of an island untouched by mass haste.
          </p>
        </div>
      </section>

      {/* 2. FILTER TABS & DROPDOWN */}
      <section className="w-full bg-[#edf4ef]/95 backdrop-blur-md py-3.5 z-30 border-b border-[#cbdcd1]/80 shadow-xs">
        <div className="max-container">
          {/* Mobile Filter Dropdown */}
          <div className="sm:hidden w-full">
            <div className="relative">
              <select
                id="gallery-category-select"
                aria-label="Filter photographs by theme"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white text-primary text-sm font-semibold py-3 pl-4 pr-10 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary shadow-xs cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Filter Pills */}
          <div className="hidden sm:flex items-center justify-between gap-4 w-full">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-on-surface border-[#cbdcd1]/80 hover:border-secondary hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium shrink-0">
              <ZoomIn className="w-4 h-4 text-secondary" />
              <span>Click to enlarge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Gallery Body (Natural light background bg-surface) */}
      <section className="w-full py-14 md:py-18">
        <div className="max-container">
          {selectedCategory === 'all' ? (
            <div className="space-y-18">
              {/* Part A: The 16-Card Editorial Bento Grid */}
              <div>
                <div className="reveal-text flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-1">
                      Curated Order
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-primary font-normal m-0">
                      Editorial Bento Collection
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                    16 Curated Frames
                  </span>
                </div>

                {/* 4-COLUMN BENTO GRID 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4.5">
                  {BENTO_COLLECTION.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveModalItem(item)}
                      className={`reveal-image stagger-${(idx % 4) + 1} group relative rounded-2xl overflow-hidden cursor-pointer border border-surface-container-high shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest ${item.colSpanClass} ${item.rowSpanClass} ${item.heightClass}`}
                    >
                      {/* Image with Zoom */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* Crisp Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                      {/* Pill Badge Top-Left */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] tracking-widest uppercase font-bold text-white shadow-sm">
                          {item.pill}
                        </span>
                      </div>

                      {/* Title Bottom-Left */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none">
                        <h3 className={`font-sans font-bold text-white tracking-tight leading-tight m-0 drop-shadow-md ${item.titleSizeClass}`}>
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-white/80 font-medium m-0 mt-0.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part B: Classic Archives & Field Chronicles (ALSO in 4-Column Bento Grid!) */}
              <div className="pt-10 border-t border-surface-container-high">
                <div className="reveal-text flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-1">
                      Extended Archives
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-primary font-normal m-0">
                      Curator’s Classic Archives &amp; Field Chronicles
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                    20 Archival Bento Frames
                  </span>
                </div>

                {/* 4-COLUMN BENTO GRID 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4.5">
                  {CLASSIC_ARCHIVES.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveModalItem(item)}
                      className={`reveal-image stagger-${(idx % 4) + 1} group relative rounded-2xl overflow-hidden cursor-pointer border border-surface-container-high shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest ${item.colSpanClass} ${item.rowSpanClass} ${item.heightClass}`}
                    >
                      {/* Image with Zoom */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* Crisp Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                      {/* Pill Badge Top-Left */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] tracking-widest uppercase font-bold text-white shadow-sm">
                          {item.pill}
                        </span>
                      </div>

                      {/* Title Bottom-Left */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none">
                        <h3 className={`font-sans font-bold text-white tracking-tight leading-tight m-0 drop-shadow-md ${item.titleSizeClass}`}>
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-white/80 font-medium m-0 mt-0.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* FILTERED CATEGORY VIEW (Combines both bento and classic archive items) */
            <div>
              <div className="reveal-text mb-8">
                <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-1">
                  Filtered Results
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-primary font-normal m-0">
                  Showing {filteredItems.length} Photographs
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                {filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveModalItem(item)}
                    className={`reveal-image stagger-${(idx % 3) + 1} group cursor-pointer relative h-[330px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-surface-container-high bg-surface-container-lowest`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,37,26,0.88)] via-[rgba(0,37,26,0.3)] to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] tracking-widest uppercase font-bold text-white shadow-sm">
                        {item.pill}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white pointer-events-none">
                      <span className="text-[0.72rem] tracking-widest uppercase text-secondary-fixed font-semibold block mb-1">
                        {item.location}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug m-0">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/80 mt-1 line-clamp-1 font-light">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Lightbox Fullscreen Modal */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-[#103c2e]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[1020px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-[#cbdcd1]/80"
          >
            {/* Viewport with Prev / Next Navigation */}
            <div className="relative flex-1 min-h-[320px] max-h-[580px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-contain"
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Arrow Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevModal();
                }}
                aria-label="Previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextModal();
                }}
                aria-label="Next photograph"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Action Area */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs uppercase text-secondary font-semibold tracking-wider">
                    {activeModalItem.pill}
                  </span>
                  <span className="text-xs text-on-surface-variant/50">•</span>
                  <span className="text-xs uppercase text-on-surface-variant font-medium">
                    {activeModalItem.location}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-primary mt-1 mb-2 font-normal">
                  {activeModalItem.title}
                </h3>
                <p className="text-[0.9rem] text-on-surface-variant max-w-[650px] m-0 leading-relaxed font-light">
                  {activeModalItem.caption}
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link
                  href="/plan-trip"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-fixed text-white hover:text-primary px-6 py-3 rounded-full text-[0.85rem] font-semibold tracking-wide transition-all duration-300 shadow-md cursor-pointer no-underline"
                >
                  <MapPinPlus className="w-4 h-4 shrink-0" />
                  <span>Include in My Trip</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

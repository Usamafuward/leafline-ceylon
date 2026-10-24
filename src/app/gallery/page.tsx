'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import PageHero from '@/components/PageHero';
import useScrollLock from '@/components/ui/useScrollLock';
import Image from 'next/image';
import { gridItemMotion } from '@/components/ui/gridMotion';
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
    image: '/images/bento_whitewater_days.webp',
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
    image: '/images/weligama_surfing_beach.webp',
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
    image: '/images/whale.webp',
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
    image: '/images/bento_turtles_moonlight.webp',
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
    image: '/images/bento_family_kitchens.webp',
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
    image: '/images/bento_tuktuk_days.webp',
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
    image: '/images/nilaveli_beach_turquoise_cove.webp',
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
    image: '/images/snorkeling_sea_turtle_coral_reef.webp',
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
    image: '/images/bento_tea_pluck_mornings.webp',
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
    image: '/images/bento_bentota_lagoon.webp',
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
    image: '/images/bento_balloons_dambulla.webp',
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
    image: '/images/ella_nine_arch_bridge_train_crossing.webp',
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
    image: '/images/ella_cascading_waterfall_pool.webp',
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
    image: '/images/bento_devil_masks.webp',
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
    image: '/images/bento_master_carvers.webp',
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
    image: '/images/bento_sapphire_country.webp',
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
    image: '/images/sigiriya_rock_ancient_steps_sunset.webp',
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
    image: '/images/yala_leopard_sunset.webp',
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
    image: '/images/sigiriya_rock_aerial_drone_sunset.webp',
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
    image: '/images/sri_lanka_traditional_stilt_fishermen_gold.webp',
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
    image: '/images/kandy_dalada_maligawa_sunset.webp',
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
    image: '/images/yala_safari_jeep_elephant_encounter.webp',
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
    image: '/images/nuwara_eliya_tea_estate_morning_clouds.webp',
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
    image: '/images/galle_fort_lighthouse_twilight.webp',
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
    image: '/images/ella_scenic_mountain_train.webp',
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
    image: '/images/mirissa_coconut_tree_hill_sunset.webp',
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
    image: '/images/horton_plains_worlds_end_mist.webp',
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
    image: '/images/galle_fort_ramparts_sunset.webp',
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
    image: '/images/udawalawe_elephant_mother_calf.webp',
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
    image: '/images/yala_leopard_safari_track.webp',
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
    image: '/images/kandy_temple_of_tooth_octagon_night.webp',
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
    image: '/images/galle_fort_colonial_architecture.webp',
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
    image: '/images/horton_plains_cloud_forest_mist.webp',
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
    image: '/images/south_coast_palm_sunset.webp',
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
    image: '/images/polonnaruwa_vatadage_ancient_relic.webp',
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
    image: '/images/ahangama_surf_coast.webp',
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

// Gallery photos go through Next's image optimiser: several originals are 4-7 MB camera files
// (up to 5897px wide), far too heavy to redraw at every frame of the open / close morph.
// The lightbox base layer reuses GALLERY_THUMB_SIZES so it shares the thumbnail's file.
const GALLERY_THUMB_SIZES = '(max-width: 640px) 100vw, 50vw';
const GALLERY_LIGHTBOX_SIZES = '(max-width: 1100px) 100vw, 1020px';

// Thumbnail corner radius, set as motion style so it animates smoothly during the lightbox morph
const THUMB_RADIUS = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
};

// A static copy of the photo painted behind each card, so the card never looks like an
// empty placeholder while its photo is away in (or flying back from) the lightbox
const cardBackdrop = (image: string) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

// All images combined for universal filtering and modal navigation
const ALL_GALLERY_ITEMS: GalleryItem[] = [...BENTO_COLLECTION, ...CLASSIC_ARCHIVES];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  // The photo the lightbox was opened from: only it morphs (prev / next inside the lightbox crossfade)
  const [openedItemId, setOpenedItemId] = useState<string | null>(null);
  // Width / height of the photo on show, so the lightbox frame matches it exactly (no letterboxing to morph into)
  const [lightboxAspect, setLightboxAspect] = useState(3 / 2);

  useScrollLock(activeModalItem !== null);

  // Opens instantly: the lightbox's base layer reuses the thumbnail's already-decoded image,
  // so there is nothing to wait for before the morph starts
  const openLightbox = (item: GalleryItem, card: HTMLElement) => {
    const img = card.querySelector('img');
    if (img?.naturalWidth) setLightboxAspect(img.naturalWidth / img.naturalHeight);
    setOpenedItemId(item.id);
    setActiveModalItem(item);
  };

  const closeLightbox = () => setActiveModalItem(null);

  // Read a photo's proportions from its (already loaded) thumbnail on the page
  const showInLightbox = (item: GalleryItem) => {
    const img = document.querySelector<HTMLImageElement>(`img[data-gallery-thumb="${item.id}"]`);
    if (img?.naturalWidth) setLightboxAspect(img.naturalWidth / img.naturalHeight);
    setActiveModalItem(item);
  };

  const filteredItems = selectedCategory === 'all'
    ? ALL_GALLERY_ITEMS
    : ALL_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNextModal = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    showInLightbox(filteredItems[nextIndex]);
  }, [activeModalItem, filteredItems]);

  const handlePrevModal = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    showInLightbox(filteredItems[prevIndex]);
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
      {/* 1. PHOTO HERO (shared across inner pages) */}
      <PageHero
        crumb="Visual Archives"
        eyebrow="The Visual Chronicle"
        title="A Photographic Ode to Ceylon"
        description="Curated imagery captured during private voyages across the island. Every granite precipice, sapphire wave, and tea mist valley tells the story of an island untouched by mass haste."
        image="/images/sri_lanka_traditional_stilt_fishermen_gold.webp"
        imageAlt="Traditional stilt fishermen on the southern coast at golden hour"
        imagePosition="center 50%"
      />

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
                      <SplitText text="Editorial Bento Collection" />
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
                      onClick={(e) => openLightbox(item, e.currentTarget)}
                      style={cardBackdrop(item.image)}
                      className={`reveal-image stagger-${(idx % 4) + 1} group relative rounded-2xl overflow-hidden cursor-pointer border border-surface-container-high shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest ${item.colSpanClass} ${item.rowSpanClass} ${item.heightClass}`}
                    >
                      {/* Image with Zoom (shared element: morphs into the lightbox when opened) */}
                      <motion.div layoutId={`gallery-photo-${item.id}`} className="relative w-full h-full overflow-hidden" style={THUMB_RADIUS}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes={GALLERY_THUMB_SIZES}
                          data-gallery-thumb={item.id}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                      </motion.div>

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
                      <SplitText text="Curator’s Classic Archives & Field Chronicles" />
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
                      onClick={(e) => openLightbox(item, e.currentTarget)}
                      style={cardBackdrop(item.image)}
                      className={`reveal-image stagger-${(idx % 4) + 1} group relative rounded-2xl overflow-hidden cursor-pointer border border-surface-container-high shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest ${item.colSpanClass} ${item.rowSpanClass} ${item.heightClass}`}
                    >
                      {/* Image with Zoom (shared element: morphs into the lightbox when opened) */}
                      <motion.div layoutId={`gallery-photo-${item.id}`} className="relative w-full h-full overflow-hidden" style={THUMB_RADIUS}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes={GALLERY_THUMB_SIZES}
                          data-gallery-thumb={item.id}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                      </motion.div>

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
                <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    {...gridItemMotion(idx)}
                    onClick={(e) => openLightbox(item, e.currentTarget)}
                      style={cardBackdrop(item.image)}
                    className="group cursor-pointer relative h-[330px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-[box-shadow,translate] duration-300 border border-surface-container-high bg-surface-container-lowest"
                  >
                    <motion.div layoutId={`gallery-photo-${item.id}`} className="relative w-full h-full overflow-hidden" style={THUMB_RADIUS}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes={GALLERY_THUMB_SIZES}
                        data-gallery-thumb={item.id}
                        className="object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
                      />
                    </motion.div>
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
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Lightbox Fullscreen Modal: the clicked photo morphs out of its thumbnail into the viewer;
          prev / next crossfade inside it; the page behind stays locked while it is open */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            key="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#103c2e]/95"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.35 }}
            />

            <div className="relative max-w-[1020px] w-full flex flex-col max-h-[92vh] shadow-2xl rounded-3xl">
              {/* Viewport: black stage fades in behind the photo as it lands */}
              <div className="relative h-[min(580px,58vh)] min-h-[300px] flex items-center justify-center shrink-0">
                <motion.div
                  className="absolute inset-0 bg-black rounded-t-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                />

                {/* propagate: when the whole lightbox closes, tell the photo it is leaving too, so it
                    hands back to its thumbnail immediately instead of after the backdrop has faded */}
                <AnimatePresence initial={false} mode="popLayout" propagate>
                  <motion.div
                    key={activeModalItem.id}
                    layoutId={activeModalItem.id === openedItemId ? `gallery-photo-${activeModalItem.id}` : undefined}
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: lightboxAspect,
                      width: `min(100%, calc(min(580px, 58vh) * ${lightboxAspect}))`,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                    initial={activeModalItem.id === openedItemId ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{
                      layout: { type: 'spring', bounce: 0, visualDuration: 0.55 },
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    }}
                  >
                    {/* Base layer: the exact image the thumbnail already shows (same sizes = same file, already
                        decoded), so the morph paints on its first frame with no waiting */}
                    <Image
                      src={activeModalItem.image}
                      alt={activeModalItem.title}
                      fill
                      loading="eager"
                      sizes={GALLERY_THUMB_SIZES}
                      className="object-cover"
                    />
                    {/* Sharp layer: lightbox-sized copy fades in over it once loaded */}
                    <Image
                      src={activeModalItem.image}
                      alt=""
                      aria-hidden
                      fill
                      loading="eager"
                      sizes={GALLERY_LIGHTBOX_SIZES}
                      className="object-cover opacity-0 transition-opacity duration-300"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Controls fade in once the photo has landed */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {/* Close Button */}
                  <button
                    autoFocus
                    onClick={closeLightbox}
                    aria-label="Close modal"
                    className="pointer-events-auto absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-colors z-20"
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
                    className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-all z-20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextModal();
                    }}
                    aria-label="Next photograph"
                    className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border-0 cursor-pointer flex items-center justify-center transition-all z-20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </div>

              {/* Bottom Caption & Action Area (slides up under the landing photo) */}
              <motion.div
                data-lenis-prevent
                className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white rounded-b-3xl overflow-y-auto"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
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
                  <h3 id="gallery-lightbox-title" className="font-serif text-2xl md:text-3xl text-primary mt-1 mb-2 font-normal">
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
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

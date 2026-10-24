'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SRI_LANKA_PATHS from '@/data/sri_lanka_map_paths.json';
import MapRoute from '@/components/MapRoute';
import { townStop, RouteStop } from '@/data/mapGeo';

export interface TravelRegion {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  bestSeason: string;
  keyDestinations: string;
  highlights: string[];
  packageFilter: string;
  // Suggested touring order; drawn as an animated route when the region is selected
  route: RouteStop[];
}

export const CEYLON_REGIONS: TravelRegion[] = [
  {
    id: 'cultural-triangle',
    name: 'Cultural Triangle & Ancient Cities',
    shortName: 'Cultural Triangle',
    tagline: 'UNESCO Sky Citadels & Cave Temples',
    description:
      'The sacred cultural heartland of Sri Lanka. Ascend the 5th-century Sigiriya Rock Fortress at sunrise, wander the cave temples of Dambulla, and explore ancient royal palaces.',
    image: '/images/sigiriya_rock_ancient_steps_sunset.jpg',
    bestSeason: 'Dec – Apr & Jul – Sep',
    keyDestinations: 'Sigiriya, Anuradhapura, Polonnaruwa, Dambulla',
    highlights: [
      'Sigiriya 5th-century UNESCO Lion Rock Citadel',
      'Dambulla Golden Cave Temple complex',
      'Wild elephant gatherings in Minneriya National Park',
    ],
    packageFilter: '/packages?region=cultural',
    route: [townStop('Anuradhapura'), townStop('Sigiriya', { main: true }), townStop('Polonnaruwa')],
  },
  {
    id: 'mountainous-region',
    name: 'Central Highlands & Tea Country',
    shortName: 'Central Highlands',
    tagline: 'Misty Mountains & Colonial Tea Estates',
    description:
      'Rolling emerald tea plantations, cool highland air, and the scenic mountain blue train winding across the Demodara Nine Arch Bridge.',
    image: '/images/ella_nine_arch_bridge_train_crossing.jpg',
    bestSeason: 'Dec – May & Aug – Sep',
    keyDestinations: 'Kandy, Nuwara Eliya, Ella, Hatton',
    highlights: [
      'Scenic mountain blue train journey through tea valleys',
      'Demodara Nine Arch Bridge & Little Adam’s Peak',
      'Colonial tea estate stays & factory tastings',
    ],
    packageFilter: '/packages?region=highlands',
    route: [townStop('Kandy', { main: true }), townStop('Nuwara Eliya'), townStop('Ella')],
  },
  {
    id: 'the-south',
    name: 'Southern Coast & Safari Wilds',
    shortName: 'Southern Coast',
    tagline: 'Colonial Ramparts, Surf & Leopard Safaris',
    description:
      'Golden coastline meets wild game reserves. Stroll the ramparts of UNESCO Galle Fort, search for wild leopards in Yala, and watch blue whales off Mirissa.',
    image: '/images/galle_fort_lighthouse_twilight.jpg',
    bestSeason: 'Nov – Apr',
    keyDestinations: 'Galle Fort, Mirissa, Weligama, Yala',
    highlights: [
      'Private 4x4 leopard game drives in Yala National Park',
      '17th-century UNESCO Galle Dutch Fort sunset walk',
      'Whale and dolphin boat excursions in Mirissa',
    ],
    packageFilter: '/packages?region=south',
    route: [townStop('Galle', { main: true }), townStop('Mirissa'), townStop('Yala')],
  },
  {
    id: 'east-coast',
    name: 'The East Coast & Coral Bays',
    shortName: 'East Coast',
    tagline: 'Turquoise Waters, Point Breaks & Coral Reefs',
    description:
      'Pristine uncrowded beaches, calm shallow waters in Passikudah, rich marine biodiversity at Pigeon Island, and world-class surfing in Arugam Bay.',
    image: '/images/nilaveli_beach_turquoise_cove.jpg',
    bestSeason: 'May – Oct (Sri Lanka’s Summer Sun)',
    keyDestinations: 'Trincomalee, Passikudah, Arugam Bay',
    highlights: [
      'Pigeon Island Marine National Park coral snorkeling',
      'World-famous right-hand surf point of Arugam Bay',
      'Trincomalee natural harbor & Koneswaram temple',
    ],
    packageFilter: '/packages?region=east',
    route: [townStop('Trincomalee', { main: true }), townStop('Batticaloa'), townStop('Arugam Bay')],
  },
  {
    id: 'west-coast',
    name: 'West Coast & Coconut Triangle',
    shortName: 'West Coast',
    tagline: 'Coastal Lagoons, Estuaries & Dolphin Pods',
    description:
      'Seaside beach resorts, peaceful Dutch canals in Negombo, coconut plantation trails, and spinner dolphin boat safaris off Kalpitiya.',
    image: '/images/bento_bentota_lagoon.jpg',
    bestSeason: 'Nov – Apr',
    keyDestinations: 'Negombo, Kalpitiya, Chilaw',
    highlights: [
      'Kalpitiya dolphin and marine wildlife boat expeditions',
      'Historic Negombo Dutch canals and lagoon boat rides',
      'Untouched wilderness safaris in Wilpattu National Park',
    ],
    packageFilter: '/packages?region=west',
    route: [townStop('Kalpitiya'), townStop('Negombo', { main: true })],
  },
  {
    id: 'colombo-environs',
    name: 'Colombo & Western Province',
    shortName: 'Colombo & Environs',
    tagline: 'Colonial Elegance & Coastal Capital Dining',
    description:
      'Sri Lanka’s cosmopolitan gateway. Explore colonial architecture, tranquil lakeside temples, oceanfront sunsets along Galle Face Green, and celebrated seafood dining.',
    image: '/images/colombo_city_skyline.jpg',
    bestSeason: 'Year-round (Best: Dec – Apr)',
    keyDestinations: 'Colombo, Kelaniya, Ratnapura',
    highlights: [
      'Galle Face Green oceanfront promenade at sunset',
      'Gangaramaya Temple and Beira Lake tranquility',
      'World-renowned seafood dining and colonial street heritage',
    ],
    packageFilter: '/packages?region=colombo',
    route: [townStop('Colombo', { main: true }), townStop('Ratnapura')],
  },
  {
    id: 'jaffna-north',
    name: 'Jaffna & Northern Peninsula',
    shortName: 'Northern Peninsula',
    tagline: 'Sacred Hindu Temples & Island Traditions',
    description:
      'Rich Dravidian Hindu culture, spectacular coastal causeways, historic Dutch ramparts, and distinctive culinary flavors in Sri Lanka’s northern realm.',
    image: '/images/jaffna_nallur_kovil.jpg',
    bestSeason: 'Jan – Sep',
    keyDestinations: 'Jaffna, Mannar, Delft Island',
    highlights: [
      'Nallur Kandaswamy Kovil ornate golden Hindu temple',
      'Delft Island ferry expedition to wild horses & baobabs',
      'Historic Jaffna Dutch Fort overlooking the lagoon',
    ],
    packageFilter: '/packages?region=north',
    route: [townStop('Jaffna', { main: true }), townStop('Kilinochchi')],
  },
];

export default function CeylonRegionExplorer() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('cultural-triangle');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  // The first route waits until the map is actually on screen
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, amount: 0.4 });

  const selectRegion = (id: string) => {
    setHasInteracted(true);
    setSelectedRegionId(id);
  };

  const activeRegion =
    CEYLON_REGIONS.find((r) => r.id === selectedRegionId) || CEYLON_REGIONS[0];

  const getRegionStyle = (regionId: string) => {
    const isSelected = regionId === selectedRegionId;
    const isHovered = regionId === hoveredRegionId;

    if (isSelected) {
      return {
        fill: '#0c5037', // Refined Ceylon emerald
        fillOpacity: 0.95,
        stroke: '#00251a',
        strokeWidth: 2,
        cursor: 'pointer',
      };
    }

    if (isHovered) {
      return {
        fill: '#b8dfcd', // Soft emerald tint
        fillOpacity: 0.85,
        stroke: '#0c5037',
        strokeWidth: 1.5,
        cursor: 'pointer',
      };
    }

    return {
      fill: '#e7efe9', // Warm, elegant sage stone
      fillOpacity: 1,
      stroke: '#cbdcd1',
      strokeWidth: 1.2,
      cursor: 'pointer',
    };
  };

  return (
    <section className="w-full py-24 bg-[#edf4ef]">
      <div className="max-container">
        {/* Section Header - Clean and Consistent with the rest of the site */}
        <div className="reveal-text flex flex-col justify-between mb-10 gap-3">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              REGIONS OF SRI LANKA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              <SplitText text="Explore by Region" />
            </h2>
          </div>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl leading-relaxed">
            Select a region on the map or choose a tab to discover unique landscapes, climate seasons, and signature experiences.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {CEYLON_REGIONS.map((region) => {
            const isSelected = region.id === activeRegion.id;
            return (
              <button
                key={region.id}
                onClick={() => selectRegion(region.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-on-surface-variant border border-surface-container hover:border-primary/40 hover:text-primary'
                  }`}
              >
                {region.shortName}
              </button>
            );
          })}
        </div>

        {/* 2-Column Clean Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Details Column */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeRegion.id}
                initial={hasInteracted ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-[#e3eae5] shadow-xs flex flex-col justify-between h-full gap-4 sm:gap-5"
              >
                {/* Photo Banner */}
                <div className="relative h-60 sm:h-72 w-full rounded-xl overflow-hidden">
                  <img
                    src={activeRegion.image}
                    alt={activeRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary-fixed mb-1 block">
                      {activeRegion.tagline}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
                      {activeRegion.name}
                    </h3>
                  </div>
                </div>

                {/* Narrative */}
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {activeRegion.description}
                </p>

                {/* Simple Details (No nested boxes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#e3eae5]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold block mb-1">
                      Best Time to Visit
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {activeRegion.bestSeason}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold block mb-1">
                      Key Destinations
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {activeRegion.keyDestinations}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-outline font-semibold block mb-3">
                    Signature Experiences
                  </span>
                  <ul className="space-y-2.5">
                    {activeRegion.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link */}
                <div className="pt-2 mt-auto">
                  <Link
                    href={activeRegion.packageFilter}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 no-underline"
                  >
                    <span>Explore {activeRegion.shortName} Tours</span>
                    <ArrowRight className="w-[18px] h-[18px]" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-7 border border-[#e3eae5] shadow-xs flex flex-col justify-between items-center h-full">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                Interactive Map
              </span>
              <span className="text-[11px] text-secondary font-medium">
                Tap a region to view
              </span>
            </div>

            {/* Clean Vector Map - Zoomed & Perfectly Proportioned */}
            <div
              ref={mapRef}
              className="relative w-full flex-1 flex items-center justify-center my-auto select-none py-2 min-h-[440px] lg:min-h-[500px] max-w-[400px]"
            >
              <svg
                viewBox="75 0 575 875"
                className="w-full h-full max-h-[550px] overflow-visible object-contain drop-shadow-xs"
              >
                {/* 1. Northern Province */}
                <g
                  onClick={() => selectRegion('jaffna-north')}
                  onMouseEnter={() => setHoveredRegionId('jaffna-north')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.northern_main}
                    style={getRegionStyle('jaffna-north')}
                    className="transition-colors duration-200"
                  />
                  {SRI_LANKA_PATHS.northern_islands.map((islandPath, i) => (
                    <path
                      key={`island-${i}`}
                      d={islandPath}
                      style={getRegionStyle('jaffna-north')}
                      className="transition-colors duration-200"
                    />
                  ))}
                </g>

                {/* 2. North Central (Cultural Triangle) */}
                <g
                  onClick={() => selectRegion('cultural-triangle')}
                  onMouseEnter={() => setHoveredRegionId('cultural-triangle')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.north_central}
                    style={getRegionStyle('cultural-triangle')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* 3. North Western (West Coast) */}
                <g
                  onClick={() => selectRegion('west-coast')}
                  onMouseEnter={() => setHoveredRegionId('west-coast')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.north_western}
                    style={getRegionStyle('west-coast')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* 4. Central & Uva (Central Highlands) */}
                <g
                  onClick={() => selectRegion('mountainous-region')}
                  onMouseEnter={() => setHoveredRegionId('mountainous-region')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.central}
                    style={getRegionStyle('mountainous-region')}
                    className="transition-colors duration-200"
                  />
                  <path
                    d={SRI_LANKA_PATHS.uva}
                    style={getRegionStyle('mountainous-region')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* 5. Eastern */}
                <g
                  onClick={() => selectRegion('east-coast')}
                  onMouseEnter={() => setHoveredRegionId('east-coast')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.eastern}
                    style={getRegionStyle('east-coast')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* 6. Western & Sabaragamuwa */}
                <g
                  onClick={() => selectRegion('colombo-environs')}
                  onMouseEnter={() => setHoveredRegionId('colombo-environs')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.western}
                    style={getRegionStyle('colombo-environs')}
                    className="transition-colors duration-200"
                  />
                  <path
                    d={SRI_LANKA_PATHS.sabaragamuwa}
                    style={getRegionStyle('colombo-environs')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* 7. Southern */}
                <g
                  onClick={() => selectRegion('the-south')}
                  onMouseEnter={() => setHoveredRegionId('the-south')}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <path
                    d={SRI_LANKA_PATHS.southern}
                    style={getRegionStyle('the-south')}
                    className="transition-colors duration-200"
                  />
                </g>

                {/* Animated Touring Route (re-keyed so it replays for every region) */}
                <MapRoute key={activeRegion.id} stops={activeRegion.route} play={mapInView} />
              </svg>
            </div>

            <div className="w-full pt-3 mt-2 border-t border-[#e3eae5] text-center">
              <span className="text-xs text-on-surface-variant">
                Selected: <strong className="text-primary font-semibold">{activeRegion.shortName}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

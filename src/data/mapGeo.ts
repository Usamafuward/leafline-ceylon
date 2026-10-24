import type { TourPackage } from './tours';

export interface MapPoint {
  x: number;
  y: number;
}

export interface RouteStop extends MapPoint {
  label: string;
  // Larger pin & label (the region's headline destination)
  main?: boolean;
  // Hill-country rail stations: a leg between two rail stops is ridden by train
  rail?: boolean;
  // Itinerary days spent at this stop (package routes only)
  days?: number[];
}

// Real-world coordinates [lat, lng] of every town the site routes through
const TOWNS: Record<string, [number, number]> = {
  Airport: [7.18, 79.88],
  Colombo: [6.93, 79.85],
  Negombo: [7.21, 79.84],
  Kalpitiya: [8.23, 79.76],
  Bentota: [6.42, 79.99],
  Galle: [6.03, 80.22],
  Unawatuna: [6.01, 80.25],
  Weligama: [5.97, 80.43],
  Mirissa: [5.95, 80.46],
  Tangalle: [6.02, 80.8],
  Udawalawe: [6.47, 80.9],
  Bundala: [6.2, 81.24],
  Yala: [6.37, 81.52],
  'Arugam Bay': [6.84, 81.83],
  Batticaloa: [7.72, 81.7],
  Trincomalee: [8.57, 81.23],
  Anuradhapura: [8.31, 80.4],
  Mihintale: [8.35, 80.51],
  Dambulla: [7.86, 80.65],
  Sigiriya: [7.96, 80.76],
  Minneriya: [8.03, 80.9],
  Polonnaruwa: [7.94, 81.0],
  Matale: [7.47, 80.62],
  Kandy: [7.29, 80.63],
  Hatton: [6.89, 80.6],
  'Nuwara Eliya': [6.97, 80.78],
  'Horton Plains': [6.8, 80.8],
  Ella: [6.87, 81.05],
  Ratnapura: [6.68, 80.4],
  Jaffna: [9.66, 80.01],
  Kilinochchi: [9.39, 80.4],
};

const RAIL_TOWNS = new Set(['Kandy', 'Hatton', 'Nuwara Eliya', 'Horton Plains', 'Ella']);

// Itinerary wording -> canonical town name
const TOWN_ALIASES: Record<string, string> = {
  'Galle Fort': 'Galle',
  'Yala National Park': 'Yala',
  'Negombo Beach': 'Negombo',
};

// Linear projection fitted to the outline in sri_lanka_map_paths.json
// (anchored at Point Pedro, the island's northern tip: 9.83°N, 80.21°E)
export function projectToMap(lat: number, lng: number): MapPoint {
  return {
    x: Math.round(233 + (lng - 80.21) * 208),
    y: Math.round(9 + (9.83 - lat) * 218),
  };
}

export function townPoint(name: string): MapPoint {
  const coords = TOWNS[name];
  if (!coords) throw new Error(`Unknown town on map: ${name}`);
  return projectToMap(coords[0], coords[1]);
}

export function townStop(name: string, extra: Partial<RouteStop> = {}): RouteStop {
  return { ...townPoint(name), label: name, rail: RAIL_TOWNS.has(name), ...extra };
}

// Towns closer than this on the map (e.g. Galle & Unawatuna) read as one stop
const MERGE_DISTANCE = 14;

function addDays(stop: RouteStop, days: number[] = []) {
  for (const day of days) if (!stop.days?.includes(day)) stop.days?.push(day);
}

// Ordered stops for a package, read from each day's location:
// "A to B" visits both, "A & B" visits both in order, "A / B" means either (first is used).
// Repeats and near-neighbours merge into one stop that collects the days spent there, and
// day-trip returns are dropped (A → B → A → C draws as A → B → C) so the route never zig-zags.
export function getTourStops(tour: TourPackage): RouteStop[] {
  const stops: RouteStop[] = [];

  for (const day of tour.itinerary) {
    const towns = day.location
      .split(/\s+to\s+|\s*&\s*/)
      .map((part) => part.split('/')[0].trim())
      .map((name) => TOWN_ALIASES[name] || name)
      .filter((name) => name in TOWNS);

    for (const name of towns) {
      const stop = townStop(name, { days: [day.day] });
      const last = stops[stops.length - 1];
      const beforeLast = stops[stops.length - 2];

      if (last && Math.hypot(stop.x - last.x, stop.y - last.y) < MERGE_DISTANCE) {
        addDays(last, stop.days);
      } else if (beforeLast && beforeLast.label === name) {
        addDays(last, stop.days);
      } else {
        stops.push(stop);
      }
    }
  }

  return stops;
}

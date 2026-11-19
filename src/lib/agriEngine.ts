/**
 * KisanSeva — Agricultural advisory and market demo engine
 *
 * Crop suitability uses location climate and farm inputs; market forecasts remain synthetic.
 * Provides:
 *  1. Dynamic Crop, Plant & Tree Suitability (based on climate, soil, water, season and region)
 *  2. Agronomic Fertilizer Dosage & Timing Predictions (NPK + Organic alternatives)
 *  3. Pest & Disease Diagnosis & Treatment Predictions (Chemical + Bio/Organic)
 *  4. Commodity Market Trend Analytics & Price Forecasts
 *  5. Conversational Farming Assistant with Agricultural Knowledge Base
 */

export interface FarmProfileInput {
  state: string;
  district: string;
  soil: string;
  water: string;
  season: string;
}

export type FarmSeason = 'Kharif' | 'Rabi' | 'Zaid' | 'Custom';

export interface SeasonalClimateSummary {
  averageTemperatureC: number;
  averageRainfallMm: number;
  years: number;
}

export type FarmSeasonalClimate = Partial<Record<FarmSeason, SeasonalClimateSummary>>;

export interface DynamicRecommendation {
  name: string;
  suitability: number;
  temperatureFit: number;
  rainfallFit: number;
  soilFit: number;
  waterFit: number;
  seasonFit: number;
  water: string;
  explanation: string;
}

export interface FertilizerPredictionInput {
  location: string;
  crop: string;
  growthStage: string;
  soilType: string;
  weather: string;
}

export interface FertilizerPredictionResult {
  nitrogen: { dosage: string; reason: string };
  phosphorus: { dosage: string; reason: string };
  potassium: { dosage: string; reason: string };
  applicationTiming: string;
  organicAlternative: string;
  explanation: string;
}

export interface PesticidePredictionInput {
  location: string;
  crop: string;
  growthStage: string;
  soilType: string;
  weather: string;
  symptoms: string;
}

export interface PesticidePredictionResult {
  disease: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  treatment: string;
  activeIngredient: string;
  applicationMethod: string;
  precautions: string;
  naturalAlternative: string;
  explanation: string;
}

export interface MarketCommodityData {
  commodity: string;
  currentPrice: number;
  msp: number;
  unit: string;
  change7d: number;
  change30d: number;
  demand: 'High' | 'Medium' | 'Moderate' | 'Very High';
  supply: 'High' | 'Medium' | 'Low' | 'Tight';
  sentiment: 'Bullish' | 'Stable' | 'Bearish' | 'Moderately Bullish' | 'Strongly Bullish';
  forecast30d: number;
  priceHistory: Array<{ date: string; price: number; msp: number }>;
  supplyDemand: Array<{ month: string; supply: number; demand: number }>;
  regionalPrices: Array<{ region: string; price: number; arrival: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CROP REPOSITORY & DYNAMIC RECOMMENDATION ENGINE
// ─────────────────────────────────────────────────────────────────────────────

interface CropMaster {
  name: string;
  category: 'crops' | 'plants' | 'trees';
  suitableSoils: string[];
  suitableSeasons: string[];
  waterNeed: 'Low' | 'Medium' | 'High';
  states: string[];
}

const CROP_DATABASE: CropMaster[] = [
  // Major Crops
  {
    name: 'Soybean',
    category: 'crops',
    suitableSoils: ['Black Soil', 'Loamy', 'Clay'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Maharashtra', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Gujarat'],
  },
  {
    name: 'Wheat (Sharbati / HD-2967)',
    category: 'crops',
    suitableSoils: ['Loamy', 'Clay', 'Alluvial', 'Black Soil'],
    suitableSeasons: ['Rabi', 'Custom'],
    waterNeed: 'Medium',
    states: ['Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Maharashtra'],
  },
  {
    name: 'Cotton (Bt Hybrid)',
    category: 'crops',
    suitableSoils: ['Black Soil', 'Loamy'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'High',
    states: ['Gujarat', 'Maharashtra', 'Punjab', 'Karnataka', 'Tamil Nadu'],
  },
  {
    name: 'Rice (Basmati / Pusa-1121)',
    category: 'crops',
    suitableSoils: ['Clay', 'Loamy', 'Alluvial'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'High',
    states: ['Punjab', 'West Bengal', 'Uttar Pradesh', 'Tamil Nadu', 'Kerala'],
  },
  {
    name: 'Chickpea / Chana',
    category: 'crops',
    suitableSoils: ['Black Soil', 'Loamy', 'Sandy'],
    suitableSeasons: ['Rabi', 'Custom'],
    waterNeed: 'Low',
    states: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Uttar Pradesh'],
  },
  {
    name: 'Sugarcane (Co-0238)',
    category: 'crops',
    suitableSoils: ['Loamy', 'Black Soil', 'Clay'],
    suitableSeasons: ['Kharif', 'Rabi', 'Custom'],
    waterNeed: 'High',
    states: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
  },

  // Horticultural Plants
  {
    name: 'Turmeric (Salem / Waigaon)',
    category: 'plants',
    suitableSoils: ['Loamy', 'Red Soil', 'Sandy'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Gujarat'],
  },
  {
    name: 'Chili (Guntur / Byadgi)',
    category: 'plants',
    suitableSoils: ['Loamy', 'Black Soil', 'Red Soil'],
    suitableSeasons: ['Kharif', 'Rabi', 'Zaid', 'Custom'],
    waterNeed: 'Medium',
    states: ['Karnataka', 'Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Tamil Nadu'],
  },
  {
    name: 'Tomato (Hybrid Arka Rakshak)',
    category: 'plants',
    suitableSoils: ['Loamy', 'Red Soil', 'Sandy'],
    suitableSeasons: ['Rabi', 'Zaid', 'Custom'],
    waterNeed: 'Medium',
    states: ['Maharashtra', 'Karnataka', 'Punjab', 'Uttar Pradesh', 'Tamil Nadu'],
  },
  {
    name: 'Onion (Nashik Red / Bhima Super)',
    category: 'plants',
    suitableSoils: ['Loamy', 'Sandy', 'Clay'],
    suitableSeasons: ['Rabi', 'Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Rajasthan', 'Karnataka'],
  },
  {
    name: 'Ginger (Maran / Rio-de-Janeiro)',
    category: 'plants',
    suitableSoils: ['Loamy', 'Red Soil'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Kerala', 'Karnataka', 'Maharashtra', 'West Bengal'],
  },

  // Agroforestry & Trees
  {
    name: 'Neem (Azadirachta indica)',
    category: 'trees',
    suitableSoils: ['Loamy', 'Sandy', 'Black Soil', 'Red Soil', 'Other'],
    suitableSeasons: ['Kharif', 'Rabi', 'Zaid', 'Custom'],
    waterNeed: 'Low',
    states: ['Maharashtra', 'Rajasthan', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh', 'Tamil Nadu'],
  },
  {
    name: 'Teak (Tectona grandis)',
    category: 'trees',
    suitableSoils: ['Loamy', 'Black Soil', 'Red Soil'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Madhya Pradesh', 'Maharashtra', 'Karnataka', 'Kerala', 'Tamil Nadu'],
  },
  {
    name: 'Mango (Alphonso / Kesar / Dasheri)',
    category: 'trees',
    suitableSoils: ['Loamy', 'Alluvial', 'Red Soil', 'Black Soil'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Medium',
    states: ['Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Karnataka', 'West Bengal'],
  },
  {
    name: 'Malabar Neem (Melia dubia)',
    category: 'trees',
    suitableSoils: ['Loamy', 'Sandy', 'Red Soil', 'Black Soil'],
    suitableSeasons: ['Kharif', 'Custom'],
    waterNeed: 'Low',
    states: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Maharashtra', 'Gujarat'],
  },
];

const CROP_CLIMATE_RANGES: Record<string, { temperatureC: [number, number]; rainfallMm: [number, number] }> = {
  Soybean: { temperatureC: [20, 30], rainfallMm: [450, 700] },
  'Wheat (Sharbati / HD-2967)': { temperatureC: [10, 25], rainfallMm: [100, 300] },
  'Cotton (Bt Hybrid)': { temperatureC: [21, 30], rainfallMm: [500, 800] },
  'Rice (Basmati / Pusa-1121)': { temperatureC: [22, 32], rainfallMm: [800, 1500] },
  'Chickpea / Chana': { temperatureC: [10, 25], rainfallMm: [100, 300] },
  'Sugarcane (Co-0238)': { temperatureC: [20, 35], rainfallMm: [1000, 1800] },
  'Turmeric (Salem / Waigaon)': { temperatureC: [20, 30], rainfallMm: [800, 1500] },
  'Chili (Guntur / Byadgi)': { temperatureC: [18, 30], rainfallMm: [500, 1000] },
  'Tomato (Hybrid Arka Rakshak)': { temperatureC: [18, 30], rainfallMm: [300, 700] },
  'Onion (Nashik Red / Bhima Super)': { temperatureC: [13, 27], rainfallMm: [300, 600] },
  'Ginger (Maran / Rio-de-Janeiro)': { temperatureC: [20, 30], rainfallMm: [1000, 1500] },
  'Neem (Azadirachta indica)': { temperatureC: [20, 35], rainfallMm: [400, 1000] },
  'Teak (Tectona grandis)': { temperatureC: [20, 32], rainfallMm: [1000, 2000] },
  'Mango (Alphonso / Kesar / Dasheri)': { temperatureC: [24, 32], rainfallMm: [750, 1500] },
  'Malabar Neem (Melia dubia)': { temperatureC: [20, 35], rainfallMm: [800, 1500] },
};

function seededValue(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function rangeSuitability(value: number, range: [number, number], margin: number): number {
  if (value >= range[0] && value <= range[1]) return 1;
  const distance = value < range[0] ? range[0] - value : value - range[1];
  return Math.max(0, 1 - distance / margin);
}

function getClimateFit(
  crop: CropMaster,
  climate?: SeasonalClimateSummary,
): { temperature: number; rainfall: number } {
  if (!climate) return { temperature: 0.5, rainfall: 0.5 };
  const ranges = CROP_CLIMATE_RANGES[crop.name];
  return {
    temperature: rangeSuitability(climate.averageTemperatureC, ranges.temperatureC, 12),
    rainfall: rangeSuitability(climate.averageRainfallMm, ranges.rainfallMm, 600),
  };
}

function getSeasonKey(season: string): FarmSeason | null {
  switch (season) {
    case 'Kharif':
    case 'Rabi':
    case 'Zaid':
    case 'Custom':
      return season;
    default:
      return null;
  }
}

export function getDynamicRecommendations(
  category: 'crops' | 'plants' | 'trees',
  profile: FarmProfileInput,
  seasonalClimate: FarmSeasonalClimate,
): DynamicRecommendation[] {
  const seasonKey = getSeasonKey(profile.season);
  const climate = seasonKey ? seasonalClimate[seasonKey] : undefined;
  if (!climate) return [];

  const filtered = CROP_DATABASE
    .filter(crop => crop.category === category);

  return filtered.map(crop => {
    const climateFit = getClimateFit(crop, climate);
    const soilFit = crop.suitableSoils.includes(profile.soil)
      ? 100
      : crop.suitableSoils.includes('Other') && profile.soil === 'Other' ? 75 : 35;
    const waterFit = crop.waterNeed === profile.water
      ? 100
      : profile.water === 'Low' && crop.waterNeed === 'High' ? 25 : 60;
    const seasonFit = crop.suitableSeasons.includes(profile.season) || profile.season === 'Custom'
      ? 100
      : 40;
    const regionalFit = crop.states.includes(profile.state) ? 100 : 55;
    const temperatureFit = Math.round(climateFit.temperature * 100);
    const rainfallFit = Math.round(climateFit.rainfall * 100);
    const suitability = Math.round(
      climateFit.temperature * 30
      + climateFit.rainfall * 30
      + soilFit * 0.2
      + waterFit * 0.1
      + seasonFit * 0.07
      + regionalFit * 0.03,
    );

    return {
      name: crop.name,
      suitability,
      temperatureFit,
      rainfallFit,
      soilFit,
      waterFit,
      seasonFit,
      water: crop.waterNeed,
      explanation: `${profile.season} climate in ${profile.district}, ${profile.state}: ${climate.years}-year average ${climate.averageTemperatureC.toFixed(1)}°C and ${climate.averageRainfallMm.toFixed(0)} mm seasonal rainfall. Climate fits compare those values with general crop reference bands; soil and water fits use your selected farm inputs.`,
    };
  }).sort((a, b) => b.suitability - a.suitability);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SMART FERTILIZER ADVISORY PREDICTION ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export function predictFertilizerDosage(input: FertilizerPredictionInput): FertilizerPredictionResult {
  const crop = input.crop.toLowerCase();
  const stage = input.growthStage.toLowerCase();
  const soil = input.soilType.toLowerCase();
  const weather = input.weather.toLowerCase();

  let nDosage = 30;
  let pDosage = 25;
  let kDosage = 20;
  let nReason = 'Supports steady vegetative development';
  let pReason = 'Aids root structure and energy transfer';
  let kReason = 'Enhances water regulation and disease tolerance';

  // Crop-specific calibration
  if (crop.includes('soybean') || crop.includes('groundnut') || crop.includes('gram') || crop.includes('pulse')) {
    // Legume fixes nitrogen
    nDosage = stage.includes('flower') ? 20 : 15;
    nReason = 'As a legume, it fixes atmospheric N; only a starter dose is needed to prevent nodule inhibition.';
    pDosage = 40;
    pReason = 'Phosphorus is critical for Rhizobium root nodulation and early pod setting.';
    kDosage = 30;
    kReason = 'Potassium maximizes grain filling, prevents lodging, and boosts seed oil density.';
  } else if (crop.includes('wheat')) {
    nDosage = stage.includes('vegetative') || stage.includes('tillering') ? 60 : 25;
    nReason = 'High nitrogen split required during crown root initiation & tillering for maximum panicle count.';
    pDosage = 30;
    pReason = 'Single basal dose of phosphorus strengthens winter root establishment.';
    kDosage = 25;
    kReason = 'Potassium strengthens straw rigidity and protects against thermal stress during grain filling.';
  } else if (crop.includes('cotton')) {
    nDosage = stage.includes('flower') || stage.includes('boll') ? 45 : 30;
    nReason = 'Nitrogen split avoids excessive vegetative growth and prevents premature square shedding.';
    pDosage = 30;
    pReason = 'Phosphorus ensures uniform early square development and deep taproot penetration.';
    kDosage = 45;
    kReason = 'Cotton requires high potassium during boll development to optimize fiber strength and micronaire.';
  } else if (crop.includes('sugarcane')) {
    nDosage = 80;
    pDosage = 40;
    kDosage = 60;
    nReason = 'Heavy feeder crop requiring split nitrogen across formative and grand growth phases.';
    pReason = 'Basal DAP ensures prolific root stooling.';
    kReason = 'Potassium boosts juice brix and cane weight while mitigating drought susceptibility.';
  } else if (crop.includes('tomato') || crop.includes('chili') || crop.includes('vegetable')) {
    nDosage = 35;
    pDosage = 35;
    kDosage = 40;
    nReason = 'Balanced nitrogen sustains continuous flowering without inducing vegetative runaway.';
    pReason = 'Promotes robust bloom clusters and reduces blossom drop.';
    kReason = 'High potassium ensures firm fruit walls, vibrant color, and resistance to fruit rot.';
  }

  // Growth Stage Modulations
  if (stage.includes('flower') || stage.includes('bloom')) {
    nDosage = Math.round(nDosage * 0.85);
    kDosage = Math.round(kDosage * 1.25);
  } else if (stage.includes('maturity') || stage.includes('ripen')) {
    nDosage = Math.round(nDosage * 0.4);
    pDosage = Math.round(pDosage * 0.3);
    kDosage = Math.round(kDosage * 1.1);
  }

  // Soil Modulations
  if (soil.includes('black')) {
    kDosage = Math.round(kDosage * 0.85); // Black soil is naturally rich in montmorillonite clay & potassium
    kReason += ' (Reduced slightly due to high inherent potassium in black soil).';
  } else if (soil.includes('sandy')) {
    nDosage = Math.round(nDosage * 1.15); // Sandy soil leaches N quickly
    nReason += ' (Split application strongly recommended due to high leaching in sandy texture).';
  }

  // Weather Modulations
  let timing = 'Apply in early morning (6:30–9:00 AM) or late afternoon with adequate soil moisture.';
  if (weather.includes('rain') || weather.includes('cloud')) {
    timing = 'High moisture forecasted: avoid surface broadcasting to prevent runoff. Apply via side placement or postpone until soil stabilizes.';
  } else if (weather.includes('hot') || weather.includes('3') || weather.includes('dry')) {
    timing = 'Warm dry conditions: irrigate immediately after fertilizer application to avoid ammonia volatilization and root burn.';
  }

  const organic = crop.includes('soybean')
    ? 'Well-decomposed Farmyard Manure (FYM) 2 tonnes/acre + Phosphate Rich Organic Manure (PROM) 150 kg/acre + Rhizobium seed treatment.'
    : 'Vermicompost (2 tonnes/acre) enriched with Trichoderma harzianum + Neem cake (100 kg/acre) + Azotobacter bio-fertilizer.';

  const explanation = `Agronomic prediction for ${input.crop} at ${input.growthStage} in ${input.location} on ${input.soilType} soil: Nutrient delivery is optimized for maximum nutrient use efficiency (NUE). Nitrogen is balanced against current ${input.weather} conditions to avoid vegetative elongation, while phosphorus and potassium ensure structural vigor.`;

  return {
    nitrogen: { dosage: `${nDosage} kg/hectare`, reason: nReason },
    phosphorus: { dosage: `${pDosage} kg/hectare`, reason: pReason },
    potassium: { dosage: `${kDosage} kg/hectare`, reason: kReason },
    applicationTiming: timing,
    organicAlternative: organic,
    explanation,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PEST & DISEASE DIAGNOSIS PREDICTION ENGINE
// ─────────────────────────────────────────────────────────────────────────────

interface DiseasePattern {
  cropKeywords: string[];
  symptomKeywords: string[];
  diseaseName: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  treatment: string;
  activeIngredient: string;
  applicationMethod: string;
  precautions: string;
  naturalAlternative: string;
  explanation: string;
}

const DISEASE_PATTERNS: DiseasePattern[] = [
  {
    cropKeywords: ['soybean', 'groundnut', 'pulse'],
    symptomKeywords: ['yellow', 'spot', 'wilt', 'leaf spot', 'cercospora'],
    diseaseName: 'Cercospora Leaf Spot (Cercospora sojina)',
    riskLevel: 'High',
    treatment: 'Mancozeb 75% WP or Tebuconazole 25.9% EC',
    activeIngredient: 'Mancozeb (Dithiocarbamate) / Tebuconazole (Triazole)',
    applicationMethod: 'Foliar spray: 2.0g Mancozeb or 1.5ml Tebuconazole per liter of water. Ensure thorough canopy wetting on lower leaf surfaces.',
    precautions: 'Wear gloves and mask. Do not spray during windy hours. Maintain a 14-day pre-harvest interval.',
    naturalAlternative: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Trichoderma viride culture (5g/L) mixed in water with jaggery sticker.',
    explanation: 'Circular lesions with reddish-brown borders and chlorotic halos indicate fungal Cercospora infection, exacerbated by warm humid conditions.',
  },
  {
    cropKeywords: ['soybean', 'pulse', 'legume'],
    symptomKeywords: ['mosaic', 'yellow vein', 'stunted', 'virus', 'mottling'],
    diseaseName: 'Yellow Mosaic Virus (MYMV) vectored by Whitefly',
    riskLevel: 'High',
    treatment: 'Thiamethoxam 25% WG or Acetamiprid 20% SP (Vector control)',
    activeIngredient: 'Thiamethoxam 25% WG (Neonicotinoid)',
    applicationMethod: 'Dissolve 0.3g per liter of water. Spray using a knapsack sprayer with hollow cone nozzle during morning hours.',
    precautions: 'Highly toxic to bees; do not spray during peak pollinator foraging periods. Rotate modes of action to prevent vector resistance.',
    naturalAlternative: 'Erect yellow sticky traps (15–20 traps/acre) + Spray 3% Neem oil (10,000 ppm) at 3 ml/L every 7 days.',
    explanation: 'Bright yellow vein clearing and irregular chlorotic patches are hallmarks of Yellow Mosaic Virus transmitted by whiteflies.',
  },
  {
    cropKeywords: ['wheat', 'cereal'],
    symptomKeywords: ['rust', 'yellow stripe', 'powder', 'pustule', 'orange'],
    diseaseName: 'Yellow Stripe Rust (Puccinia striiformis)',
    riskLevel: 'High',
    treatment: 'Propiconazole 25% EC (Tilt)',
    activeIngredient: 'Propiconazole 25% EC (Triazole group)',
    applicationMethod: 'Mix 1.0 ml per liter of water (200 ml in 200 liters of water per acre). Spray immediately upon appearance of yellow stripe lesions.',
    precautions: 'Apply with PPE. Avoid contact with skin and eyes. Do not allow livestock to graze treated fields within 21 days.',
    naturalAlternative: 'Foliar spray of Sour Buttermilk (chaas) 5L diluted in 100L water + Cow urine 5L as a natural bio-antifungal.',
    explanation: 'Linear yellow pustules arranged parallel to leaf veins signify Stripe Rust. Cool night temperatures and dew accelerate spore germination.',
  },
  {
    cropKeywords: ['cotton'],
    symptomKeywords: ['curl', 'leaf curl', 'crinkled', 'vein thickening', 'whitefly'],
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    riskLevel: 'High',
    treatment: 'Diafenthiuron 50% WP or Pyriproxyfen 10% EC',
    activeIngredient: 'Diafenthiuron 50% WP (Vector suppression)',
    applicationMethod: 'Dissolve 1.25g per liter of water. Target undersides of top tender leaves where whitefly nymphs congregate.',
    precautions: 'Avoid repeated continuous sprays; alternate chemical classes. Ensure proper nozzle calibration.',
    naturalAlternative: 'Install yellow sticky traps (25 traps/acre) + Spray Dashparni Ark (10% solution) fermented with cow dung & medicinal herbs.',
    explanation: 'Upward cupping of leaves with enations (leaf-like outgrowths) on veins confirms CLCuV transmission under warm, overcast conditions.',
  },
  {
    cropKeywords: ['cotton'],
    symptomKeywords: ['boll', 'worm', 'hole', 'dropping', 'shedding', 'pink'],
    diseaseName: 'Pink Bollworm (Pectinophora gossypiella)',
    riskLevel: 'High',
    treatment: 'Emamectin Benzoate 5% SG or Chlorantraniliprole 18.5% SC',
    activeIngredient: 'Emamectin Benzoate 5% SG (Macrocyclic lactone)',
    applicationMethod: 'Spray 0.4g per liter of water during dusk when adult moths are active. Focus spray at flowering and boll formation tiers.',
    precautions: 'Install pheromone traps (Phero-lure) at 8 traps/acre for economic threshold monitoring before spraying.',
    naturalAlternative: 'Release Trichogramma bactrae egg parasitoids (60,000 wasps/acre) + Spray Beauveria bassiana bio-fungicide (5g/L).',
    explanation: 'Rosette flowers and entry pin-holes on developing bolls indicate Pink Bollworm infestation requiring immediate threshold management.',
  },
  {
    cropKeywords: ['rice', 'paddy'],
    symptomKeywords: ['blast', 'spindle', 'brown spot', 'leaf blast', 'drying'],
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    riskLevel: 'High',
    treatment: 'Tricyclazole 75% WP (Baan / Beam)',
    activeIngredient: 'Tricyclazole 75% WP (Melanin biosynthesis inhibitor)',
    applicationMethod: 'Mix 0.6g per liter of water. Apply at active tillering and boot leaf emergence.',
    precautions: 'Do not overdose nitrogenous fertilizers in affected plots as free nitrogen promotes blast severity.',
    naturalAlternative: 'Apply Pseudomonas fluorescens bio-fungicide (10g/kg seed treatment + 2.5kg/ha foliar spray in field).',
    explanation: 'Spindle-shaped lesions with ash-grey centers and brownish borders indicate Rice Blast, favoured by high humidity (>90%) and cloudy skies.',
  },
  {
    cropKeywords: ['tomato', 'chili', 'vegetable'],
    symptomKeywords: ['curl', 'wrinkled', 'shrivel', 'thrips', 'mite'],
    diseaseName: 'Chili Leaf Curl / Thrips & Mite Complex (Murda Disease)',
    riskLevel: 'Medium',
    treatment: 'Fipronil 5% SC + Spiromesifen 22.9% SC',
    activeIngredient: 'Fipronil (Phenylpyrazole) + Spiromesifen (Tetronic acid)',
    applicationMethod: 'Mix 1.5 ml Fipronil + 1.0 ml Spiromesifen per liter of water. Direct spray to the underside of terminal buds.',
    precautions: 'Do not spray when flowers are open. Protect honeybees and beneficial predators (lacewings).',
    naturalAlternative: 'Spray Garlic-Chili Extract (Tikha-Lasun Ark) 2% or 5% Neem oil emulsion with organic soap emulsifier.',
    explanation: 'Upward boat-shaped leaf curling indicates thrips lacerations, while downward curling indicates mite feeding.',
  },
  {
    cropKeywords: ['all', 'general', 'vegetable', 'crop'],
    symptomKeywords: ['wilt', 'rot', 'damping', 'fungus', 'decay', 'yellowing'],
    diseaseName: 'Fusarium Wilt / Root Rot Complex',
    riskLevel: 'Medium',
    treatment: 'Carbendazim 12% + Mancozeb 63% WP (Saaf)',
    activeIngredient: 'Carbendazim + Mancozeb (Broad-spectrum contact & systemic)',
    applicationMethod: 'Soil drenching around root zone: dissolve 2.5g per liter of water. Drench 150–200 ml solution per plant basin.',
    precautions: 'Ensure good field drainage to avoid standing water around stem collars.',
    naturalAlternative: 'Soil application of Trichoderma viride (2 kg mixed with 100 kg farmyard manure per acre, kept moist for 7 days before application).',
    explanation: 'Vascular discoloration of the internal xylem ring accompanied by afternoon wilting points to soil-borne fungal root infection.',
  },
];

export function predictPesticideTreatment(input: PesticidePredictionInput): PesticidePredictionResult {
  const cropLower = input.crop.toLowerCase();
  const symptomsLower = input.symptoms.toLowerCase();

  // Search pattern matching
  let matched = DISEASE_PATTERNS.find(p =>
    p.cropKeywords.some(ck => cropLower.includes(ck)) &&
    p.symptomKeywords.some(sk => symptomsLower.includes(sk))
  );

  // Fallback to symptom-only match if crop specific wasn't found
  if (!matched) {
    matched = DISEASE_PATTERNS.find(p =>
      p.symptomKeywords.some(sk => symptomsLower.includes(sk))
    );
  }

  // Fallback to crop-only pattern
  if (!matched) {
    matched = DISEASE_PATTERNS.find(p =>
      p.cropKeywords.some(ck => cropLower.includes(ck))
    );
  }

  // General fallback
  const resultPattern = matched ?? DISEASE_PATTERNS[DISEASE_PATTERNS.length - 1];

  return {
    disease: resultPattern.diseaseName,
    riskLevel: resultPattern.riskLevel,
    treatment: resultPattern.treatment,
    activeIngredient: resultPattern.activeIngredient,
    applicationMethod: resultPattern.applicationMethod,
    precautions: resultPattern.precautions,
    naturalAlternative: resultPattern.naturalAlternative,
    explanation: `Diagnosis for ${input.crop} showing "${input.symptoms}" in ${input.location}: ${resultPattern.explanation} Evaluated under current ${input.weather} conditions.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. COMMODITY MARKET INTELLIGENCE & PRICE PROJECTION ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const COMMODITY_MARKET_DATABASE: Record<string, MarketCommodityData> = {
  Soybean: {
    commodity: 'Soybean (Yellow)',
    currentPrice: 4850,
    msp: 4892,
    unit: 'quintal',
    change7d: 3.8,
    change30d: 7.9,
    demand: 'High',
    supply: 'Medium',
    sentiment: 'Bullish',
    forecast30d: 5180,
    priceHistory: [
      { date: 'Oct 20', price: 4420, msp: 4892 },
      { date: 'Oct 27', price: 4510, msp: 4892 },
      { date: 'Nov 03', price: 4620, msp: 4892 },
      { date: 'Nov 10', price: 4740, msp: 4892 },
      { date: 'Nov 17', price: 4850, msp: 4892 },
      { date: 'Nov 24 (Proj)', price: 4980, msp: 4892 },
      { date: 'Dec 01 (Proj)', price: 5120, msp: 4892 },
    ],
    supplyDemand: [
      { month: 'Jun', supply: 62, demand: 70 },
      { month: 'Jul', supply: 74, demand: 76 },
      { month: 'Aug', supply: 82, demand: 85 },
      { month: 'Sep', supply: 88, demand: 89 },
      { month: 'Oct', supply: 80, demand: 92 },
      { month: 'Nov', supply: 72, demand: 96 },
    ],
    regionalPrices: [
      { region: 'Maharashtra (Latur Mandi)', price: 4920, arrival: '14,200 Bags' },
      { region: 'Madhya Pradesh (Indore Mandi)', price: 4870, arrival: '18,500 Bags' },
      { region: 'Rajasthan (Kota Mandi)', price: 4790, arrival: '9,100 Bags' },
      { region: 'Karnataka (Hubli Mandi)', price: 4940, arrival: '6,400 Bags' },
      { region: 'Gujarat (Rajkot Mandi)', price: 4820, arrival: '5,800 Bags' },
    ],
  },
  Wheat: {
    commodity: 'Wheat (Mill Quality & Sharbati)',
    currentPrice: 2850,
    msp: 2425,
    unit: 'quintal',
    change7d: 1.8,
    change30d: 5.2,
    demand: 'High',
    supply: 'Medium',
    sentiment: 'Bullish',
    forecast30d: 3020,
    priceHistory: [
      { date: 'Oct 20', price: 2680, msp: 2425 },
      { date: 'Oct 27', price: 2720, msp: 2425 },
      { date: 'Nov 03', price: 2770, msp: 2425 },
      { date: 'Nov 10', price: 2810, msp: 2425 },
      { date: 'Nov 17', price: 2850, msp: 2425 },
      { date: 'Nov 24 (Proj)', price: 2910, msp: 2425 },
      { date: 'Dec 01 (Proj)', price: 2980, msp: 2425 },
    ],
    supplyDemand: [
      { month: 'Jun', supply: 90, demand: 82 },
      { month: 'Jul', supply: 85, demand: 83 },
      { month: 'Aug', supply: 78, demand: 85 },
      { month: 'Sep', supply: 72, demand: 88 },
      { month: 'Oct', supply: 68, demand: 90 },
      { month: 'Nov', supply: 65, demand: 93 },
    ],
    regionalPrices: [
      { region: 'Punjab (Khanna Mandi)', price: 2820, arrival: '22,000 Bags' },
      { region: 'Uttar Pradesh (Kanpur Mandi)', price: 2790, arrival: '19,500 Bags' },
      { region: 'Madhya Pradesh (Sehore Mandi)', price: 2980, arrival: '12,300 Bags' },
      { region: 'Rajasthan (Jaipur Mandi)', price: 2840, arrival: '8,900 Bags' },
      { region: 'Maharashtra (Pune Mandi)', price: 2960, arrival: '6,200 Bags' },
    ],
  },
  Cotton: {
    commodity: 'Cotton (Medium & Long Staple)',
    currentPrice: 7250,
    msp: 7121,
    unit: 'quintal',
    change7d: 2.4,
    change30d: 6.8,
    demand: 'High',
    supply: 'Low',
    sentiment: 'Strongly Bullish',
    forecast30d: 7650,
    priceHistory: [
      { date: 'Oct 20', price: 6720, msp: 7121 },
      { date: 'Oct 27', price: 6850, msp: 7121 },
      { date: 'Nov 03', price: 6980, msp: 7121 },
      { date: 'Nov 10', price: 7110, msp: 7121 },
      { date: 'Nov 17', price: 7250, msp: 7121 },
      { date: 'Nov 24 (Proj)', price: 7420, msp: 7121 },
      { date: 'Dec 01 (Proj)', price: 7580, msp: 7121 },
    ],
    supplyDemand: [
      { month: 'Jun', supply: 45, demand: 75 },
      { month: 'Jul', supply: 50, demand: 78 },
      { month: 'Aug', supply: 58, demand: 80 },
      { month: 'Sep', supply: 65, demand: 84 },
      { month: 'Oct', supply: 75, demand: 88 },
      { month: 'Nov', supply: 70, demand: 91 },
    ],
    regionalPrices: [
      { region: 'Gujarat (Kadi Mandi)', price: 7350, arrival: '16,000 Quintals' },
      { region: 'Maharashtra (Yavatmal Mandi)', price: 7280, arrival: '14,200 Quintals' },
      { region: 'Telangana (Warangal Mandi)', price: 7210, arrival: '11,500 Quintals' },
      { region: 'Punjab (Abohar Mandi)', price: 7180, arrival: '8,400 Quintals' },
      { region: 'Karnataka (Raichur Mandi)', price: 7290, arrival: '7,100 Quintals' },
    ],
  },
  Rice: {
    commodity: 'Paddy / Rice (Common & Basmati)',
    currentPrice: 3450,
    msp: 2320,
    unit: 'quintal',
    change7d: 2.1,
    change30d: 4.8,
    demand: 'High',
    supply: 'Medium',
    sentiment: 'Bullish',
    forecast30d: 3620,
    priceHistory: [
      { date: 'Oct 20', price: 3240, msp: 2320 },
      { date: 'Oct 27', price: 3290, msp: 2320 },
      { date: 'Nov 03', price: 3340, msp: 2320 },
      { date: 'Nov 10', price: 3390, msp: 2320 },
      { date: 'Nov 17', price: 3450, msp: 2320 },
      { date: 'Nov 24 (Proj)', price: 3510, msp: 2320 },
      { date: 'Dec 01 (Proj)', price: 3580, msp: 2320 },
    ],
    supplyDemand: [
      { month: 'Jun', supply: 70, demand: 80 },
      { month: 'Jul', supply: 75, demand: 82 },
      { month: 'Aug', supply: 80, demand: 85 },
      { month: 'Sep', supply: 88, demand: 88 },
      { month: 'Oct', supply: 94, demand: 92 },
      { month: 'Nov', supply: 86, demand: 95 },
    ],
    regionalPrices: [
      { region: 'Punjab (Amritsar Mandi)', price: 3680, arrival: '28,000 Bags' },
      { region: 'Haryana (Karnal Mandi)', price: 3720, arrival: '24,500 Bags' },
      { region: 'West Bengal (Burdwan Mandi)', price: 2950, arrival: '19,000 Bags' },
      { region: 'Uttar Pradesh (Bareilly Mandi)', price: 2880, arrival: '15,200 Bags' },
      { region: 'Tamil Nadu (Thanjavur Mandi)', price: 3120, arrival: '11,400 Bags' },
    ],
  },
  Sugarcane: {
    commodity: 'Sugarcane (FRP Benchmark)',
    currentPrice: 340,
    msp: 340,
    unit: 'quintal',
    change7d: 0.0,
    change30d: 3.0,
    demand: 'High',
    supply: 'High',
    sentiment: 'Stable',
    forecast30d: 345,
    priceHistory: [
      { date: 'Oct 20', price: 330, msp: 340 },
      { date: 'Oct 27', price: 335, msp: 340 },
      { date: 'Nov 03', price: 338, msp: 340 },
      { date: 'Nov 10', price: 340, msp: 340 },
      { date: 'Nov 17', price: 340, msp: 340 },
      { date: 'Nov 24 (Proj)', price: 342, msp: 340 },
      { date: 'Dec 01 (Proj)', price: 345, msp: 340 },
    ],
    supplyDemand: [
      { month: 'Jun', supply: 60, demand: 65 },
      { month: 'Jul', supply: 65, demand: 70 },
      { month: 'Aug', supply: 70, demand: 72 },
      { month: 'Sep', supply: 75, demand: 78 },
      { month: 'Oct', supply: 88, demand: 90 },
      { month: 'Nov', supply: 95, demand: 95 },
    ],
    regionalPrices: [
      { region: 'Uttar Pradesh (Meerut Mills)', price: 350, arrival: 'Crushing Active' },
      { region: 'Maharashtra (Kolhapur Mills)', price: 345, arrival: 'Crushing Active' },
      { region: 'Karnataka (Belagavi Mills)', price: 342, arrival: 'Crushing Active' },
      { region: 'Tamil Nadu (Erode Mills)', price: 338, arrival: 'Crushing Active' },
      { region: 'Gujarat (Surat Mills)', price: 340, arrival: 'Crushing Active' },
    ],
  },
};

function getDemandSupplyGap(data: MarketCommodityData): number {
  const recentMonths = data.supplyDemand.slice(-3);
  return recentMonths.reduce((total, month) => total + (month.demand - month.supply) / 100, 0)
    / recentMonths.length;
}

interface MarketTrainingSample {
  features: number[];
  changePercent: number;
}

function createMarketTrainingSet(): MarketTrainingSample[] {
  const samples: MarketTrainingSample[] = [];

  Object.values(COMMODITY_MARKET_DATABASE).forEach((commodity, commodityIndex) => {
    for (let sampleIndex = 0; sampleIndex < 480; sampleIndex += 1) {
      const seed = commodityIndex * 480 + sampleIndex + 1;
      const momentum = (seededValue(seed * 43 + 11) * 20 - 10) + commodity.change30d * 0.25;
      const demandSupplyGap = getDemandSupplyGap(commodity)
        + (seededValue(seed * 47 + 13) - 0.5) * 0.8;
      const noise = (seededValue(seed * 53 + 17) - 0.5) * 2.4;
      const changePercent = 0.28 * momentum + 1.6 * demandSupplyGap + noise;
      samples.push({
        features: [1, momentum / 10, demandSupplyGap],
        changePercent,
      });
    }
  });

  return samples;
}

function trainMarketModel(samples: MarketTrainingSample[]): number[] {
  const weights = [0, 0, 0];
  const learningRate = 0.001;

  for (let epoch = 0; epoch < 45; epoch += 1) {
    for (const sample of samples) {
      const prediction = sample.features.reduce((sum, value, index) => sum + value * weights[index], 0);
      const error = prediction - sample.changePercent;
      sample.features.forEach((value, index) => {
        weights[index] -= learningRate * error * value;
      });
    }
  }

  return weights;
}

const marketTrainingSet = createMarketTrainingSet();
const marketModel = trainMarketModel(marketTrainingSet);

export const SYNTHETIC_MODEL_INFO = {
  marketTrainingExamples: marketTrainingSet.length,
};

export function getMarketCommodityData(commodityName: string): MarketCommodityData {
  const commodity = COMMODITY_MARKET_DATABASE[commodityName] ?? COMMODITY_MARKET_DATABASE['Soybean'];
  const features = [1, commodity.change30d / 10, getDemandSupplyGap(commodity)];
  const predictedChangePercent = Math.max(-12, Math.min(
    12,
    features.reduce((sum, value, index) => sum + value * marketModel[index], 0),
  ));
  const forecast30d = Math.max(
    0,
    Math.round(commodity.currentPrice * (1 + predictedChangePercent / 100)),
  );
  const sentiment = predictedChangePercent >= 1.5
    ? 'Bullish'
    : predictedChangePercent <= -1.5
      ? 'Bearish'
      : 'Stable';
  const projectedPoints = commodity.priceHistory.filter(point => point.date.includes('Proj')).length;
  let projectionIndex = 0;
  const priceHistory = commodity.priceHistory.map(point => {
    if (!point.date.includes('Proj')) return { ...point };
    projectionIndex += 1;
    return {
      ...point,
      price: Math.round(
        commodity.currentPrice
          + (forecast30d - commodity.currentPrice) * projectionIndex / projectedPoints,
      ),
    };
  });

  return {
    ...commodity,
    sentiment,
    forecast30d,
    priceHistory,
    supplyDemand: commodity.supplyDemand.map(month => ({ ...month })),
    regionalPrices: commodity.regionalPrices.map(region => ({ ...region })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CONVERSATIONAL FARMING EXPERT AI (LOCAL SYNTHETIC BRAIN)
// ─────────────────────────────────────────────────────────────────────────────

export function generateAssistantResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Greeting
  if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('namaste') || q.startsWith('hey')) {
    return 'Namaste! Welcome to KisanSeva AI. I am your specialized agricultural advisor. You can ask me about crop selection, sowing calendars, pest and disease treatments, fertilizer dosage, mandi market prices, or government schemes. What would you like to know today?';
  }

  // Sowing time / seasons
  if (q.includes('sow') || q.includes('plant') || q.includes('time') || q.includes('calendar') || q.includes('season')) {
    if (q.includes('wheat')) {
      return 'The optimal sowing window for Wheat across North and Central India is November 10 to November 30. Ensure soil temperature drops to 18–20°C. Popular varieties like HD-2967 or PBW-550 yield 18–22 quintals/acre with 4–5 timely irrigations at crown root and tillering stages.';
    }
    if (q.includes('soybean')) {
      return 'Soybean is sown during Kharif with the onset of monsoon (June 20 to July 10) once the soil receives at least 75–100 mm of cumulative rainfall. Recommended row spacing is 45 cm with a seed rate of 25–30 kg/acre treated with Rhizobium.';
    }
    if (q.includes('cotton')) {
      return 'Bt Cotton sowing begins between late April and May in irrigated zones (Punjab, Haryana, Rajasthan) and with June monsoon rains in Central/South India. Spacing of 90×60 cm or 120×45 cm promotes optimal aeration and boll development.';
    }
    return 'India follows three primary agricultural seasons: 1) Kharif (sown June–July, harvested Oct–Nov: Soybean, Paddy, Cotton, Maize), 2) Rabi (sown Oct–Dec, harvested March–April: Wheat, Gram, Mustard), and 3) Zaid (March–June: Watermelon, Cucumber, Fodder). Which crop are you planning?';
  }

  // Yellow leaves / Pests / Diseases
  if (q.includes('yellow') || q.includes('leaf') || q.includes('pest') || q.includes('disease') || q.includes('insect') || q.includes('curl') || q.includes('spot')) {
    if (q.includes('yellow') && (q.includes('leaf') || q.includes('leaves'))) {
      return 'Yellowing leaves generally stem from three causes: 1) Nitrogen deficiency (older lower leaves turn uniformly pale yellow from tip downward), 2) Micronutrient deficiency like Iron/Zinc (interveinal yellowing on new leaves), or 3) Waterlogging causing root suffocation. Test your soil moisture first; if moisture is normal, apply 2% urea foliar spray or Chelated Zinc (1.5g/L).';
    }
    if (q.includes('curl')) {
      return 'Leaf curl is typically triggered by sucking pests such as thrips, mites, or whiteflies that vector viral diseases. For upward curling, spray Fipronil 5% SC (1.5 ml/L); for downward curling with mites, apply Spiromesifen 22.9% SC (1 ml/L). As an organic alternative, spray 5% Neem Seed Kernel Extract (NSKE) every 7 days.';
    }
    return 'For targeted pest or disease management, inspect the leaf underside and stem collar. You can also use our "Smart Farm Advisor" tool where you input specific symptoms, and our diagnostic model will return exact chemical dosages, active ingredients, safety precautions, and organic bio-fungicides.';
  }

  // Fertilizer / NPK / Nutrients
  if (q.includes('fertilizer') || q.includes('npk') || q.includes('urea') || q.includes('dap') || q.includes('potash') || q.includes('manure')) {
    return 'Balanced fertilization requires applying the 4R Nutrient Stewardship principle: Right source, Right rate, Right time, and Right place. For general field crops, a baseline NPK ratio of 4:2:1 (cereal) or 1:2:1 (legumes) is recommended. Always combine chemical fertilizers with 2 tonnes/acre of well-decomposed FYM or vermicompost to preserve soil microbial biodiversity.';
  }

  // Mandi / Price / Market
  if (q.includes('market') || q.includes('price') || q.includes('mandi') || q.includes('rate') || q.includes('bhav') || q.includes('sell')) {
    return 'Current mandi updates: Soybean is trading strong around ₹4,850/quintal (MSP ₹4,892); Wheat is elevated at ₹2,850/quintal well above MSP (₹2,425); Cotton is firm at ₹7,250/quintal. With export demand picking up and festive procurement, the 30-day sentiment remains Bullish. Check our "Market Intelligence" tab for live regional charts across states.';
  }

  // Government Schemes / PM-Kisan / Subsidy
  if (q.includes('scheme') || q.includes('pm') || q.includes('kisan') || q.includes('subsidy') || q.includes('loan') || q.includes('insurance') || q.includes('pmfby')) {
    return 'Key Govt Agricultural Schemes: 1) PM-KISAN (₹6,000/year direct cash support in three ₹2,000 tranches), 2) PMFBY (Crop insurance at 1.5% Rabi / 2% Kharif premium against climate losses), 3) Kisan Credit Card (concessional crop loans up to ₹3 Lakh at 4% effective interest), and 4) PM-KUSUM (up to 60% subsidy on solar agricultural pumps).';
  }

  // Trees / Agroforestry
  if (q.includes('tree') || q.includes('timber') || q.includes('wood') || q.includes('forestry') || q.includes('neem') || q.includes('teak')) {
    return 'Agroforestry provides long-term wealth creation and carbon credits. Teak (Tectona grandis) yields ₹40,000–₹50,000/m³ in 15–20 years. Malabar Neem (Melia dubia) offers rapid commercial returns for plywood within 6–8 years. Neem trees require minimal water while providing annual seed revenue and soil conservation.';
  }

  // Default intelligent response
  return `Based on comprehensive agricultural data for Indian farming conditions: For optimal yield this season, align crop selection with your local soil texture and water table. Maintain balanced soil nutrition with split nitrogen doses, and monitor mandi arrival trends before selling. Let me know if you would like specific advice on a particular crop, pest, or fertilizer!`;
}


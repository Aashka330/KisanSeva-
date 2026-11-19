export const DEMO_LABEL = 'Demo / Synthetic Data';

export const states = [
  'Maharashtra', 'Punjab', 'Karnataka', 'Uttar Pradesh', 'Gujarat',
  'Rajasthan', 'Tamil Nadu', 'West Bengal', 'Madhya Pradesh', 'Kerala',
];

export const districts: Record<string, string[]> = {
  Maharashtra: ['Pune', 'Nagpur', 'Nashik', 'Satara', 'Kolhapur'],
  Punjab: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  Karnataka: ['Bangalore Rural', 'Mysuru', 'Belagavi', 'Hubli'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Meerut'],
  Gujarat: ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Bardhaman'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
};

export const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Black Soil', 'Red Soil', 'Other'];
export const waterLevels = ['Low', 'Medium', 'High'];
export const seasons = ['Kharif', 'Rabi', 'Zaid', 'Custom'];
export const goals = [
  'Maximum Profit', 'Sustainable Farming', 'Low Water Usage',
  'Environmental Improvement', 'Timber Production', 'Food Production',
];

export interface Recommendation {
  name: string;
  suitability: number;
  yield: string;
  revenue: string;
  water: string;
  period: string;
  risk: 'Low' | 'Medium' | 'High';
  environmental: 'Positive' | 'Neutral' | 'Negative';
}

export const cropRecommendations: Recommendation[] = [
  { name: 'Soybean', suitability: 92, yield: '2.8 tonnes/acre', revenue: '₹78,000/acre', water: 'Medium', period: '90–110 days', risk: 'Low', environmental: 'Positive' },
  { name: 'Wheat', suitability: 88, yield: '3.2 tonnes/acre', revenue: '₹65,000/acre', water: 'Medium', period: '120–140 days', risk: 'Low', environmental: 'Neutral' },
  { name: 'Cotton', suitability: 85, yield: '1.5 tonnes/acre', revenue: '₹95,000/acre', water: 'High', period: '150–180 days', risk: 'Medium', environmental: 'Neutral' },
  { name: 'Sugarcane', suitability: 79, yield: '35 tonnes/acre', revenue: '₹1,20,000/acre', water: 'High', period: '300–365 days', risk: 'Medium', environmental: 'Negative' },
];

export const plantRecommendations: Recommendation[] = [
  { name: 'Turmeric', suitability: 90, yield: '8 tonnes/acre', revenue: '₹1,50,000/acre', water: 'Medium', period: '240 days', risk: 'Low', environmental: 'Positive' },
  { name: 'Chili', suitability: 87, yield: '2 tonnes/acre', revenue: '₹85,000/acre', water: 'Medium', period: '120 days', risk: 'Medium', environmental: 'Neutral' },
  { name: 'Tomato', suitability: 84, yield: '25 tonnes/acre', revenue: '₹1,10,000/acre', water: 'High', period: '90 days', risk: 'Medium', environmental: 'Neutral' },
  { name: 'Onion', suitability: 81, yield: '15 tonnes/acre', revenue: '₹70,000/acre', water: 'Medium', period: '100 days', risk: 'Low', environmental: 'Neutral' },
];

export const treeRecommendations: Recommendation[] = [
  { name: 'Neem', suitability: 95, yield: 'N/A', revenue: '₹15,000/tree (5yr)', water: 'Low', period: 'Perennial', risk: 'Low', environmental: 'Positive' },
  { name: 'Teak', suitability: 88, yield: '12 m³/ha (20yr)', revenue: '₹8,00,000/ha', water: 'Medium', period: '20–25 years', risk: 'Low', environmental: 'Positive' },
  { name: 'Mango', suitability: 86, yield: '8 tonnes/acre', revenue: '₹2,00,000/acre', water: 'Medium', period: 'Perennial', risk: 'Low', environmental: 'Positive' },
  { name: 'Eucalyptus', suitability: 82, yield: '20 m³/ha (7yr)', revenue: '₹3,50,000/ha', water: 'High', period: '7–10 years', risk: 'Medium', environmental: 'Neutral' },
];

export const environmentalData = {
  'Neem Tree': {
    score: 92,
    aqiImpact: 'Potential improvement',
    pollutants: [
      { name: 'PM2.5', change: -8 },
      { name: 'PM10', change: -5 },
      { name: 'CO₂', change: -12, unit: 'kg/year' },
      { name: 'CO', change: -2 },
      { name: 'NO₂', change: -3 },
    ],
    carbonSequestration: '18 kg/year',
    waterRequirement: 'Low (450 L/month)',
    oxygenContribution: '260 kg/year',
    biodiversity: 'High — supports 40+ insect species',
    soilImpact: 'Positive — nitrogen fixation, erosion control',
    radar: [
      { subject: 'Air Quality', value: 90 },
      { subject: 'Carbon', value: 88 },
      { subject: 'Water', value: 85 },
      { subject: 'Biodiversity', value: 92 },
      { subject: 'Soil Health', value: 87 },
    ],
  },
  Soybean: {
    score: 78,
    aqiImpact: 'Minimal impact',
    pollutants: [
      { name: 'PM2.5', change: -2 },
      { name: 'PM10', change: -1 },
      { name: 'CO₂', change: -5, unit: 'kg/year' },
      { name: 'CO', change: 0 },
      { name: 'NO₂', change: -1 },
    ],
    carbonSequestration: '4 kg/year',
    waterRequirement: 'Medium (1200 L/acre/month)',
    oxygenContribution: '45 kg/year',
    biodiversity: 'Medium — supports pollinators',
    soilImpact: 'Positive — nitrogen fixation',
    radar: [
      { subject: 'Air Quality', value: 70 },
      { subject: 'Carbon', value: 75 },
      { subject: 'Water', value: 60 },
      { subject: 'Biodiversity', value: 72 },
      { subject: 'Soil Health', value: 85 },
    ],
  },
  Teak: {
    score: 85,
    aqiImpact: 'Moderate improvement',
    pollutants: [
      { name: 'PM2.5', change: -6 },
      { name: 'PM10', change: -4 },
      { name: 'CO₂', change: -25, unit: 'kg/year' },
      { name: 'CO', change: -1 },
      { name: 'NO₂', change: -2 },
    ],
    carbonSequestration: '35 kg/year',
    waterRequirement: 'Medium (800 L/month)',
    oxygenContribution: '180 kg/year',
    biodiversity: 'High — forest ecosystem support',
    soilImpact: 'Positive — deep root stabilization',
    radar: [
      { subject: 'Air Quality', value: 82 },
      { subject: 'Carbon', value: 90 },
      { subject: 'Water', value: 70 },
      { subject: 'Biodiversity', value: 88 },
      { subject: 'Soil Health', value: 84 },
    ],
  },
};

export const weatherData = {
  location: 'Pune, Maharashtra',
  temperature: 28,
  humidity: 72,
  rainfall: 12,
  windSpeed: 14,
  aqi: 68,
  soilMoisture: 45,
  forecast: [
    { day: 'Today', temp: 28, rain: 20, icon: 'cloud' },
    { day: 'Thu', temp: 30, rain: 10, icon: 'sun' },
    { day: 'Fri', temp: 27, rain: 60, icon: 'rain' },
    { day: 'Sat', temp: 26, rain: 80, icon: 'rain' },
    { day: 'Sun', temp: 29, rain: 15, icon: 'cloud' },
    { day: 'Mon', temp: 31, rain: 5, icon: 'sun' },
    { day: 'Tue', temp: 30, rain: 25, icon: 'cloud' },
  ],
  recommendations: {
    crops: ['Soybean', 'Groundnut', 'Cotton'],
    plants: ['Turmeric', 'Chili', 'Tomato'],
    trees: ['Neem', 'Mango', 'Teak'],
    fertilizers: ['NPK 20:20:0', 'Urea (limited)', 'Organic compost'],
    pesticides: ['Neem oil spray', 'Bio-pesticide (Bt)', 'Preventive fungicide'],
  },
};

export const marketData = {
  commodity: 'Soybean',
  currentPrice: 4850,
  unit: 'quintal',
  change7d: 4.2,
  change30d: 8.7,
  demand: 'High',
  supply: 'Medium',
  sentiment: 'Positive',
  priceHistory: [
    { date: 'Aug 5', price: 4200 },
    { date: 'Aug 12', price: 4350 },
    { date: 'Aug 19', price: 4280 },
    { date: 'Aug 26', price: 4500 },
    { date: 'Sep 2', price: 4650 },
    { date: 'Sep 3', price: 4850 },
  ],
  supplyDemand: [
    { month: 'Apr', supply: 65, demand: 70 },
    { month: 'May', supply: 72, demand: 75 },
    { month: 'Jun', supply: 80, demand: 78 },
    { month: 'Jul', supply: 85, demand: 82 },
    { month: 'Aug', supply: 78, demand: 88 },
    { month: 'Sep', supply: 70, demand: 92 },
  ],
  regionalPrices: [
    { region: 'Maharashtra', price: 4850 },
    { region: 'Madhya Pradesh', price: 4720 },
    { region: 'Rajasthan', price: 4680 },
    { region: 'Karnataka', price: 4910 },
    { region: 'Gujarat', price: 4790 },
  ],
};

export const timberData = {
  woodType: 'Teak',
  currentPrice: 45000,
  unit: 'cubic meter',
  demandIndex: 82,
  supplyIndex: 58,
  predictedPrice: 48200,
  confidence: 87,
  priceHistory: [
    { month: 'Mar', price: 38000 },
    { month: 'Apr', price: 39500 },
    { month: 'May', price: 41000 },
    { month: 'Jun', price: 42000 },
    { month: 'Jul', price: 43500 },
    { month: 'Aug', price: 44200 },
    { month: 'Sep', price: 45000 },
  ],
};

export const tradeData = {
  commodity: 'Mango',
  exportMarkets: [
    { country: 'UAE', volume: '45,000 MT', value: '₹320 Cr', avgPrice: '₹71/kg', demand: 'High', growth: 12.5 },
    { country: 'USA', volume: '8,500 MT', value: '₹95 Cr', avgPrice: '₹112/kg', demand: 'Medium', growth: 8.2 },
    { country: 'UK', volume: '6,200 MT', value: '₹68 Cr', avgPrice: '₹110/kg', demand: 'Medium', growth: 6.8 },
    { country: 'Saudi Arabia', volume: '12,000 MT', value: '₹85 Cr', avgPrice: '₹71/kg', demand: 'High', growth: 10.1 },
    { country: 'Germany', volume: '3,800 MT', value: '₹52 Cr', avgPrice: '₹137/kg', demand: 'Low', growth: 4.5 },
  ],
};


export const chatSuggestions = [
  'What crop should I grow this season?',
  'When should I plant wheat?',
  'Which tree is suitable for my land?',
  'Why are my leaves turning yellow?',
  'How is the market price expected to change?',
  'Which fertilizer is suitable?',
];

export const chatResponses: Record<string, string> = {
  default: 'Based on your location and current conditions, I recommend considering soybean for Kharif season. It has 92% suitability for loamy soil with medium water availability. Would you like detailed analysis?',
  crop: 'For your region (Pune, Maharashtra) during Kharif season, soybean shows 92% suitability with expected revenue of ₹78,000/acre. Wheat is also viable at 88% suitability for Rabi season.',
  wheat: 'Optimal wheat planting window for your region is mid-November to early December. Soil temperature should be 15–20°C. Expected yield: 3.2 tonnes/acre with medium water requirement.',
  tree: 'Neem tree shows 95% suitability for your climate — excellent environmental benefits with low water needs. Teak is ideal for timber production with 88% suitability and long-term revenue potential.',
  yellow: 'Yellow leaves could indicate nitrogen deficiency, overwatering, or pest damage. I recommend soil testing and applying NPK 20:20:0 at 40 kg/hectare. Upload a photo for more precise diagnosis.',
  market: 'Soybean prices are trending positive (+8.7% over 30 days). Current price: ₹4,850/quintal with high demand. Teak timber predicted to reach ₹48,200/m³ in 30 days (87% confidence).',
  fertilizer: 'For soybean at flowering stage on loamy soil: Nitrogen 40 kg/ha, Phosphorus 25 kg/ha, Potassium 30 kg/ha. Apply during early morning with adequate soil moisture.',
};

export const faqItems = [
  { q: 'Is KisanSeva free to use?', a: 'Yes, basic features are free. Premium analytics and advanced AI recommendations are available with a subscription plan.' },
  { q: 'How accurate are the recommendations?', a: 'Crop suitability uses location-specific weather and gridded climate data, but its crop reference ranges are general prototype heuristics—not validated farm advice. Soil and water inputs are user-selected, and market data elsewhere in the prototype is synthetic/demo data.' },
  { q: 'Can I use KisanSeva on my phone?', a: 'Yes, KisanSeva is fully responsive and works on mobile, tablet, and desktop devices.' },
  { q: 'What languages are supported?', a: 'Currently English, Hindi (हिंदी), and Marathi (मराठी) are supported.' },
  { q: 'Are pesticide recommendations safe to follow?', a: 'No. All pesticide and fertilizer recommendations in this demo are simulated. Always consult certified agricultural experts before applying any treatment.' },
];

export const dashboardData = {
  farmArea: '12 acres',
  currentCrop: 'Soybean',
  cropHealth: 87,
  weather: { temp: 28, condition: 'Partly Cloudy' },
  aqi: 68,
  marketValue: '₹5,82,000',
  expectedRevenue: '₹9,36,000',
  performance: [
    { month: 'Apr', yield: 0, revenue: 0 },
    { month: 'May', yield: 0.5, revenue: 12000 },
    { month: 'Jun', yield: 1.2, revenue: 28000 },
    { month: 'Jul', yield: 1.8, revenue: 42000 },
    { month: 'Aug', yield: 2.4, revenue: 58000 },
    { month: 'Sep', yield: 2.8, revenue: 78000 },
  ],
};

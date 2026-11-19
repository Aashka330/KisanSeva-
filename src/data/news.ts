export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  filter: string;
  source: string;
  sourceUrl: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Cabinet approves PM-KISAN continuation till 2030-31 with ₹3.15 lakh crore outlay',
    date: '31 Jul 2026',
    category: 'Government Scheme',
    excerpt:
      'The Union Cabinet approved continuation of PM-KISAN from 2026-27 to 2030-31. Eligible farmer families will continue receiving ₹6,000 annually in three equal installments via DBT. Over ₹4.47 lakh crore has been transferred through 23 instalments so far.',
    filter: 'Government',
    source: 'PIB / PM India',
    sourceUrl: 'https://www.pmindia.gov.in/en/news_updates/cabinet-approves-continuation-of-the-pm-kisan-scheme-from-2026-27-to-2030-31-with-a-financial-outlay-of-rs-3-15-lakh-crore/',
    image: '/images/indianfarmer2.jpeg',
    imageAlt: 'Indian farmer in agricultural field',
    featured: true,
  },
  {
    id: 2,
    title: 'NABARD and IMD sign MoU to deliver weather intelligence to farmers via DiCRA',
    date: '02 Sep 2026',
    category: 'Weather Alert',
    excerpt:
      'NABARD and the India Meteorological Department signed an MoU to integrate agro-meteorological data into the DiCRA platform, providing district and block-level forecasts, advisories, and weather-linked risk alerts for farmers.',
    filter: 'Weather',
    source: 'PSU Connect',
    sourceUrl: 'https://www.psuconnect.in/memorandum-of-understanding/nabard-imd-sign-mou-to-integrate-weather-data-into-dicra-platform',
    image: '/images/indiafarmer1.jpeg',
    imageAlt: 'Weather monitoring over agricultural landscape',
  },
  {
    id: 3,
    title: 'e-NAM integrates 1,656 mandis; cumulative trade reaches ₹4.84 lakh crore',
    date: 'Mar 2026',
    category: 'Market',
    excerpt:
      'India\'s National Agriculture Market now connects 1,656 mandis across 23 states and 4 UTs, with over 1.80 crore farmers and 2.73 lakh traders registered. The platform covers 247 commodities with mobile-based price discovery.',
    filter: 'Market',
    source: 'Press Information Bureau',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2251543&lang=1&reg=3',
    image: '/images/indianfarmer3.jpeg',
    imageAlt: 'Agricultural grain market and produce trading',
  },
  {
    id: 4,
    title: 'IMD forecasts heavy rain and thunderstorms across Maharashtra and Karnataka',
    date: '02 Sep 2026',
    category: 'Weather Alert',
    excerpt:
      'IMD issued advisories for widespread rainfall in Konkan, Goa, and coastal Karnataka. Farmers advised to maintain field drainage, avoid fertilizer application during wet conditions, and provide staking support to horticultural crops.',
    filter: 'Weather',
    source: 'India Meteorological Department',
    sourceUrl: 'https://mausam.imd.gov.in/Forecast/marquee_data/Press%20Release%2002-09-2026.pdf',
    image: '/images/sky.jpg',
    imageAlt: 'Heavy monsoon clouds over farmland',
  },
  {
    id: 5,
    title: 'National Mission on Natural Farming targets 7.5 lakh hectares across 15,000 clusters',
    date: '28 Mar 2025',
    category: 'Farming',
    excerpt:
      'The Union Cabinet approved NMNF to promote chemical-free, livestock-integrated natural farming. The mission targets 10,000 Bio-Input Resource Centres, certification for chemical-free produce, and awareness among 1 crore farmers.',
    filter: 'Farming',
    source: 'Press Information Bureau',
    sourceUrl: 'https://www.pib.gov.in/PressNoteDetails.aspx?lang=2&ModuleId=3&NoteId=155019&reg=3',
    image: '/images/fruitmarket.jpeg',
    imageAlt: 'Green farmland at sunrise',
  },
  {
    id: 6,
    title: 'PGS-India organic certification covers 16.35 lakh hectares, benefiting 24 lakh farmers',
    date: 'Aug 2025',
    category: 'Export/Import',
    excerpt:
      'Government\'s Participatory Guarantee System has certified 16.35 lakh ha under organic farming, with brands like Pure & Sure, Organic Himachal, and Sahaja Aharam fetching stable premium prices in domestic and export markets.',
    filter: 'Export/Import',
    source: 'Ministry of Agriculture',
    sourceUrl: 'https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU2742_XQlqHn.pdf',
    image: '/images/fruitmarket2.jpeg',
    imageAlt: 'Organic vegetables and fresh produce',
  },
  {
    id: 7,
    title: 'PM-KISAN 23rd instalment releases ₹18,984 crore to 9.49 crore farmers',
    date: 'Jun 2026',
    category: 'Government Scheme',
    excerpt:
      'The 23rd instalment under PM-KISAN transferred over ₹18,984 crore directly to more than 9.49 crore farmers\' bank accounts. NITI Aayog evaluation found 92% of beneficiaries used funds for agricultural investment.',
    filter: 'Government',
    source: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com/article/india/cabinet-approves-extension-of-pm-kisan-for-5-years-10812821/',
    image: '/images/farmer.jpg',
    imageAlt: 'Farmer using mobile phone in field',
  },
  {
    id: 8,
    title: '134 new mandis integrated with e-NAM in first half of 2026',
    date: 'Jun 2026',
    category: 'Market',
    excerpt:
      'From January to June 2026, 134 mandis across 5 states/UTs were integrated with e-NAM. Inter-state trade of 28,566 metric tonnes valued at ₹83.95 crore has been recorded on the platform.',
    filter: 'Market',
    source: 'Lok Sabha',
    sourceUrl: 'https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU247_t4SFGX.pdf',
    image: '/images/farmer1.jpeg',
    imageAlt: 'Fresh vegetables at farmers market',
  },
  {
    id: 9,
    title: 'Natural farming mission allocates ₹5,209 crore for 2025-26 across 33 states',
    date: 'Feb 2026',
    category: 'Policy',
    excerpt:
      'Annual Action Plans for the National Mission on Natural Farming have been approved for 33 states and UTs. Uttar Pradesh, Karnataka, and Madhya Pradesh receive the largest allocations for cluster-based natural farming expansion.',
    filter: 'Policy',
    source: 'Ministry of Agriculture',
    sourceUrl: 'https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU2638_mandJf.pdf',
    image: '/images/market2.jpeg',
    imageAlt: 'Farmer tending crops in field',
  },
];

export const featuredArticle = newsArticles.find(a => a.featured) ?? newsArticles[0];

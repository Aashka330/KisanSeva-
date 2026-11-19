// KisanSeva API Configuration
// Keys are loaded from .env (VITE_ prefix exposes them to the browser)

export const config = {
  openWeatherApiKey: import.meta.env.VITE_OPENWEATHER_API_KEY as string,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
};

export function hasOpenWeather() {
  return !!config.openWeatherApiKey && config.openWeatherApiKey !== 'your_openweathermap_api_key_here';
}

export function hasGemini() {
  return !!config.geminiApiKey && config.geminiApiKey !== 'your_gemini_api_key_here';
}

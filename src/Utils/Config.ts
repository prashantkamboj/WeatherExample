export const API_KEY = '7e9c62aea8f5ca24e8427bfdba4c33e5';
export const Config = {
  currentData: `https://api.openweathermap.org/data/2.5/weather?lat=28.6237431&lon=77.3679286&appid=${API_KEY}`,
  fiveDaysData: `https://api.openweathermap.org/data/2.5/forecast?lat=28.6237431&lon=77.3679286&appid=${API_KEY}`,
  searchData: (city: string) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
};

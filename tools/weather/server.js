#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const WMO_CODES = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Icy fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Slight showers', 81: 'Moderate showers', 82: 'Violent showers',
  85: 'Slight snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
};

async function getWeather(location) {
  // Geocode
  const geo = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
  ).then(r => r.json());

  if (!geo.results?.length) throw new Error(`Location not found: ${location}`);
  const { latitude, longitude, name, admin1, country } = geo.results[0];
  const place = [name, admin1, country].filter(Boolean).join(', ');

  // Fetch current + 7-day daily forecast
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude, longitude,
    current: 'temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone: 'America/Chicago',
    forecast_days: '7',
  }).toString();

  const data = await fetch(url).then(r => r.json());
  const c = data.current;
  const d = data.daily;

  const days = d.time.map((date, i) => ({
    date,
    high: Math.round(d.temperature_2m_max[i]),
    low: Math.round(d.temperature_2m_min[i]),
    condition: WMO_CODES[d.weathercode[i]] ?? 'Unknown',
    precip: d.precipitation_sum[i]?.toFixed(2),
    precipChance: d.precipitation_probability_max[i],
  }));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecast = days.map(day => {
    const dt = new Date(day.date + 'T12:00:00');
    return `${dayNames[dt.getDay()]} ${day.date}: ${day.condition}, High ${day.high}°F / Low ${day.low}°F, Rain chance ${day.precipChance ?? 0}%`;
  }).join('\n');

  return `Weather for ${place}

Current: ${Math.round(c.temperature_2m)}°F (feels like ${Math.round(c.apparent_temperature)}°F), ${WMO_CODES[c.weathercode] ?? 'Unknown'}, Wind ${Math.round(c.windspeed_10m)} mph

7-Day Forecast:
${forecast}`;
}

const server = new Server(
  { name: 'weather', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'get_weather',
    description: 'Get current conditions and 7-day forecast for any location. Default location is Chicago, IL.',
    inputSchema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City name or location. Defaults to Chicago, IL if omitted.',
          default: 'Chicago, IL',
        },
      },
    },
  }],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== 'get_weather') throw new Error(`Unknown tool: ${req.params.name}`);
  const location = req.params.arguments?.location || 'Chicago, IL';
  try {
    const result = await getWeather(location);
    return { content: [{ type: 'text', text: result }] };
  } catch (e) {
    return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);

// api.ts
const API_BASE_URL = 'https://axesso-walmart-data-service.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

interface FetchApiParams {
  [key: string]: string | number;
}

const fetchApi = async (endpoint: string, params: FetchApiParams = {}): Promise<any> => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'axesso-walmart-data-service.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export default fetchApi;
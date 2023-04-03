export default class MapboxService {
  constructor(token) {
    this.token = token;
  }

  /**
   * Search places via Mapbox API
   * @param query
   * @param language
   * @returns {Promise<Array>}
   */
  async searchPlaces(query, language = 'en') {
    const params = new URLSearchParams({
      types: ['country', 'region', 'postcode', 'district', 'place', 'locality', 'neighborhood', 'address'],
      limit: 6,
      access_token: this.token,
      language,
    });

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(query)}.json?${params}`;
    const response = await fetch(apiUrl, options);

    const result = await response.json();
    return result?.features;
  }

  /**
   * Reverse geocode a long/lat pair to get place details
   * @param longitude
   * @param latitude
   * @param language
   * @returns {Promise<Array>}
   */
  async reverseGeocode(longitude, latitude, language = 'en') {
    const params = new URLSearchParams({
      types: ['country', 'region', 'postcode', 'district', 'place', 'locality', 'neighborhood', 'address'],
      access_token: this.token,
      language,
    });

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(longitude)},${encodeURI(latitude)}.json?${params}`;
    const response = await fetch(apiUrl, options);

    const result = await response.json();
    return result?.features;
  }
}

export default class GoogleGeocodeService {
  constructor(token, window, document) {
    this.token = token;
    this.window = window;

    if (!window.google?.maps?.places?.AutocompleteService) {
      let script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${token}`;
      document.body.appendChild(script);
    }
  }

  /**
   * Search places via Mapbox API
   * @param query
   * @returns {Promise<any>}
   */
  async getPlacePredictions(query, language = 'en') {
    if (this.window.google) {
      const service = new this.window.google.maps.places.AutocompleteService();
      const { predictions } = await service.getPlacePredictions({
        input: query,
        language,
      });

      return predictions;
    }
    return null;
  }

  /**
   * Get details for a given address
   * @param address
   * @param language
   * @returns {Promise<null>}
   */
  async getPlaceDetails(address, language = 'en') {
    const params = new URLSearchParams({
      key: this.token,
      address,
      language,
    });
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;
    const response = await fetch(apiUrl, { method: 'GET' });

    const data = await response.json();
    let results = [];

    // https://developers.google.com/maps/documentation/geocoding/requests-geocoding#StatusCodes
    switch (data.status) {
      case 'OK':
        results = data.results;
        break;
      case 'ZERO_RESULTS':
      default:
        // general error catch
        break;
    }

    return results && results.length ? results[0] : null;
  }

  /**
   * Reverse geocode a lng/lat pair to get place details
   * @param longitude
   * @param latitude
   * @param language
   * @returns {Promise<Array>}
   */
  async reverseGeocode(longitude, latitude, language = 'en') {
    const params = new URLSearchParams({
      key: this.token,
      latlng: `${latitude},${longitude}`,
      language,
      result_type: [
        'point_of_interest',
        'establishment',
        'premise',
        'street_address',
        'neighborhood',
        'sublocality',
        'locality',
        'colloquial_area',
        'political',
        'country',
      ].join('|')
    });
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;
    const response = await fetch(apiUrl, { method: 'GET' });

    const result = await response.json();
    return result?.results;
  }
}

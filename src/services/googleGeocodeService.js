export default class GoogleGeocodeService {
  constructor(token, window, document) {
    this.token = token;
    this.window = window;

    if (!window.google?.maps?.places?.AutocompleteService) {
      const script = document.createElement('script');
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
   * Get details for a given place
   * @param metadata
   * @param language
   * @returns {Promise<null>}
   */
  async getPlaceDetails(metadata, language = 'en') {
    let response = null;
    if (this.window.google) {
      const geocoder = new window.google.maps.Geocoder();
      try {

        const { results } = await geocoder.geocode({
          placeId: metadata.place_id,
          language,
        });

        const result = results[0];
        response = {
          lng: result.geometry.location.lng(),
          lat: result.geometry.location.lat(),
          level: this.convert_level(result.types[0]),
          label: metadata.description || result.formatted_address,
        }
      } catch (error) {
        // general error catch
        // console.error(error);
        response = {
          error,
        }
      }
    }

    return response;
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

  convert_level(level) {
    switch (level) {
      case 'administrative_area_level_0':
        level = 'admin0';
        break;
      case 'administrative_area_level_1':
        level = 'admin1';
        break;
      case 'administrative_area_level_2':
        level = 'admin2';
        break;
      case 'administrative_area_level_3':
        level = 'admin3';
        break;
      case 'administrative_area_level_4':
        level = 'admin4';
        break;
      case 'administrative_area_level_5':
        level = 'admin5';
        break;
    }
    return level;
  }
}

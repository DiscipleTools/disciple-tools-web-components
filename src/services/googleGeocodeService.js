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
    try {
      const result = await this._getPlacePredictionsLegacy(query, language);
      return result;
    } catch (err) {
      const suggestions = await this._getPlaceSuggestionsRest(query, language);
      if (suggestions) {
        return suggestions;
      }
      throw {
        message: err,
      }
    }
  }


  /**
   * Get predictions from Legacy Google Autocomplete Service
   * @param query
   * @param language
   * @returns {Promise<unknown>}
   * @private
   */
  async _getPlacePredictionsLegacy(query, language = 'en') {
    if (this.window.google) {
      return new Promise((resolve, reject) => {
        // Catch auth failures if there is a referrer restriction
        const service = new this.window.google.maps.places.AutocompleteService();
        window.gm_authFailure = function() {
          reject('Google Maps API Key authentication failed');
        };
        service.getPlacePredictions({
          input: query,
          language,
        }, (predictions, status) => {
          if (status !== 'OK') {
            reject(status);

          } else {
            resolve(predictions);
          }
        });
      })
    }
    return null;
  }

  /**
   * Get predictions from Google Places Autocomplete REST API
   * @param query
   * @param language
   * @returns {Promise<({description: *|string, place_id: string}|null)[]>}
   * @private
   */
  async _getPlaceSuggestionsRest(query, language = 'en') {
    // Legacy failed; fallback to Places v1 REST
    const url =
      'https://places.googleapis.com/v1/places:autocomplete?key=' +
      encodeURIComponent(this.token);
    const body = {
      input: query,
      // language,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok && data.error) {
      throw data.error;
    }

    const suggestions = Array.isArray(
      data && data.suggestions,
    )
      ? data.suggestions
      : [];

    const googlePredictions = suggestions
      .map((sug) =>
        sug && sug.placePrediction
          ? sug.placePrediction
          : null,
      )
      .filter(Boolean);

    const predictions = googlePredictions
      .map((pred) => {
        const placeId =
          pred.placeId ||
          (pred.place
            ? String(pred.place).replace('places/', '')
            : null);
        const description =
          (pred.text && pred.text.text) ||
          [
            pred.structuredFormat &&
            pred.structuredFormat.mainText &&
            pred.structuredFormat.mainText.text,
            pred.structuredFormat &&
            pred.structuredFormat.secondaryText &&
            pred.structuredFormat.secondaryText.text,
          ]
            .filter(Boolean)
            .join(', ');
        return placeId && description
          ? {
            description,
            place_id: placeId
          }
          : null;
      })
      .filter(Boolean);

    return predictions;
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

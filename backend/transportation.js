/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const request = require('request');

/**
 * Get transport prices, routes, etc...
 *
 * @param originCity - Origin display name
 * @param originPosition - Origin latitude,longitude (comma separated)
 * @param destinationCity - Destination display name
 * @param destinationPosition - Destination latitude,longitude (comma separated)
 * @param currency
 */
function getTransport(originCity, originPosition, destinationCity, destinationPosition, currency) {
  currency = currency || 'EUR';
  let url = `https://rome2rio12.p.mashape.com/Search?currency=${ currency }&dKind=City&oKind=City`;
  const args = ['oName', 'oPos', 'dName', 'dPos'];
  originCity = encodeURIComponent(originCity) || null;
  destinationCity = encodeURIComponent(destinationCity) || null;

  // add query params dynamically
  args.forEach((value, index) => {
    if (arguments[index]) {
      url += `&${ value }=${ arguments[index] }`;
    }
  });

  const options = {
    url: url,
    headers: {
      'X-Mashape-Key': 'popMmKAzdQmshoMEn4fhbUmGcGxDp1SbSidjsn3U3dEDruOfp1',
      'Accept': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body);
        resolve(json);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = getTransport;
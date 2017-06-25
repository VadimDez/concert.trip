/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const request = require('request');
const Promise = require('bluebird');

class Booking {

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getCities(cityName) {
    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/bookings.getCities?languagecodes=en`;
    return this.performRequest(url);
  }

  /**
   * Get hotels
   *
   * @param city_ids
   * @returns {*}
   */
  getHotels(city_ids) {
    if (city_ids && city_ids instanceof Array) {
      city_ids = city_ids.join(',');
    }
    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/bookings.getHotels?city_ids=${ city_ids }&languagecode=en`;
    return this.performRequest(url);
  }

  autocomplete(text) {
    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/bookings.autocomplete?text=${ text }&languagecode=en`;
    return this.performRequest(url);
  }

  getHotelAvailabilityV2(checkin, checkout, city_ids, room1) {
    checkin = checkin || '2017-09-22';
    checkout = checkout || '2017-09-23';
    city_ids = city_ids || '-1565670';
    room1 = room1 || 'A';

    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/getHotelAvailabilityV2?checkin=${ checkin }&checkout=${ checkout }&city_ids=${ city_ids }&room1=${ room1 }&output=room_details,hotel_details`;
    return this.performRequest(url);
  }

  performRequest(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }
}

module.exports = Booking;
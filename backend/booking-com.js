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

  getCityIdFromAutocomplete(text) {
    const destType = 'city';
    return this.autocomplete(text)
      .then(res => {
        res.filter(object => {
          return object.dest_type === destType;
        });

        if (res.length) {
          return res[0].dest_id;
        }

        return null;
      });
  }

  getBookingFor(text, checkIn, checkOut, room1) {
    if (checkIn === checkOut) {
      // no need for booking
      return null;
    }

    return this.getCityIdFromAutocomplete(text)
      .then(city_id => {
        if (!city_id) {
          return null;
        }

        return this.getHotelAvailabilityV2(checkIn, checkOut, city_id, room1);
      })
  }

  getHotelAvailabilityV2(checkIn, checkOut, city_ids, room1) {
    checkIn = checkIn || '2017-09-22';
    checkOut = checkOut || '2017-09-23';
    city_ids = city_ids || '-1565670';
    room1 = room1 || 'A';

    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/getHotelAvailabilityV2?checkin=${ checkIn }&checkout=${ checkOut }&city_ids=${ city_ids }&room1=${ room1 }&output=room_details,hotel_details`;
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
/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const request = require('request');
const Promise = require('bluebird');
const chalk = require('chalk');

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

  getCityFromAutocomplete(text) {
    const destType = 'city';
    return this.autocomplete(text)
      .then(res => {
        res.filter(object => {
          return object.dest_type === destType;
        });

        if (res.length) {
          return {
            city_id: res[0].dest_id,
            longitude: res[0].longitude,
            latitude: res[0].latitude
          };
        }

        return null;
      });
  }

  getBookingFor(text, checkIn, checkOut, room1) {
    if (checkIn === checkOut) {
      // no need for booking
      return null;
    }

    return this.getCityFromAutocomplete(text)
      .then(city => {
        console.log(chalk.green('city_id'));
        console.log(chalk.green(city.city_id));
        if (!city.city_id) {
          return null;
        }

        return this.getHotelAvailabilityV2(checkIn, checkOut, city.latitude, city.longitude, room1);
      })
  }

  getHotelAvailabilityV2(checkIn, checkOut, latitude, longitude, radius = 15, room1 = 'A', currency = 'EUR') {
    const orderBy = 'price';
    let url = `https://${ this.username }:${ this.password }@distribution-xml.booking.com/json/getHotelAvailabilityV2?checkin=${ checkIn }&checkout=${ checkOut }&latitude=${ latitude }&longitude=${ longitude }&room1=${ room1 }&radius=${ radius }&currency_code=${ currency }&order_by=${ orderBy }&output=room_details,hotel_details`;
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
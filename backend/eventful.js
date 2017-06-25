const request = require('request');
const chalk = require('chalk');

class Eventful {
  constructor(app_key) {
    this.app_key = app_key;
    this.base_url = 'http://api.eventful.com/json/';
  }

  build_path(path) {
    return this.base_url + path + '?app_key=' + this.app_key
  }

  build_params(params) {
    let p = '';
    for (let param of Object.keys(params)) {
      p += '&' + param + '=' + params[param];
    }
    return p;
  }

  search_performers(params) {
    return this.wrap_return(this.build_path('performers/search') + this.build_params(params));
  }

  get_performer_events(params, callback) {
    return this.wrap_return(this.build_path('performers/events/list') + this.build_params(params));
  }

  get_event(params, callback) {
    return this.wrap_return(this.build_path('events/get') + this.build_params(params));
  }

  wrap_return(request_url) {
    return new Promise((resolve, reject) => {
      request(request_url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      });
    });
  }

  parsePrice(price_str) {
    return 123;
  }

  getTicketURL(data) {
    return 'abc';
  }
}

module.exports = Eventful;

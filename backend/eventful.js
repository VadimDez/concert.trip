const request = require('request');

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

  search_performers(params, callback) {
    request(this.build_path('performers/search') + this.build_params(params), callback);
  }

  get_performer_events(params, callback) {
    request(this.build_path('performers/events/list') + this.build_params(params), callback);
  }

  get_event(params, callback) {
    request(this.build_path('events/get') + this.build_params(params), callback);
  }
}

module.exports.Eventful = Eventful;

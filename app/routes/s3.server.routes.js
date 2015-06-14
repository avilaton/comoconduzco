'use strict';

/**
 * Module dependencies.
 */
var s3 = require('../../app/controllers/s3.server.controller');

module.exports = function(app) {
  app.route('/s3')
      .get(s3.sign);
};
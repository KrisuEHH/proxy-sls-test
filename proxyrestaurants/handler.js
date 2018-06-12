'use strict';
const axios = require('axios');

const ALL_URL = 'https://messi.hyyravintolat.fi/publicapi/restaurants/';
const SINGLE_URL_BASE = 'https://messi.hyyravintolat.fi/publicapi/restaurant';

function getAll(event, context, callback) {
  axios.get(ALL_URL)
    .then(response => {
      callback(null, createResponse(200, JSON.stringify(response.data)));
    })
    .catch(error => {
      callback(new Error(error));
    });
}

function getById(event, context, callback) {
  const id = event.pathParameters.id;
  const url = `${SINGLE_URL_BASE}/${id}`;
  axios.get(url)
    .then(response => {
      callback(null, createResponse(200, JSON.stringify(response.data)));
    })
    .catch(error => {
      callback(new Error(error));
    });
}

function createResponse(statusCode, body) {
  return {
    statusCode,
    body
  };
}


module.exports.restaurants = getAll;
module.exports.restaurantById = getById;

import * as config from '../../config/environment';
let app = config.app;
import fs from 'fs';
import Promise from 'promise';

exports.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
  if (!array || !itemToBecomeProperty) {
    return array;
  }
  if (!Array.isArray(array)) {
    array = [array];
  }

  let returnObject = {};
  for (let ii = 0; ii < array.length; ii++) {
    let specialProperty = array[ii][itemToBecomeProperty];
    if (specialProperty) {
      if (returnObject[specialProperty] === undefined) {
        returnObject[specialProperty] = [];
      }
      returnObject[specialProperty].push(array[ii]);
    }

  } //for

  return returnObject;
};

exports.arrayToObjectWithObject = function(array, itemToBecomeProperty) {
  if (!array || !itemToBecomeProperty) {
    return array;
  }
  if (!Array.isArray(array)) {
    array = [array];
  }

  let returnObject = {};
  for (let ii = 0; ii < array.length; ii++) {
    let specialProperty = array[ii][itemToBecomeProperty];
    if (specialProperty) {
      returnObject[specialProperty] = array[ii];
    }
  } //for
  return returnObject;
};

exports.objectToArray = function(data) {
  if (!data || data === null || typeof data !== 'object') {
    return data;
  }
  let returnArray = [];
  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      returnArray = returnArray.concat(data[property]);
    }
  }
  return returnArray;
};

exports.arrayToObjectWithValue = function(array, itemToBecomeProperty, itemToBecomeValue) {
  if (!array || !itemToBecomeProperty) {
    return array;
  }
  if (!Array.isArray(array)) {
    array = [array];
  }

  let returnObject = {};
  for (let ii = 0; ii < array.length; ii++) {
    let specialProperty = array[ii][itemToBecomeProperty];
    if (specialProperty) {
      returnObject[specialProperty] = array[ii][itemToBecomeValue];
    }
  } //for
  return returnObject;
};

exports.isEmpty = function(obj) {
  if (!obj) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length < 1;
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    return Object.keys(obj).length === 0;
  }
};

exports.containsUndefined = function(data) {
  return /(?!\B"[^"]*)undefined(?![^"]*"\B)/.test(data);
};

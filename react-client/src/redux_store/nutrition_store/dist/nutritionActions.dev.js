"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchNutritionRda = exports.fetchNutritionState = exports.sendUserData = exports.fetchActivityFactors = void 0;

var _nutritionTypes = require("./nutritionTypes");

var _v = _interopRequireWildcard(require("../../apis/v1"));

var _authActions = require("../auth_store/authActions");

var _reduxForm = require("redux-form");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchActivityFactors = function fetchActivityFactors() {
  return function _callee(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _v["default"])({
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: 'nutrition/activity'
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _nutritionTypes.FETCH_ACTIVITY_FACTORS,
                  payload: response.data
                });
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.fetchActivityFactors = fetchActivityFactors;

var sendUserData = function sendUserData(formProps) {
  return function _callee3(dispatch, getState, getFirebase) {
    var userDto;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch({
              type: _nutritionTypes.LOADING
            });
            userDto = _objectSpread({}, formProps, {
              male: formProps.male === "male" ? true : false,
              activityFactor: formProps.activityFactor.split(':')[0]
            });
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var firebase = getFirebase();
              firebase.auth().currentUser.getIdToken(true).then(function _callee2(idToken) {
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", (0, _authActions.sendUserDataToServer)(idToken, userDto).then(function () {
                          dispatch({
                            type: _nutritionTypes.UPDATE_USER_STATE
                          }); // dispatch({type: POP_LOADING});
                        }));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                console.log(error.message);
                reject(new _reduxForm.SubmissionError({
                  _error: error.message
                }));
                dispatch({
                  type: _nutritionTypes.POP_LOADING
                });
              });
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.sendUserData = sendUserData;

var fetchNutritionState = function fetchNutritionState() {
  return function _callee4(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: 'nutrition/state'
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _nutritionTypes.FETCH_NUTRITION_STATE,
                  payload: response.data
                });
              }
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.fetchNutritionState = fetchNutritionState;

var fetchNutritionRda = function fetchNutritionRda() {
  return function _callee5(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: 'nutrition/rda'
              },
              onSuccess: function onSuccess(response) {
                var _response$data = response.data,
                    userDetails = _response$data.userDetails,
                    nutritionRda = _objectWithoutProperties(_response$data, ["userDetails"]);

                dispatch({
                  type: _nutritionTypes.FETCH_NUTRITION_RDA,
                  payload: {
                    userDetails: userDetails,
                    nutritionRda: nutritionRda
                  }
                });
              }
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.fetchNutritionRda = fetchNutritionRda;
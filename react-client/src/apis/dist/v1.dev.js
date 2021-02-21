"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.api = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _feedbackTypes = require("../redux_store/feedback_store/feedbackTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = _axios["default"].create({
  baseURL: 'http://192.168.0.154:9090/api/v1/'
});

exports.api = api;

var apiRequest = function apiRequest(_ref) {
  var _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      dispatch = _ref.dispatch,
      getFirebase = _ref.getFirebase,
      _ref$request = _ref.request,
      method = _ref$request.method,
      url = _ref$request.url,
      _ref$request$payload = _ref$request.payload,
      payload = _ref$request$payload === void 0 ? {} : _ref$request$payload,
      _ref$request$otherHea = _ref$request.otherHeaders,
      otherHeaders = _ref$request$otherHea === void 0 ? {} : _ref$request$otherHea,
      onSuccess = _ref.onSuccess,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (error) {
    dispatch({
      type: _feedbackTypes.MESSAGE,
      payload: "ERROR: " + error.message
    });
  } : _ref$onError;
  if (loading) dispatch({
    type: _feedbackTypes.PUSH_LOADING
  });
  var firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then(function _callee(idToken) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            api.request({
              method: method,
              url: url,
              data: payload,
              headers: _objectSpread({
                'Authorization': 'Bearer ' + idToken
              }, otherHeaders)
            }).then(function (response) {
              onSuccess(response);
              if (loading) dispatch({
                type: _feedbackTypes.POP_LOADING
              });
            })["catch"](function (error) {
              onError(error);
              dispatch({
                type: _feedbackTypes.MESSAGE,
                payload: "ERROR: " + error.message
              });
              if (loading) dispatch({
                type: _feedbackTypes.POP_LOADING
              });
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  })["catch"](function (error) {
    console.log(error);
    dispatch({
      type: _feedbackTypes.MESSAGE,
      payload: "FIREBASE ERROR: " + error.message
    });
    if (loading) dispatch({
      type: _feedbackTypes.POP_LOADING
    });
  });
};

var _default = apiRequest;
exports["default"] = _default;
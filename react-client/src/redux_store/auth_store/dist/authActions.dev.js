"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendUserDataToServer = exports.signUp = exports.signOut = exports.signIn = void 0;

var _reduxForm = require("redux-form");

var _v = _interopRequireWildcard(require("../../apis/v1"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var signIn = function signIn(credentials) {
  return function _callee(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var firebase = getFirebase();
              firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(function () {
                resolve();
              })["catch"](function (err) {
                console.log(err.code);
                if (err.code === "auth/user-not-found") reject(new _reduxForm.SubmissionError({
                  email: "User with this email doesn't exist !"
                }));else if (err.code === "auth/wrong-password") reject(new _reduxForm.SubmissionError({
                  password: "Wrong password!"
                }));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.signIn = signIn;

var signOut = function signOut() {
  return function (dispatch, getState, getFirebase) {
    var firebase = getFirebase();
    firebase.auth().signOut().then(function () {
      dispatch({
        type: 'SIGNOUT_SUCCESS'
      });
    });
  };
};

exports.signOut = signOut;

var signUp = function signUp(newUser) {
  return function _callee2(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var firebase = getFirebase();
              var firestore = firebase.firestore();
              console.log(newUser);
              firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(function (resp) {
                var a = firestore.collection('users').doc(resp.user.uid).set({
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  initials: newUser.firstName[0] + newUser.lastName[0]
                }).then(function () {
                  return sendUserDataToServer(resp.user.xa, {});
                });
                console.log(a);
                return a;
              }).then(function (response) {
                console.log(response);
                resolve();
              })["catch"](function (err) {
                console.log("ERROR: " + err);

                if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                  reject(new _reduxForm.SubmissionError({
                    email: err.message
                  }));
                } else if (err.code === "auth/weak-password") {
                  reject(new _reduxForm.SubmissionError({
                    password: err.message
                  }));
                } else {
                  reject(new _reduxForm.SubmissionError({
                    _error: err.message
                  }));
                }
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.signUp = signUp;

var sendUserDataToServer = function sendUserDataToServer(token, userDto) {
  return new Promise(function (resolve, reject) {
    _v.api.post('users', userDto, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(function () {
      resolve();
    })["catch"](function (error) {
      reject({
        message: error
      });
    });
  });
};

exports.sendUserDataToServer = sendUserDataToServer;
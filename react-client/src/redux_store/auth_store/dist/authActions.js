"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sendUserDataToServer = exports.signUp = exports.signOut = exports.signIn = void 0;
var redux_form_1 = require("redux-form");
var v1_1 = require("../../apis/v1");
exports.signIn = function (credentials) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var firebase = getFirebase();
                firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(function () {
                    resolve("success");
                })["catch"](function (err) {
                    console.log(err.code);
                    if (err.code === "auth/user-not-found")
                        reject(new redux_form_1.SubmissionError({ email: "User with this email doesn't exist !" }));
                    else if (err.code === "auth/wrong-password")
                        reject(new redux_form_1.SubmissionError({ password: "Wrong password!" }));
                });
            })];
    });
}); }; };
exports.signOut = function () {
    return function (dispatch, getState, getFirebase) {
        var firebase = getFirebase();
        firebase.auth().signOut().then(function () {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    };
};
exports.signUp = function (newUser) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //TODO - IMPROVE
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var firebase = getFirebase();
                var firestore = firebase.firestore();
                console.log(newUser);
                firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(function (resp) {
                    var a = firestore.collection('users').doc(resp.user.uid).set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0]
                    }).then(function () {
                        return exports.sendUserDataToServer(resp.user.xa, {});
                    });
                    console.log(a);
                    return a;
                }).then(function (response) {
                    console.log(response);
                    resolve("success");
                })["catch"](function (err) {
                    console.log("ERROR: " + err);
                    if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                        reject(new redux_form_1.SubmissionError({ email: err.message }));
                    }
                    else if (err.code === "auth/weak-password") {
                        reject(new redux_form_1.SubmissionError({ password: err.message }));
                    }
                    else {
                        reject(new redux_form_1.SubmissionError({ _error: err.message }));
                    }
                });
            })];
    });
}); }; };
exports.sendUserDataToServer = function (token, userDto) {
    return new Promise(function (resolve, reject) {
        v1_1.api.post('users', userDto, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(function () {
            resolve("success");
        })["catch"](function (error) {
            reject({ message: error });
        });
    });
};

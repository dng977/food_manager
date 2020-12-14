"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  loading: true,
  message: '',
  numberLoading: 0,
  dialogLoading: false
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("DISPATCH: ", action.type);
  var newNumberLoading = 0;

  switch (action.type) {
    case _types.LOADING:
      return _objectSpread({}, state, {
        loading: true
      });

    case _types.MESSAGE:
      return _objectSpread({}, state, {
        message: action.payload,
        loading: false
      });

    case _types.CLEAR_MESSAGE:
      return _objectSpread({}, state, {
        message: '',
        loading: false
      });

    case _types.PUSH_LOADING:
      newNumberLoading = state.numberLoading + 1;
      return _objectSpread({}, state, {
        numberLoading: newNumberLoading,
        loading: true
      });

    case _types.POP_LOADING:
      newNumberLoading = state.numberLoading > 0 ? state.numberLoading - 1 : 0;
      return _objectSpread({}, state, {
        numberLoading: newNumberLoading,
        loading: newNumberLoading > 0
      });

    case _types.DIALOG_LOADING:
      return _objectSpread({}, state, {
        dialogLoading: true
      });

    default:
      return _objectSpread({}, state, {
        dialogLoading: false,
        message: ''
      });
  }
};

exports["default"] = _default;
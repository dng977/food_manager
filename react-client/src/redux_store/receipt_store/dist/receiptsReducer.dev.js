"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _receiptTypes = require("./receiptTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  receipts: {},
  currentReceipt: {
    id: 0,
    receiptItems: [],
    imageData: ''
  }
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("DISPATCH: ", action.type);

  switch (action.type) {
    case _receiptTypes.FETCH_RECEIPTS:
      return _objectSpread({}, state, {
        receipts: _objectSpread({}, _lodash["default"].mapKeys(action.payload, 'id'))
      });

    case _receiptTypes.FETCH_RECEIPT_ITEMS:
      return _objectSpread({}, state, {
        currentReceipt: {
          id: action.payload.id,
          imageData: '',
          receiptItems: _objectSpread({}, _lodash["default"].mapKeys(action.payload.receiptItems, 'id'))
        }
      });

    case _receiptTypes.UPLOAD_RECEIPT:
      return _objectSpread({}, state, {
        receipts: _objectSpread({}, state.receipts, _defineProperty({}, action.payload.id, action.payload))
      });

    case _receiptTypes.FETCH_RECEIPT_IMAGE:
      return _objectSpread({}, state, {
        currentReceipt: _objectSpread({}, state.currentReceipt, {
          id: action.payload.id,
          imageData: action.payload.imageData
        })
      });

    case _receiptTypes.DELETE_RECEIPT:
      return _objectSpread({}, state, {
        currentReceipt: initState.currentReceipt,
        receipts: _lodash["default"].omit(state.receipts, action.payload)
      });

    case _receiptTypes.EDIT_RECEIPT_ITEM:
      return _objectSpread({}, state, {
        currentReceipt: _objectSpread({}, state.currentReceipt, {
          receiptItems: _objectSpread({}, state.currentReceipt.receiptItems, _defineProperty({}, action.payload.newReceiptItem.id, action.payload.newReceiptItem))
        })
      });

    case _receiptTypes.SET_CURRENT_RECEIPT:
      return _objectSpread({}, state, {
        currentReceipt: _objectSpread({}, state.currentReceipt, {
          id: action.payload,
          imageData: ''
        })
      });

    default:
      return state;
  }
};

exports["default"] = _default;
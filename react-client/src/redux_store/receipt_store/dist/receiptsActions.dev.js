"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentReceipt = exports.addReceiptItemsToFoodStock = exports.editReceiptItem = exports.deleteReceipt = exports.fetchReceiptImage = exports.uploadReceipt = exports.fetchReceiptItems = exports.fetchReceipts = void 0;

var _v = _interopRequireWildcard(require("../../apis/v1"));

var _receiptTypes = require("./receiptTypes");

var _history = _interopRequireDefault(require("../../history"));

var _constants = require("../../components/dashboard/pages/receipt_page/constants");

var _foodActions = require("../food_store/foodActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchReceipts = function fetchReceipts() {
  return function _callee(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: 'receipts'
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _receiptTypes.FETCH_RECEIPTS,
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

exports.fetchReceipts = fetchReceipts;

var fetchReceiptItems = function fetchReceiptItems(id, _onError) {
  return function _callee2(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(getState().receipts.currentReceipt.id === id)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: 'receipts/' + id + '/items'
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _receiptTypes.FETCH_RECEIPT_ITEMS,
                  payload: {
                    id: id,
                    receiptItems: response.data
                  }
                });
              },
              onError: function onError(error) {
                return _onError();
              }
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.fetchReceiptItems = fetchReceiptItems;

var uploadReceipt = function uploadReceipt(receiptImage) {
  return function _callee3(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'post',
                url: 'receipts',
                payload: receiptImage,
                otherHeaders: {
                  'Content-Type': "multipart/form-data; boundary=".concat(receiptImage._boundary)
                }
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _receiptTypes.FETCH_RECEIPTS,
                  payload: response.data
                });
              }
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.uploadReceipt = uploadReceipt;

var fetchReceiptImage = function fetchReceiptImage(id) {
  return function _callee4(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(getState().receipts.currentReceipt.imageData !== '')) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return");

          case 2:
            (0, _v["default"])({
              loading: false,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: "receipts/".concat(id, "/image")
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _receiptTypes.FETCH_RECEIPT_IMAGE,
                  payload: {
                    id: id,
                    imageData: response.data
                  }
                });
              }
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.fetchReceiptImage = fetchReceiptImage;

var deleteReceipt = function deleteReceipt(id, callback) {
  return function _callee5(dispatch, getState, getFirebase) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            callback();
            (0, _v["default"])({
              loading: true,
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'delete',
                url: "receipts/".concat(id)
              },
              onSuccess: function onSuccess(response) {
                return dispatch({
                  type: _receiptTypes.DELETE_RECEIPT,
                  payload: id
                });
              }
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.deleteReceipt = deleteReceipt;

var editReceiptItem = function editReceiptItem(oldItemId, newFoodItemDto) {
  return function _callee6(dispatch, getState, getFirebase) {
    var id, oldReceiptItem, newReceiptItem;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //dispatch({type: LOADING});
            id = getState().receipts.currentReceipt.id;
            oldReceiptItem = getState().receipts.currentReceipt.receiptItems[oldItemId];
            newReceiptItem = _objectSpread({}, oldReceiptItem, {
              foodItemReceiptDto: [newFoodItemDto],
              status: _constants.itemStatus.RECOGNIZED
            });
            (0, _v["default"])({
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'put',
                url: "receipts/".concat(id, "/items/").concat(newReceiptItem.id),
                payload: newReceiptItem
              },
              onSuccess: function onSuccess() {
                return dispatch({
                  type: _receiptTypes.EDIT_RECEIPT_ITEM,
                  payload: {
                    newReceiptItem: newReceiptItem
                  }
                });
              }
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
};

exports.editReceiptItem = editReceiptItem;

var itemsReadyForStock = function itemsReadyForStock(receiptItems) {
  return Object.values(receiptItems).some(function (item) {
    return item.status === _constants.itemStatus.RECOGNIZED;
  });
};

var addReceiptItemsToFoodStock = function addReceiptItemsToFoodStock() {
  return function _callee7(dispatch, getState, getFirebase) {
    var id;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (itemsReadyForStock(getState().receipts.currentReceipt.receiptItems)) {
              _context7.next = 3;
              break;
            }

            dispatch({
              type: _receiptTypes.MESSAGE,
              payload: "Recognized items have already been added to Food Stock!"
            });
            return _context7.abrupt("return");

          case 3:
            id = getState().receipts.currentReceipt.id;
            (0, _v["default"])({
              dispatch: dispatch,
              getFirebase: getFirebase,
              request: {
                method: 'get',
                url: "receipts/foodstock/".concat(id)
              },
              onSuccess: function onSuccess(response) {
                console.log("RI: ", response.data);
                dispatch({
                  type: _receiptTypes.FETCH_RECEIPT_ITEMS,
                  payload: {
                    id: id,
                    receiptItems: response.data
                  }
                });
                dispatch((0, _foodActions.fetchFoodStock)({
                  actionsOnSuccess: [{
                    type: _receiptTypes.MESSAGE,
                    payload: "Items have been added successfully"
                  }]
                }));
              }
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
};

exports.addReceiptItemsToFoodStock = addReceiptItemsToFoodStock;

var setCurrentReceipt = function setCurrentReceipt(id) {
  return {
    type: _receiptTypes.SET_CURRENT_RECEIPT,
    payload: id
  };
};

exports.setCurrentReceipt = setCurrentReceipt;
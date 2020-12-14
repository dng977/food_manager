"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopBatchLoading = exports.startBatchLoading = void 0;

var _require = require("../sharedTypes"),
    START_BATCH_LOADING = _require.START_BATCH_LOADING,
    STOP_BATCH_LOADING = _require.STOP_BATCH_LOADING;

var startBatchLoading = function startBatchLoading() {
  return {
    type: START_BATCH_LOADING
  };
};

exports.startBatchLoading = startBatchLoading;

var stopBatchLoading = function stopBatchLoading() {
  return {
    type: STOP_BATCH_LOADING
  };
};

exports.stopBatchLoading = stopBatchLoading;
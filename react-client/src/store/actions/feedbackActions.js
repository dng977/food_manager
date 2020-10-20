const { START_BATCH_LOADING, STOP_BATCH_LOADING } = require("./types");

export const startBatchLoading = () => {return {type: START_BATCH_LOADING}};
export const stopBatchLoading = () => {return {type: STOP_BATCH_LOADING}};
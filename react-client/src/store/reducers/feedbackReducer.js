import { CLEAR_MESSAGE, DIALOG_LOADING, LOADING, MESSAGE, START_BATCH_LOADING, STOP_BATCH_LOADING } from "../actions/types";

const initState = { 
  loading: true, 
  message: '',
  batchLoading: true,
  dialogLoading: false,
}

export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case MESSAGE:
      return { ...state, message: action.payload, loading: false }
    case CLEAR_MESSAGE:
      return { ...state, message: '', loading: false}
    case START_BATCH_LOADING:
      return{...state, batchLoading: true}
    case STOP_BATCH_LOADING:
      return{...state, batchLoading: false}
    case DIALOG_LOADING:
      return {...state, dialogLoading: true}
    default:
      return {...state, loading: false, dialogLoading: false, message: ''};
  }
}
import { CLEAR_MESSAGE, DIALOG_LOADING, LOADING, MESSAGE, PUSH_LOADING, POP_LOADING, FeedbackState, FeedbackActions, PAGE_LOADING } from "./feedbackTypes";

const initState : FeedbackState = { 
  loading: false, 
  message: '',
  numberLoading: 0,
  dialogLoading: false,
  pageLoading: true
}

export default (state = initState, action: FeedbackActions) : FeedbackState => {
  console.log("DISPATCH: ", action.type);
  let newNumberLoading = 0;
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case MESSAGE:
      return { ...state, message: action.payload, loading: false }
    case CLEAR_MESSAGE:
      return { ...state, message: '', loading: false, dialogLoading: false}
    case PUSH_LOADING:
      newNumberLoading = state.numberLoading + 1;
      return{...state, numberLoading: newNumberLoading, loading: true}
    case POP_LOADING:
      newNumberLoading = state.numberLoading > 0 ? state.numberLoading - 1 : 0;
      return{...state, numberLoading: newNumberLoading, loading: newNumberLoading > 0}
    case DIALOG_LOADING:
      return {...state, dialogLoading: true}
    case PAGE_LOADING:
      return{...state, pageLoading: true};
    default:
      return {...state, dialogLoading: false};
  }
}
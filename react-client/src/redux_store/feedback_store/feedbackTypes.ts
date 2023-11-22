export const LOADING = "LOADING";
export const DIALOG_LOADING = "DIALOG_LOADING";
export const PUSH_LOADING = "PUSH_LOADING";
export const POP_LOADING = "POP_LOADING";
export const MESSAGE = 'MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const PAGE_LOADING = 'PAGE_LOADING';

export interface FeedbackState{
  loading: boolean, 
  message: string,
  numberLoading: number,
  dialogLoading: boolean,
  pageLoading: boolean
}

export interface MessageAction{
  type: typeof MESSAGE;
  payload: string;
}
export interface ClearMessageAction{
  type: typeof CLEAR_MESSAGE;
}

export interface LoadingActions{
  type: typeof LOADING | typeof PUSH_LOADING | typeof POP_LOADING | typeof DIALOG_LOADING | typeof PAGE_LOADING;
}

export type FeedbackActions = LoadingActions | MessageAction | ClearMessageAction;
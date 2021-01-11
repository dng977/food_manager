import { ExtendedFirebaseInstance } from "react-redux-firebase";
import { Action, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "./rootReducer";


export type IdMap<T> = {
  [id: number]: T;
}

//DISPATCH TYPE
// export type DispatchType<T> = (arg0: T) => void;
export type AppThunkDispatch<T extends Action> = ThunkDispatch<RootState,void,T>

//THUNK TYPE
export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  () => ExtendedFirebaseInstance,
  A
>;
//=> async (dispatch: (arg0: FoodItemsActions) => void, _getState, getFirebase)
// export function asyncAction(): AppThunk


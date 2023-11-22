import { ReceiptDto, ReceiptItemDto } from "../../apis/dtos/serverDtos";
import { IdMap } from "../sharedTypes";


//CONSTANTS
export const UPLOAD_RECEIPT = 'UPLOAD_RECEIPT';
export const FETCH_RECEIPTS = 'FETCH_RECEIPTS';
export const FETCH_RECEIPT = 'FETCH_RECEIPT';
export const FETCH_RECEIPT_IMAGE = 'FETCH_RECEIPT_IMAGE';
export const EDIT_RECEIPT_ITEM = 'EDIT_RECEIPT_ITEM';
export const EDIT_RECEIPT_ITEMS = 'EDIT_RECEIPT_ITEMS';
export const DELETE_RECEIPT = 'DELETE_RECEIPT';

export const SET_CURRENT_RECEIPT = 'SET_CURRENT_RECEIPT';
export const FETCH_RECEIPT_ITEMS = 'FETCH_RECEIPT_ITEMS';


export interface ReceiptsState {
  receipts: IdMap<ReceiptDto>,
  currentReceipt: {
    id: number,
    receiptItems: IdMap<ReceiptItemDto>,
    imageData: Int8Array[] | null
  }
}

export interface FetchReceiptsAction {
  type: typeof FETCH_RECEIPTS;
  payload: ReceiptDto[];
}
export interface FetchReceiptItemsAction {
  type: typeof FETCH_RECEIPT_ITEMS;
  payload: {id: number, receiptItems: ReceiptItemDto[]};
}
export interface FetchReceiptImageAction {
  type: typeof FETCH_RECEIPT_IMAGE;
  payload: {id: number, imageData: Int8Array[]};
}
export interface DeleteReceiptAction {
  type: typeof DELETE_RECEIPT;
  payload: number;
}
export interface EditReceiptItemAction {
  type: typeof EDIT_RECEIPT_ITEM;
  payload: ReceiptItemDto;
}
export type ReceiptActions = FetchReceiptsAction | FetchReceiptImageAction | FetchReceiptItemsAction | DeleteReceiptAction | EditReceiptItemAction;

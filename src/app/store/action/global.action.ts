import { createAction, props } from '@ngrx/store';

export enum GlobalActions {
  GLOBAL_LOADING_TOGGLE = '[GLOBAL] Loading Toggle',
  GLOBAL_SET_LOADING = '[GLOBAL] Loading',
  GLOBAL_SET_BARCODE = '[GLOBAL] Set Barcode',
}
export const loadingToggle = createAction(GlobalActions.GLOBAL_LOADING_TOGGLE);
export const setLoading = createAction(GlobalActions.GLOBAL_SET_LOADING, props<{ loading: boolean }>());
export const setBarCode = createAction(GlobalActions.GLOBAL_SET_BARCODE, props<{ barCode: string }>());

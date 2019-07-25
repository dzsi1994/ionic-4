import { createAction, props } from '@ngrx/store';

export enum GlobalActions {
  GLOBAL_LOADING_TOGGLE = '[GLOBAL] Loading Toggle',
  GLOBAL_LOADING_TRUE = '[GLOBAL] Loading True',
  GLOBAL_LOADING_FALSE = '[GLOBAL] Loading False',
}
export const loadingToggle = createAction(GlobalActions.GLOBAL_LOADING_TOGGLE);
export const loadingSetTrue = createAction(GlobalActions.GLOBAL_LOADING_TRUE, props<{ loading: boolean }>());
export const loadingSetFalse = createAction(GlobalActions.GLOBAL_LOADING_TOGGLE, props<{ loading: boolean }>());

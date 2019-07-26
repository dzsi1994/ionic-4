import { State } from './../index';
import { setLoading, loadingToggle, setBarCode } from '../action';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';

export interface GlobalState {
  isLoading: boolean;
  barCode: string;
}

export const initialState: GlobalState = {
  isLoading: false,
  barCode: '',
};

const globalStateReducer = createReducer(
  initialState,
  on(loadingToggle, state => ({ ...state, isLoading: !state.isLoading })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
  on(setBarCode, (state, { barCode }) => ({
    ...state,
    barCode,
  })),
);
export const selectGlobalFeature = createFeatureSelector<State, GlobalState>('globalState');

export const selectIsLoading = createSelector(
  selectGlobalFeature,
  (state: GlobalState) => state.isLoading,
);

export const selectBarCode = createSelector(
  selectGlobalFeature,
  (state: GlobalState) => state.barCode,
);

export function reducer(state: GlobalState | undefined, action: Action) {
  return globalStateReducer(state, action);
}

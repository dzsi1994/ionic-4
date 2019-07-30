import { State } from './../index';
import { setLoading, loadingToggle, setBarCode, setActivePackage } from '../action';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';

export interface GlobalState {
  isLoading: boolean;
  barCode: string;
  selectedPackage: any;
}

export const initialState: GlobalState = {
  isLoading: false,
  barCode: '',
  selectedPackage: {},
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
  on(setActivePackage, (state, { selectedPackage }) => ({
    ...state,
    selectedPackage,
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
export const selectPackage = createSelector(
  selectGlobalFeature,
  (state: GlobalState) => state.selectedPackage,
);

export function reducer(state: GlobalState | undefined, action: Action) {
  return globalStateReducer(state, action);
}

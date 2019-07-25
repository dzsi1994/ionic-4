import { State } from './../index';
import { loadingSetFalse, loadingSetTrue, loadingToggle } from '../action';
import { createReducer, on, Action, createSelector, createFeatureSelector } from '@ngrx/store';

export interface GlobalState {
  isLoading: boolean;
}

export const initialState: GlobalState = {
  isLoading: false,
};

const featureReducer = createReducer(
  initialState,
  on(loadingToggle, state => ({ isLoading: !state.isLoading })),
  on(loadingSetFalse, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
  on(loadingSetTrue, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
);
export const selectGlobalFeature = createFeatureSelector<State, GlobalState>('globalState');

export const selectIsLoading = createSelector(
  selectGlobalFeature,
  (state: GlobalState) => state.isLoading,
);

export function reducer(state: any | undefined, action: Action) {
  return featureReducer(state, action);
}

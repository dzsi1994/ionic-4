import { loadingSetFalse, loadingSetTrue, loadingToggle } from '../action';
import { createReducer, on, Action, State } from '@ngrx/store';

export interface GlobalState {
  isLoading: boolean;
}

export const initialState: GlobalState = {
  isLoading: false,
};

const featureReducer = createReducer(
  initialState,
  on(loadingToggle, state => ({ ...state, isLoading: !state.isLoading })),
  on(loadingSetFalse, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
  on(loadingSetTrue, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
);

export function reducer(state: any | undefined, action: Action) {
  return featureReducer(state, action);
}

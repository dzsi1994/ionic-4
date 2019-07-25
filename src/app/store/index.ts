import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromGlobalReducer from './reducers/global.reducer';

export interface GlobalState {
  isLoading: boolean;
}

export interface State {
  globalState: GlobalState;
}

export const reducers: ActionReducerMap<State> = {
  globalState: fromGlobalReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import { reducer, initialState } from './global.reducer';
import { loadingToggle, loadingSetTrue } from '../action';
import * as fromRootReducer from './global.reducer';

describe('Global Reducer TESTS: ', () => {
  it('should have a isLoading set to true', () => {
    const action = loadingSetTrue({ loading: true });
    const action2 = loadingSetTrue({ loading: false });
    const result = reducer(initialState, action);
    const result2 = reducer(initialState, action2);
    expect(result2).toEqual({
      isLoading: false,
    });
  });
});

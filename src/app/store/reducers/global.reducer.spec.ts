import { reducer } from './global.reducer';
import { loadingToggle, setLoading, setBarCode } from '../action';
import * as fromRootReducer from './global.reducer';

describe('Global Reducer TESTS: ', () => {
  it('should have loading toggled so is true', () => {
    const { initialState } = fromRootReducer;
    const action = loadingToggle();
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should return barCode: 2123445', () => {
    const { initialState } = fromRootReducer;
    const action = setBarCode({ barCode: '2123445' });
    const state = fromRootReducer.reducer(initialState, action);
    expect(state.barCode).toBe('2123445');
  });
  it('should have a isLoading set to true', () => {
    const { initialState } = fromRootReducer;
    const action = setLoading({ loading: true });
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should have barCode set to 2123445 and loading to true', () => {
    const { initialState } = fromRootReducer;
    const action = setBarCode({ barCode: '2123445' });
    const state = reducer(initialState, action);
    expect(state).toEqual({
      isLoading: false,
      barCode: '2123445',
    });
    expect(state.barCode).toBe('2123445');
  });
});

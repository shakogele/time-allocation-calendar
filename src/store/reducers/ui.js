import { UI_START_LOADING, UI_STOP_LOADING, TZ_START_LOADING, TZ_STOP_LOADING } from "../actions/actionTypes";
    
const initialState = {
  isLoading: false,
  tzIsLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case TZ_START_LOADING:
      return {
        ...state,
        tzIsLoading: true
      };
    case TZ_STOP_LOADING:
      return {
        ...state,
        tzIsLoading: false
      };
    default:
      return state;
  }
};

export default reducer;

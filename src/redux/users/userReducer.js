import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
const initialState = {
  loading: "",
  users: [],
  error: "",
  // page: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload, totalPage } = action;
  switch (type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, users: [], error: "" };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...payload],
        page: totalPage,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, users: [], error: payload };
    default:
      return state;
  }
};
export default reducer;

const Reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        token: null,
        isFetching: true,
        error: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        token: action.payload.token,
        isFetching: false,
        error: false,
      };
    case "SIGNUP_FAIL":
      return {
        token: null,
        isFetching: false,
        error: true,
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        isFetching: false,
        error: false,
      };
    case "LOGIN_START":
      return {
        token: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_FAIL":
      return {
        token: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        token: null,
        isFetching: false,
        error: false,
      };
    case "DELETE_BLOG_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_BLOG_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "DELETE_BLOG_FAIL":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_BLOG_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_BLOG_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "UPDATE_BLOG_FAIL":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "NEW_BLOG_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "NEW_BLOG_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "NEW_BLOG_FAIL":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "UPDATE_USER_FAIL":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_USER_SUCCESS":
      return {
        token:null,
        isFetching: false,
        error: false,
      };
    case "DELETE_USER_FAIL":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default Reducer;

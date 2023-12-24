const initialState = {
  loginData: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        loginData: action.payload.loginData,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default userReducer;

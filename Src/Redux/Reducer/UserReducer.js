const initialState = {
  loginData: null,
  token: null,
  resetEmail: null, 
  verificationData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        loginData: action.payload.loginData,
        token: action.payload.token,
      };
    case 'SET_RESET_EMAIL':
      return {
        ...state,
        resetEmail: action.payload,
      };
      case 'SAVE_VERIFICATION_DATA':
      return {
        ...state,
        verificationData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

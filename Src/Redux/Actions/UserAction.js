export const setLoginData = data => ({
  type: 'SET_LOGIN_DATA',
  payload: data,
});
export const setResetEmail = resetEmail => ({
  type: 'SET_RESET_EMAIL',
  payload: resetEmail,
});
export const saveVerificationData = responseData => ({
  type: 'SAVE_VERIFICATION_DATA',
  payload: responseData,
});

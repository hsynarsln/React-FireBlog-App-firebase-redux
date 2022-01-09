import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../Helpers/firebase';
import { SET_USER } from './blogActionTypes';

export const setUserAction = payload => ({ type: SET_USER, user: payload });

//! sign in
export const signIn = navigate => {
  return async dispatch => {
    signInWithPopup(auth, provider)
      .then(payload => {
        // console.log(payload);
        dispatch(setUserAction(payload.user));
        navigate('/');
      })
      .catch(err => alert(err.message));
  };
};

//! get user
export const getUser = () => {
  return dispatch => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setUserAction(user));
      }
    });
  };
};

//! sign out
export const signOutAPI = navigate => {
  return dispatch => {
    signOut(auth)
      .then(() => {
        dispatch(setUserAction(null));
        navigate('/');
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

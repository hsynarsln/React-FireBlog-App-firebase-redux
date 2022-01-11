import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, provider } from '../../Helpers/firebase';
import { successNote } from '../../Helpers/toastNotify';
import { SET_LOADING_STATUS, SET_USER } from './blogActionTypes';

export const setUserAction = payload => ({ type: SET_USER, user: payload });

export const setLoading = status => ({
  type: SET_LOADING_STATUS,
  status: status
});

//! sign in wit google
export const signIn = navigate => {
  return async dispatch => {
    dispatch(setLoading(true));
    signInWithPopup(auth, provider)
      .then(payload => {
        // console.log(payload);
        dispatch(setUserAction(payload.user));
        dispatch(setLoading(false));
        navigate('/');
        successNote('Logged in successfully!');
        dispatch(setLoading(false));
      })
      .catch(err => alert(err.message));
    dispatch(setLoading(false));
  };
};

//! get user
export const getUser = () => {
  return dispatch => {
    onAuthStateChanged(auth, user => {
      // console.log(user);
      if (user) {
        dispatch(setUserAction(user));
      } else {
        console.log('user not found');
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
        successNote('Logged out!');
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

//! sign up with email
export const signupWithEmail = (values, navigate) => {
  return async dispatch => {
    dispatch(setLoading(true));
    //! username --> null gelmemesi için
    const displayName = values.username;
    try {
      //! createUserWithEmailAndPassword --> 3 parametre alıyor. "auth" kendi projemiz ile bağlıyoruz. "email" user email. "password" user password
      let user = await createUserWithEmailAndPassword(auth, values.email, values.password);

      //! updateProfile --> firebase'den geliyor. auth.currentUser --> register yapan kullanıcının username null gelmemesi için displayName'e oluşturduğumuz displayName'i atıyoruz.
      await updateProfile(auth.currentUser, { displayName: displayName });
      dispatch(setUserAction(auth.currentUser));
      // console.log(auth.currentUser);
      dispatch(setLoading(false));
      navigate('/');
      successNote('Logged in successfully!');
    } catch (err) {
      alert(err.message);
      dispatch(setLoading(false));
    }
  };
};

//! signin with email
export const signinWithEmail = (values, navigate) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      //! signInWithEmailAndPassword --> firebase'den gelen fonksiyon
      let user = await signInWithEmailAndPassword(auth, values.email, values.password);
      // console.log(user);
      dispatch(setUserAction(user.user.auth.currentUser));
      dispatch(setLoading(false));
      navigate('/');
      successNote('Logged in successfully!');
    } catch (err) {
      alert(err.message);
      dispatch(setLoading(false));
    }
  };
};

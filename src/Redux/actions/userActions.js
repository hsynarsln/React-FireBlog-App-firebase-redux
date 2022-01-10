import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, provider } from '../../Helpers/firebase';
import { successNote } from '../../Helpers/toastNotify';
import { SET_USER } from './blogActionTypes';

export const setUserAction = payload => ({ type: SET_USER, user: payload });

//! sign in wit google
export const signIn = navigate => {
  return async dispatch => {
    signInWithPopup(auth, provider)
      .then(payload => {
        // console.log(payload);
        dispatch(setUserAction(payload.user));
        navigate('/');
        successNote('Logged in successfully!');
      })
      .catch(err => alert(err.message));
  };
};

//! get user
export const getUser = () => {
  return dispatch => {
    onAuthStateChanged(auth, user => {
      console.log(user);
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
    //! username --> null gelmemesi için
    const displayName = values.username;
    try {
      //! createUserWithEmailAndPassword --> 3 parametre alıyor. "auth" kendi projemiz ile bağlıyoruz. "email" user email. "password" user password
      let user = await createUserWithEmailAndPassword(auth, values.email, values.password);

      //! updateProfile --> firebase'den geliyor. auth.currentUser --> register yapan kullanıcının username null gelmemesi için displayName'e oluşturduğumuz displayName'i atıyoruz.
      await updateProfile(auth.currentUser, { displayName: displayName });
      dispatch(setUserAction(auth.currentUser));
      // console.log(auth.currentUser);
      navigate('/');
      successNote('Logged in successfully!');
    } catch (err) {
      alert(err.message);
    }
  };
};

//! signin with email
export const signinWithEmail = (values, navigate) => {
  return async dispatch => {
    try {
      //! signInWithEmailAndPassword --> firebase'den gelen fonksiyon
      let user = await signInWithEmailAndPassword(auth, values.email, values.password);
      // console.log(user);
      dispatch(setUserAction(user.user.auth.currentUser));
      navigate('/');
      successNote('Logged in successfully!');
    } catch (err) {
      alert(err.message);
    }
  };
};

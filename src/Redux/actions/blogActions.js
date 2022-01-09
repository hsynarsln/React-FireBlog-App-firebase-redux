import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Helpers/firebase';
import { FETCH_ALL_BLOGS } from './blogActionTypes';

export const getAllBlogsAction = payload => ({ type: FETCH_ALL_BLOGS, payload: payload });

export const getAllBlogs = () => {
  return async dispatch => {
    let payload;

    const q = await query(collection(db, 'blogs'), orderBy('date', 'desc'));
    onSnapshot(q, querySnapshot => {
      payload = querySnapshot.docs.map(doc => doc.data());

      // console.log(payload);

      dispatch(getAllBlogsAction(payload));
    });
  };
};

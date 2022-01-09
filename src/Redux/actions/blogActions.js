import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../Helpers/firebase';
import { CREATE_BLOG, FETCH_ALL_BLOGS } from './blogActionTypes';

export const getAllBlogsAction = payload => ({ type: FETCH_ALL_BLOGS, payload: payload });

export const createBlogAction = payload => ({ type: CREATE_BLOG, payload: payload });

export const getAllBlogs = () => {
  return async dispatch => {
    const q = await query(collection(db, 'blogs'), orderBy('date'));
    onSnapshot(q, querySnapshot => {
      const payload = [];

      querySnapshot.docs.map(doc => {
        // console.log(doc.id);
        payload.push({ ...doc.data(), id: doc.id });
      });

      // console.log(payload);

      dispatch(getAllBlogsAction(payload));
    });
  };
};

export const createBlog = payload => {
  return async dispatch => {
    // console.log(payload);
    const blogData = await addDoc(collection(db, 'blogs'), {
      content: payload.content,
      date: payload.timestamp,
      email: payload.email,
      imageURL: payload.imageURL,
      title: payload.title,
      likes: [],
      uid: payload.uid
    });
    // console.log(blogData.id);
  };
};

export const deleteBlog = (id, navigate) => {
  return async dispatch => {
    await deleteDoc(doc(db, 'blogs', id));

    navigate('/');
  };
};

export const updateBlog = payload => {
  return async dispatch => {
    const updateData = doc(db, 'blogs', payload.id);

    await updateDoc(updateData, {
      title: payload.title,
      imageURL: payload.imageURL,
      content: payload.content,
      date: payload.timestamp
    });
  };
};

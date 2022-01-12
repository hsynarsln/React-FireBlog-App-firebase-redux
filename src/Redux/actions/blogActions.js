import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../Helpers/firebase';
import { successNote } from '../../Helpers/toastNotify';
import { FETCH_ALL_BLOGS, FETCH_BLOG } from './blogActionTypes';

export const getAllBlogsAction = payload => ({ type: FETCH_ALL_BLOGS, payload: payload });

export const getBlogAction = payload => ({ type: FETCH_BLOG, payload: payload });

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

export const getBlogWithId = id => {
  return async dispatch => {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(getBlogAction({ ...docSnap.data(), id: docSnap.id }));
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
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
    successNote('Blog Added Successfully!');
  };
};

export const deleteBlog = (id, navigate) => {
  return async dispatch => {
    await deleteDoc(doc(db, 'blogs', id));

    navigate('/');
    successNote('Deleted Successfully!');
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

    successNote('Updated Successfully!');
  };
};

export const likeBlog = (id, uid) => {
  return async dispatch => {
    const updateData = doc(db, 'blogs', id);

    await updateDoc(updateData, {
      likes: arrayUnion(uid)
    });

    // console.log(updateData);
  };
};

export const addCommentBlog = values => {
  return async dispatch => {
    const updateData = doc(db, 'blogs', values.id);

    await updateDoc(updateData, {
      comments: arrayUnion({
        createdAt: values.timestamp,
        creator: values.creator,
        text: values.text
      })
    });

    successNote('Your comment added successfully!');
  };
};

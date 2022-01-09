import { FETCH_ALL_BLOGS } from '../actions/blogActionTypes';

const initialState = {
  blogData: []
};

export const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_BLOGS:
      return {
        ...state,
        blogData: payload
      };
    default:
      return state;
  }
};

export default blogReducer;

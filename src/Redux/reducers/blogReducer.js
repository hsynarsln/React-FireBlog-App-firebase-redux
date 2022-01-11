import { FETCH_ALL_BLOGS } from '../actions/blogActionTypes';

const initialState = {
  blogData: []
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BLOGS:
      return {
        ...state,
        blogData: action.payload
      };
    default:
      return state;
  }
};

export default blogReducer;

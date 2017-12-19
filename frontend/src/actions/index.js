import {url, headers, headers2} from '../api/apiConst';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const GET_COMMENT = 'GET_COMMENT';
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT_FROM_POST = 'REMOVE_COMMENT_FROM_POST';


export function getCategoriesSuccess (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getPost ({ postID }) {
  return {
    type: GET_POST,
    postID,
  }
}

export function getAllPostsSuccess (posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export function addPost ({ id, title, body, category, author, timestamp }) {
  return {
    type: ADD_POST,
    id,
    title,
    body,
    category,
    author,
    timestamp,
  }
}

export function removePost ({ postID }) {
  return {
    type: REMOVE_POST,
    postID,
  }
}

export function addComment ({ ParentID, comment }) {
    return {
      type: ADD_COMMENT,
      ParentID,
      comment,
    }
  }
  
  export function removeComentFromPost ({ commentID }) {
    return {
      type: REMOVE_COMMENT_FROM_POST,
      commentID,
    }
  }

export function fetchCategories() {
    return (dispatch) => {
            fetch(`${url}/categories`, { headers })
            .then((response) => response.json())
            .then((data) => dispatch(getCategoriesSuccess(data.categories)));
    };
}

export function fetchAllPosts() {
  return (dispatch) => {
          fetch(`${url}/posts`, { headers })
          .then((response) => response.json())
          .then((posts) => { dispatch(getAllPostsSuccess(posts))});
  };
}

export function putPost(post) {
  return (dispatch) => {
      fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(res => res.json())
  };
}

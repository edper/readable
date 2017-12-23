import {url, headers} from '../api/apiConst';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT_FROM_POST = 'REMOVE_COMMENT_FROM_POST';


export function getCategoriesSuccess (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getSinglePost ( post ) {
  return {
    type: GET_POST,
    post,
  }
}

export function getAllPostsSuccess (posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export function addSinglePost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function removePost ( postID ) {
  return {
    type: REMOVE_POST,
    postID
  }
}

export function savePost ( post ) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function voteUp ( postID ) {
  return {
    type: VOTE_UP,
    postID,
  }
}

export function voteDown ( postID ) {
  return {
    type: VOTE_DOWN,
    postID,
  }
}

export function getPostComments (comments) {
  return {
    type: GET_POST_COMMENTS,
    comments
  }
}

export function addComment ( ParentID, comment ) {
    return {
      type: ADD_COMMENT,
      ParentID,
      comment,
    }
  }
  
export function removeComentFromPost ( commentID ) {
    return {
      type: REMOVE_COMMENT_FROM_POST,
      commentID,
    }
  }

export function fetchCategories() {
    return (dispatch) => {
            fetch(`${url}/categories`, { headers })
            .then((response) => response.json())
            .then((data) => dispatch(getCategoriesSuccess(data.categories)))
            .catch((error)=>{console.log('fetch categories error',error)});            
    };
}

export function getPost(postID) {
  return (dispatch) => {
      fetch(`${url}/posts/${postID}`, { method: 'GET', headers})
      .then((response) => response.json())
      .then((post) => {dispatch(getSinglePost(post))})
      .catch((error)=>{console.log('fetch sigle post error',error)});          
};
}

export function fetchAllPosts() {
  return (dispatch) => {
          fetch(`${url}/posts`, { headers })
          .then((response) => response.json())
          .then((posts) => { dispatch(getAllPostsSuccess(posts))})
          .catch((error)=>{console.log('fetch post error',error)});          
  };
}

export function addPost(post) {
  return (dispatch) => {
      fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(response => response.json())
      .then((post) => { dispatch(addSinglePost(post))})
      .catch((error)=>{console.log('add post error',error)});
    };
}

export function deletePost(postID) {
  return (dispatch) => {
          fetch(`${url}/posts/${postID}`, { method: 'DELETE', headers})
          .then((response) => response.json())
          .then(() =>  dispatch(removePost(postID)))
          .catch((error)=>{console.log('dispatch error',error)});
  };
}

export function votePost(vote, postID) {
  return (dispatch) => {
      fetch(`${url}/posts/${postID}`, {
        method: 'POST',
        headers : {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option:vote})
      }).then(response => response.json())
      .then((post) => { vote==="upVote" ? dispatch(voteUp(postID)) : dispatch(voteDown(postID)) })
      .catch((error)=>{console.log('post voting error',error)});
    };
}

export function updatePost(post) {
  return (dispatch) => {
      fetch(`${url}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(response => response.json())
      .then(() => { dispatch(savePost(post))})
      .catch((error)=>{console.log('update post error',error)});
    };
}


export function fetchPostComments(postID) {
  return (dispatch) => {
        fetch(`${url}/posts/${postID}/comments`, { method: 'GET', headers})
        .then((response) => response.json())
        .then((comments) => { dispatch(getPostComments(comments))})
        .catch((error)=>{console.log('fetch comments error',error)});          
  };
}


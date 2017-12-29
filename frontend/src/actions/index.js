import {url, headers} from '../api/apiConst';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const VOTE_UP_COMMENTS = 'VOTE_UP_COMMENTS';
export const VOTE_DOWN_COMMENTS = 'VOTE_DOWN_COMMENTS';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT_FROM_POST = 'REMOVE_COMMENT_FROM_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';


// action for fetching categories
export function getCategoriesSuccess (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

// action for getting a single Post
export function getSinglePost ( post ) {
  return {
    type: GET_POST,
    post,
  }
}

// action for getting all Posts from the server
export function getAllPostsSuccess (posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

// action for adding a single Post
export function addSinglePost (post) {
  return {
    type: ADD_POST,
    post
  }
}

// action for deleting a Post
export function removePost ( postID ) {
  return {
    type: REMOVE_POST,
    postID
  }
}

// action for saving an updated Post
export function savePost ( post ) {
  return {
    type: UPDATE_POST,
    post
  }
}

// action for voting up a Post
export function voteUp ( postID ) {
  return {
    type: VOTE_UP,
    postID,
  }
}

// action for voting down a Post
export function voteDown ( postID ) {
  return {
    type: VOTE_DOWN,
    postID,
  }
}

// action for voting up a comment
export function voteUpComments ( commentsID ) {
  return {
    type: VOTE_UP_COMMENTS,
    commentsID,
  }
}

// action for voting down a comment
export function voteDownComments ( commentsID ) {
  return {
    type: VOTE_DOWN_COMMENTS,
    commentsID,
  }
}

// action for fetching comments from a post
export function getPostComments (comments) {
  return {
    type: GET_POST_COMMENTS,
    comments
  }
}

// action for adding a comment on a Post
export function addSingleComment ( comment ) {
    return {
      type: ADD_COMMENT,
      comment,
    }
  }

// action for deleting a comment on a Post
export function removeComment ( commentID ) {
    return {
      type: REMOVE_COMMENT_FROM_POST,
      commentID,
    }
  }

// action for updating a comment on a Post
export function saveComment ( comment ) {
    return {
      type: UPDATE_COMMENT,
      comment
    }
  }

// dispatcher for fetching categories
export function fetchCategories() {
    return (dispatch) => {
            fetch(`${url}/categories`, { headers })
            .then((response) => response.json())
            .then((data) => dispatch(getCategoriesSuccess(data.categories)))
            .catch((error)=>{console.log('fetch categories error',error)});            
    };
}

// dispatcher for fetching a single post
export function fetchPost(postID) {
  return (dispatch) => {
      fetch(`${url}/posts/${postID}`, { method: 'GET', headers : {
        ...headers,
        'Content-Type': 'application/json'
      }})
      .then((response) => response.json())
      .then((post) => {dispatch(getSinglePost(post))})
      .catch((error)=>{console.log('fetch sigle post error',error)});          
};
}

// dispatcher for fetching all Posts from the server
export function fetchAllPosts() {
  return (dispatch) => {
          fetch(`${url}/posts`, { headers })
          .then((response) => response.json())
          .then((posts) => { dispatch(getAllPostsSuccess(posts))})
          .catch((error)=>{console.log('fetch post error',error)});          
  };
}

// dispatcher for adding a Post
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

// dispatcher for deleting a Post
export function deletePost(postID) {
  return (dispatch) => {
          fetch(`${url}/posts/${postID}`, { method: 'DELETE', headers})
          .then((response) => response.json())
          .then(() =>  dispatch(removePost(postID)))
          .catch((error)=>{console.log('dispatch error',error)});
  };
}

// dispatcher for voting a Post
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

// dispatcher for updating a Post
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

// dispatcher for fetching Post comments
export function fetchPostComments(postID) {
  return (dispatch) => {
        fetch(`${url}/posts/${postID}/comments`, { method: 'GET', headers})
        .then((response) => response.json())
        .then((comments) => { dispatch(getPostComments(comments))})
        .catch((error)=>{console.log('fetch comments error',error)});          
  };
}

// dispatcher for voting a comment
export function voteComments(vote, commentsID) {
  return (dispatch) => {
      fetch(`${url}/comments/${commentsID}`, {
        method: 'POST',
        headers : {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option:vote})
      }).then(response => response.json())
      .then((comment) => { vote==="upVote" ? dispatch(voteUpComments(commentsID)) : dispatch(voteDownComments(commentsID)) })
      .catch((error)=>{console.log('comment voting error',error)});
    };
}

// dispatcher for adding a comment
export function addComment(comment) {
  return (dispatch) => {
      fetch(`${url}/comments`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(response => response.json())
      .then((comment) => { dispatch(addSingleComment(comment))})
      .catch((error)=>{console.log('add post error',error)});
    };
}

// dispatcher for deleting a comment
export function deleteComment(commentID) {
  return (dispatch) => {
          fetch(`${url}/comments/${commentID}`, { method: 'DELETE', headers})
          .then((response) => response.json())
          .then(() =>  dispatch(removeComment(commentID)))
          .catch((error)=>{console.log('delete comment error',error)});
  };
}

// dispatcher for updating a comment
export function updateComment(comment) {
  return (dispatch) => {
      fetch(`${url}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(response => response.json())
      .then(() => { dispatch(saveComment(comment))})
      .catch((error)=>{console.log('update comment error',error)});
    };
}


import { combineReducers } from 'redux'

// Get constants for reducer to use
import {
  GET_CATEGORIES,
  GET_ALL_POSTS,
  GET_POST,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  VOTE_UP,
  VOTE_DOWN,
  VOTE_UP_COMMENTS,
  VOTE_DOWN_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT_FROM_POST,
  GET_POST_COMMENTS,
  UPDATE_COMMENT
} from '../actions' 

// Reducer regarding Post
function posts (state = {}, action) {
    switch (action.type) {
      case GET_ALL_POSTS:
        return action.posts;
      case GET_POST:
        return action.post;
      case ADD_POST:
        return [...state, action.post];
      case REMOVE_POST:
        return [
                  ...state.filter((post)=>post.id!==action.postID)                  
               ];
      case UPDATE_POST:
        return [ ...state.map(post=>{
                   if (post.id!==action.post.id) {
                      return post;}
                   return {
                    ...post, title: action.post.title, body: action.post.body};
                }) ];
      case VOTE_UP:
          return [
            ...state.map((post)=> post.id===action.postID ? (( post.voteScore!==0 ? post.voteScore++ : (post.voteScore=1)) && post) : post )
          ];
      case VOTE_DOWN:
        return [
          ...state.map((post)=> post.id===action.postID ? (( post.voteScore!==0 ? post.voteScore-- : (post.voteScore=-1)) && post) : post )
        ];
  default:
        return state
    }
}

// Reducer regarding comments of a Post
function comments (state = {}, action) {
    switch (action.type) {
      case GET_POST_COMMENTS:
          return action.comments;
      case ADD_COMMENT:
          return [...state, action.comment];
      case VOTE_UP_COMMENTS:
          return [
            ...state.map((comment)=> comment.id===action.commentsID ? (( comment.voteScore!==0 ? comment.voteScore++ : (comment.voteScore=1)) && comment) : comment )
          ];
      case VOTE_DOWN_COMMENTS:
        return [
          ...state.map((comment)=> comment.id===action.commentsID ? (( comment.voteScore!==0 ? comment.voteScore-- : (comment.voteScore=-1)) && comment) : comment )
        ];
      case REMOVE_COMMENT_FROM_POST:
        return [
                  ...state.filter((comment)=>comment.id!==action.commentID)                  
              ];
      case UPDATE_COMMENT:
        return [ ...state.map(comment=>{
                  if (comment.id!==action.comment.id) {
                    return comment;}
                  return {
                  ...comment, timestamp: action.comment.timestamp, body: action.comment.body};
              }) ];      
      default :
          return state
    }
}

// Reducer regarding Categories
function categories (state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
        return action.categories;    
    default :
      return state
  }
}

export default combineReducers({
    posts,
    comments,
    categories
  })
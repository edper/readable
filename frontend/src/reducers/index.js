import { combineReducers } from 'redux'

// Get constants for reducer to use
import * as type from '../actions'


// Reducer regarding Post
function posts (state = {}, action) {
    switch (action.type) {
      case type.GET_ALL_POSTS:
        return action.posts;
      case type.GET_POST:
        return action.post;
      case type.ADD_POST:
        return [...state, action.post];
      case type.REMOVE_POST:
        return [
                  ...state.filter((post)=>post.id!==action.postID)                  
               ];
      case type.UPDATE_POST:
        return [ ...state.map(post=>{
                   if (post.id!==action.post.id) {
                      return post;}
                   return {
                    ...post, title: action.post.title, body: action.post.body};
                }) ];
      case type.VOTE_UP:
          return [
            ...state.map((post)=> post.id===action.postID ? (( post.voteScore!==0 ? post.voteScore++ : (post.voteScore=1)) && post) : post )
          ];
      case type.VOTE_DOWN:
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
      case type.GET_POST_COMMENTS:
          return action.comments;
      case type.ADD_COMMENT:
          return [...state, action.comment];
      case type.VOTE_UP_COMMENTS:
          return [
            ...state.map((comment)=> comment.id===action.commentsID ? (( comment.voteScore!==0 ? comment.voteScore++ : (comment.voteScore=1)) && comment) : comment )
          ];
      case type.VOTE_DOWN_COMMENTS:
        return [
          ...state.map((comment)=> comment.id===action.commentsID ? (( comment.voteScore!==0 ? comment.voteScore-- : (comment.voteScore=-1)) && comment) : comment )
        ];
      case type.REMOVE_COMMENT_FROM_POST:
        return [
                  ...state.filter((comment)=>comment.id!==action.commentID)                  
              ];
      case type.UPDATE_COMMENT:
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
    case type.GET_CATEGORIES:
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
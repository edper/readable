import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_ALL_POSTS,
  GET_POST,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  VOTE_UP,
  VOTE_DOWN,
  GET_POST_COMMENTS
} from '../actions' 

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

function comments (state = {}, action) {
    switch (action.type) {
      case GET_POST_COMMENTS:
          return action.comments;
      default :
          return state
    }
}

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
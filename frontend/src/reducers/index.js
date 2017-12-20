import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_ALL_POSTS,
  ADD_POST,
  REMOVE_POST,
} from '../actions'

function posts (state = {}, action) {
    switch (action.type) {
      case GET_ALL_POSTS:
        return action.posts;
      case ADD_POST:
        return [...state, action.post];
      case REMOVE_POST:
        return [
                  ...state.filter((post)=>post.id!==action.postID)                  
               ];      
      default:
        return state
    }
}

function comments (state = {}, action) {
    switch (action.type) {
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
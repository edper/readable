import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POST,
  GET_ALL_POSTS,
  ADD_POST,
  REMOVE_POST,
  GET_COMMENT,
  GET_ALL_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT_FROM_POST,
} from '../actions'

function posts (state = {}, action) {
    switch (action.type) {
      case GET_ALL_POSTS:
        return action.posts;
      case ADD_POST:
        return action.posts.concat(action.post)
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
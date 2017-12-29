import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Main from './Main';
import '../App.css';
import {  fetchCategories, fetchAllPosts, addPost, 
  deletePost, votePost, updatePost, fetchPost, fetchPostComments, 
  voteComments, addComment, deleteComment, updateComment} from '../actions'

class App extends Component {

  componentDidMount(){
    this.props.getCategories();
    this.setState({ posts : this.props.getAllPosts() });
  }

  render() {
    
    // Props for passing to child components
    const {savePost, removePost, votedPost, updatePost, fetchPost, 
          getAllComments, votedComments, comments, saveComment, removeComment, updateComment } = this.props;

    return (
      <div className="row">
          <Router>
            <Route path="/" render={()=>(
              <div>
                {/* Sidebar Menu Component */}
                <SideBar categories={this.props.categories}/>
                {/* Main content Component on the right of Sidebar menu */}
                <Main posts={this.props.posts} savePost={savePost} removePost={removePost} 
                    votedPost={votedPost} updatePost={updatePost} fetchPost={fetchPost} 
                    getAllComments={getAllComments} votedComments = {votedComments} comments={comments} 
                    saveComment={saveComment} removeComment={removeComment} updateComment={updateComment}/>
              </div>
            )}/>
          </Router>
      </div>
    );
  }
}

// Mapping posts, comments and categories states to props 
function mapStateToProps ({posts, comments, categories}) {  
  return {
    posts: posts,
    comments: comments,
    categories: categories,
  }
}

// Mapping action dispatchers from actions to props
function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(fetchAllPosts()),
    fetchPost: (postID) => dispatch(fetchPost(postID)),
    getAllComments: (postID) => dispatch(fetchPostComments(postID)),
    votedComments: (vote, commentsID) => dispatch(voteComments(vote, commentsID)),
    saveComment: (comment) => dispatch(addComment(comment)),
    removeComment: (commentID) => dispatch(deleteComment(commentID)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    getCategories: () => dispatch(fetchCategories()),
    savePost: (post) => dispatch(addPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
    removePost: (postID) => dispatch(deletePost(postID)),
    votedPost: (vote, postID) => dispatch(votePost(vote, postID)),
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
  
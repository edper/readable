import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Main from './Main';
import '../App.css';
import {  fetchCategories, fetchAllPosts, addPost, 
  deletePost, votePost, updatePost, getPost} from '../actions'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount(){
    this.props.getCategories();
    this.setState({ posts : this.props.getAllPosts() });
  }

  render() {
    
    const {savePost, removePost, votedPost, updatePost, getPost } = this.props;

    return (
      <div className="row">
          <Router>
            <Route path="/" render={()=>(
              <div>
                <SideBar categories={this.props.categories}/>
                <Main posts={this.props.posts} savePost={savePost} removePost={removePost} votedPost={votedPost} updatePost={updatePost} getPost={getPost}/>
              </div>
            )}/>
          </Router>
      </div>
    );
  }
}

function mapStateToProps ({posts, categories}) {  
  return {
    posts: posts,
    categories: categories,
  }
}
  
function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(fetchAllPosts()),
    getPost: (postID) => dispatch(getPost(postID)),
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
  
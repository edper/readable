import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Main from './Main';
import '../App.css';
import {  fetchCategories, fetchAllPosts, addPost, deletePost
} from '../actions'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount(){
    this.props.getCategories();
    this.setState({ posts : this.props.getAllPosts() });
  }

  render() {
    
    const {savePost, removePost} = this.props;

    return (
      <div className="row">
          <Router>
            <Route path="/" render={()=>(
              <div>
                <SideBar categories={this.props.categories}/>
                <Main savePost={savePost} removePost={removePost} posts={this.props.posts}/>
              </div>
            )}/>
          </Router>
      </div>
    );
  }
}

function mapStateToProps ({posts, comments, categories}) {  
  return {
    posts: posts,
    comments: comments,
    categories: categories,
  }
}
  
function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(fetchAllPosts()),
    getCategories: () => dispatch(fetchCategories()),
    savePost: (post) => dispatch(addPost(post)),
    removePost: (postID) => dispatch(deletePost(postID))
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
  
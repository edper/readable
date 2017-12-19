import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Main from './Main';
import '../App.css';
import { getCategoriesSuccess, getPost, getAllPosts, 
  addPost, removePost, addComment, 
  removeComentFromPost, fetchCategories, fetchAllPosts, putPost
} from '../actions'

class App extends Component {

componentDidMount(){
    this.props.getCategories();
    this.setState({ posts : this.props.getAllPosts() });
  }

  render() {
    return (
      <div className="row">
          <Router>
            <Route path="/" render={()=>(
              <div>
                <SideBar categories={this.props.categories} />
                <Main posts={this.props.posts} comments={this.props.comments}/>
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
    savePost: () => dispatch(putPost()),
    getAllPosts: () => dispatch(fetchAllPosts()),
    getCategories: () => dispatch(fetchCategories())
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
  
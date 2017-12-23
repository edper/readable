import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ReadableList from './ReadableList';
//import FormAddPost from './FormAddPost';
//import FormEditPost from './FormEditPost';
import FormViewPostComments from './FormViewPostComments';
import PropTypes from 'prop-types'


class Main extends Component {
        
    state = {
        viewPost:[],
        isEditing: false,
    };

    static propTypes = {
        savePost: PropTypes.func.isRequired,
        removePost: PropTypes.func.isRequired,
        votedPost: PropTypes.func.isRequired,
        updatePost: PropTypes.func.isRequired,
        getPost: PropTypes.func.isRequired,
    };

    getViewPost = (viewPostID) => {
        //console.log("View "+this.props.getPost(viewPostID).title);
        console.log("Post ID", viewPostID);
        const onePost = this.props.getPost(viewPostID);
        this.setState({viewPost:onePost});
    }

    setEdit = (flag) => {
        this.setState({isEditing:flag});
    }

    
    render() {

        const { posts, savePost, removePost, votedPost, updatePost } = this.props;
        
        return(
            <div className="App-col-all">
                <div className="col s9">
                    <nav className="remover">
                        <div className="nav-wrapper indigo darken-4">
                            <a href="" className="brand-logo center">Readable</a>
                        </div>
                    </nav>
                    {!this.state.isEditing  && (
                        <div className="float-button row">
                            <strong className="sortByFont">Sort by:</strong> <a className='dropdown-button btn deep-purple' href='' data-activates='sortBy'>Popularity</a>
                            <ul id='sortBy' className='dropdown-content'>
                                <li>Popularity</li>
                                <li>Date</li>
                            </ul>
                        </div>
                    )}
                    <div className="row">
                        <Route key="root" exact path="/" render={()=>(
                            <ReadableList posts={posts} removePost={removePost} votedPost={votedPost} savePost={savePost} updatePost={updatePost} getViewPost={this.getViewPost} editFlag={this.state.isEditing}/>                        
                        )}/>
                        <Route key="withCategory" path='/:categoryId' render={({match})=>(
                            <ReadableList categoryId={match.params.categoryId} posts={posts} removePost={removePost} votedPost={votedPost} savePost={savePost} updatePost={updatePost}  getViewPost={this.getViewPost} editFlag={this.state.isEditing}/>
                        )}/>
                        <Route key="messages" path='/messages/:postID' render={({match})=>(
                            <FormViewPostComments viewPost={this.state.viewPost} setEditFlag={this.setEdit}/>
                        )}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
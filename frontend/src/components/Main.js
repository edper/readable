import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ReadableList from './ReadableList';
import FormViewPostComments from './FormViewPostComments';
import PropTypes from 'prop-types';

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
        fetchPost: PropTypes.func.isRequired,
        getAllComments: PropTypes.func.isRequired,
        votedComments: PropTypes.func.isRequired,
        saveComment: PropTypes.func.isRequired, 
        removeComment: PropTypes.func.isRequired, 
        updateComment: PropTypes.func.isRequired,
    };

    // Edit flag toggler so that buttons will not show up when editing 
    // or will show up when not editing
    setEdit = (flag) => {
        this.setState(()=>({isEditing:flag}));
    }

    componentDidMount() {
        this.setState(()=>({isEditing:false}));        
    }
    
    render() {

        const { posts, savePost, removePost, votedPost, updatePost, fetchPost, 
                getAllComments, votedComments, comments, saveComment, removeComment, updateComment } = this.props;
        

        return(
            <div className="App-col-all">
                <div className="col s9">
                    <nav className="remover">
                        <div className="nav-wrapper indigo darken-4">
                            <a href="" className="brand-logo center">Readable</a>
                        </div>
                    </nav>
                    <div className="row">
                        <Switch>
                            <Route key="root" exact path="/" render={()=>(
                                <ReadableList posts={posts} removePost={removePost} votedPost={votedPost} savePost={savePost} updatePost={updatePost}  
                                    editFlag={this.state.isEditing} setEditFlag={this.setEdit} getAllComments={getAllComments}/>                        
                            )}/>
                            <Route key="viewComments" path='/comments/:postID' render={({match})=>(
                                <FormViewPostComments postID={match.params.postID} fetchPost={fetchPost} posts={posts} 
                                    getAllComments={getAllComments} votedComments = {votedComments} comments={comments} setEditFlag={this.setEdit} 
                                    saveComment={saveComment} removeComment={removeComment} updateComment={updateComment}/>
                            )}/>
                            <Route key="withCategory" path='/:categoryId' render={({match})=>(
                                <ReadableList categoryId={match.params.categoryId} posts={posts} removePost={removePost} votedPost={votedPost} savePost={savePost} updatePost={updatePost} 
                                    editFlag={this.state.isEditing} setEditFlag={this.setEdit} getAllComments={getAllComments}/>
                            )}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
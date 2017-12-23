import React, {Component} from 'react';
import PostInfo from './PostInfo';
import FormAddPost from './FormAddPost';
import FormEditPost from './FormEditPost';


class ReadableList extends Component {

    state = {
        postdata:[],
    };

    passPost = (forEditPost) => {
        this.setState({postdata:forEditPost});
    }


    render() {

        const showPosts  = this.props.posts;
        const savePost = this.props.savePost;
        const categoryId = this.props.categoryId;
        const removePost = this.props.removePost;
        const votedPost = this.props.votedPost;
        const updatePost = this.props.updatePost;
        const getViewPost = this.props.getViewPost;
        const editFlag = this.props.editFlag;
        
                
        return(
            <div>
                <div className="row readable-list">
                    {
                        typeof categoryId === 'undefined' ?
                        showPosts.length > 0 && 
                            showPosts.map((post)=> (
                                    <PostInfo key={post.id} post={post} passPost={this.passPost} removePost={removePost} votedPost={votedPost} getViewPost={getViewPost}/>
                                )
                            ) : 
                        showPosts.length > 0 && 
                        showPosts.map((post)=> (
                                post.category===categoryId &&
                                <PostInfo key={post.id} post={post} passPost={this.passPost} removePost={removePost} votedPost={votedPost} getViewPost={getViewPost}/>
                            )
                        ) 
                    
                    }
                    <div>
                        <FormAddPost savePost={savePost}/>
                    </div>
                    <div>
                        <FormEditPost post={this.state.postdata} updatePost={updatePost}/>
                    </div>
                    {!editFlag && ( 
                        <footer className="add-button">
                            <a className="btn btn-floating btn-large modal-trigger deep-purple" href="#add-post" onClick={this.clearState}><i className="material-icons">add</i></a>
                        </footer>
                    )}
                </div>
            </div>
        )
    }

}

export default ReadableList;
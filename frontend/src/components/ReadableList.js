import React, {Component} from 'react';
import PostInfo from './PostInfo';
import FormAddPost from './FormAddPost';
import FormEditPost from './FormEditPost';
import sortBy from 'sort-by'


class ReadableList extends Component {

    // state for post to show and sort Order
    state = {
        postdata:[],
        sortOrder:'-voteScore'
    };

    // Event handler for sorting Posts
    handleSortChange = (e) => {
        e.preventDefault();
        let dropSort = document.getElementById("dropSort");
        dropSort.innerHTML = e.target.id === "timestamp" ? "Date" : "Popularity";
        this.setState({sortOrder:e.target.id});
    }

    // Call back for Post to edit
    passPost = (forEditPost) => {
        this.setState({postdata:forEditPost});
    }

    // Get all comments for each post
    getAllComments = (id) => {
        this.props.getAllComments(id);        
    }
    
    
    render() {
        let showPosts  = this.props.posts;
        const savePost = this.props.savePost;
        const categoryId = this.props.categoryId;
        const removePost = this.props.removePost;
        const votedPost = this.props.votedPost;
        const updatePost = this.props.updatePost;
        const editFlag = this.props.editFlag;
        const getAllComments = this.props.getAllComments;
        const setEditFlag = this.props.setEditFlag;

        showPosts.length && showPosts.sort(sortBy(this.state.sortOrder));
                
        return(
            <div>
                {!editFlag  && (
                        <div className="float-button row">
                            <strong className="sortByFont">Sort by: </strong> 
                            <a className='dropdown-button btn deep-purple' href='' data-activates='sortBy' id="dropSort" style={{width:'150px'}}>Popularity</a>
                            <ul id='sortBy' className='dropdown-content'>
                                <li onClick={this.handleSortChange} id="-voteScore">Popularity</li>
                                <li onClick={this.handleSortChange} id="timestamp">Date</li>
                            </ul>
                        </div>
                 )}

                <div className="row readable-list">
                    {
                        typeof categoryId === 'undefined' ?
                        showPosts.length > 0 && 
                            showPosts.map((post)=> (
                                    <PostInfo key={post.id} post={post} passPost={this.passPost} removePost={removePost} votedPost={votedPost} getAllComments={getAllComments} setEditFlag={setEditFlag}/>
                                )
                            ) : 
                        showPosts.length > 0 && 
                        showPosts.map((post)=> (
                                post.category===categoryId &&
                                <PostInfo key={post.id} post={post} passPost={this.passPost} removePost={removePost} votedPost={votedPost} getAllComments={getAllComments} setEditFlag={setEditFlag}/>
                            )
                        ) 
                    
                    }
                    <div>
                        <FormAddPost savePost={savePost}/>
                    </div>
                    <div>
                        <FormEditPost post={this.state.postdata} updatePost={updatePost} setEditFlag={setEditFlag}/>
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
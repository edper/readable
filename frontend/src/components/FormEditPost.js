import React, {Component} from 'react';

class FormEditPost extends Component {

    // state detail needed when editing a Post
    state = {
        editTitle:'',
        editBody:''
    };
        
    // Event handler when user make changes on a post
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    // Event handler when user save his/her changes of the post
    handleSubmitEdit = (e) => {
        e.preventDefault();
        const post = this.props.post;
        if (post.title !== this.state.editTitle || post.body !== this.state.editBody)
            {
                // Save edits to a post
                post.title = this.state.editTitle === '' ? post.title : this.state.editTitle;
                post.body = this.state.editBody === '' ? post.body : this.state.editBody;
                this.props.updatePost(post);   
                // Reset state so values will not stick 
                this.resetState();           
            }
    }

    // Reset state so that state will refresh everytime this component is called
    resetState() {
        this.setState(()=>({editTitle:'', editBody:''}));
    }

    // set edit flag so that buttons (i.e. sorting and adding) will not show up
    componentWillMount() {
        this.props.setEditFlag(true);
    }

    // set edit flag to false after editing a Post
    componentWillUnmount() {
        this.props.setEditFlag(false);
    }

    render() {

        const post = this.props.post;
        
        return (
            <div>
                <div id="edit-post" className="modal modal-fixed-footer">   
                        <form onSubmit={this.handleSubmitEdit}>
                            <div className="modal-content">
                                <span className="modal-action modal-close right"><i className="material-icons">close</i></span>
                                <h4>Editing Post</h4>
                                <div className="input-field row">
                                    <span className="edit-font">Title</span><input name="editTitle" type="text" value={this.state.editTitle==='' ? this.props.post.title : this.state.editTitle} required aria-required="true" ref={input=>this.editTitle=input} onChange={this.handleInputChange}/>
                                </div>
                                <div className="input-field row">
                                    <span className="edit-font">Body</span><textarea name="editBody" className="materialize-textarea" value={this.state.editBody==='' ? this.props.post.body : this.state.editBody} required aria-required="true" ref={input=>this.editBody=input} onChange={this.handleInputChange}></textarea>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <span className="edit-font">Author</span><input name="editAuthor" type="text" value={post.author} disabled/>
                                    </div>
                                    <div className="input-field col s6">
                                        <span className="edit-font">Category</span><input name="editCategory" type="text" value={post.category} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn waves-effect waves-light deep-purple modal-action modal-close" type="submit" name="action">Submit</button>
                            </div>
                        </form>          
                    </div>
            </div>
        )
    }
}

export default FormEditPost;
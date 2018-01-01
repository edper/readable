import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormViewPostComments extends Component {

    state = {
        editPost: [],
        post:[],
        postID:'',
        comment:'',
        editTitle:'',
        editBody:'',
        origTitle:'',
        origBody:'',
        postLoaded: false,
        isEditing:false,
    }

    static propTypes = {
        fetchPost: PropTypes.func.isRequired,
        getAllComments: PropTypes.func.isRequired,
    };

    // Event handler for deleting a post
    handleDeletePost = (e) => {
        e.preventDefault();
        this.props.setEditFlag(false);
        window.location.href="/";
        this.props.removePost(this.props.post_id);
    }

    // Event handler for voting a post
    handleVotePost = (e) => {
        e.preventDefault();
        this.props.votedPost(e.target.id, this.props.post_id);
    }

    // Event handler for editing a post
    handleEditPost = (e) => {
        e.preventDefault();
        document.getElementById("editTitle").focus();
        this.setState(()=>({isEditing:true}));
    }


    // Event handler for editing a post
    handleUpdatePost = (e) => {
        e.preventDefault();
        let post = this.state.post;
        if (e.target.id === "Update") {
           if (this.state.editTitle!==''|| this.state.editBody!=='') {
              post.title = this.state.editTitle !== '' ? this.state.editTitle : post.title ;
              post.body = this.state.editBody  !== '' ? this.state.editBody : post.body ;
              this.props.updatePost(post);
           }
        }
        else {
            let title = document.getElementById("editTitle");
            let body = document.getElementById("editBody");
            title.value = post.title;
            body.value = post.body;
        }
        this.setState(()=>({isEditing:false}));
    }
    
    // Event handler for current post text change
    handleEditPostChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }


    // Event handler for adding comment text change
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(()=>({
          comment: value
        }));
    }

    // Event handler for editing comment text change
    handleEditChange = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(()=>({
          editBody: value
        }));
    }

    // Event handler when user adds a comment
    handleSubmitComment = (e) => {
        e.preventDefault();
        if (this.state.comment !== '') {
            // Prepare the comment object
            const commentBody = this.state.comment;
            let postComment = { 
                id: window.getUUID(),
                timestamp:Date.now(),
                body: commentBody,
                author:'thingone',
                parentId: this.parentId.value,
            };
            // Save the comment object
            this.props.saveComment(postComment);
            // Clear add comment box
            let textAddComment = document.getElementById("addCommentText");
            textAddComment.value = "";
        }
    }

    // Event handler for Voting a comment
    handleVoteComments = (e) => {
        e.preventDefault();
        this.props.votedComments(e.target.id, e.target.parentNode.id);
    }

    // Event handler for deleting a comment
    handleDeleteComment = (e) => {
        e.preventDefault();
        this.props.removeComment(e.target.parentNode.id.substr(1));
    }

    // Event handler for showing and hiding an element during editing a comment
    showHideElem = (e, disp) => {
        const divID = "c"+e.target.parentNode.id.substr(1);
        const textID = "t"+e.target.parentNode.id.substr(1);
        const authID = "a"+e.target.parentNode.id.substr(1);
        const editID = "e"+e.target.parentNode.id.substr(1);
        const delID = "d"+e.target.parentNode.id.substr(1);
        const chkID = "k"+e.target.parentNode.id.substr(1);
        const cleID = "r"+e.target.parentNode.id.substr(1);
        let divElem = document.getElementById(divID);
        let textElem = document.getElementById(textID);
        let authElem = document.getElementById(authID);
        let editElem = document.getElementById(editID);
        let delElem = document.getElementById(delID);
        let chkElem = document.getElementById(chkID);
        let cleElem = document.getElementById(cleID);
        
        divElem.style.display = disp;
        authElem.style.display = disp;
        editElem.style.display = disp;
        delElem.style.display = disp;
        if (disp==="none") {
            textElem.style.display = "block";
            chkElem.style.display = "block";
            cleElem.style.display = "block"
            textElem.focus();    
        }
        else
        {
            textElem.style.display = "none";      
            chkElem.style.display = "none";
            cleElem.style.display = "none"
        }
         
    }

    // Event handler for updating an existing comment
    handleUpdateComment = (e) => {
        e.preventDefault();
        const forEditCommentID = "c"+e.target.parentNode.id.substr(1);
        const forEditComment = document.getElementById(forEditCommentID).innerHTML;
        this.setState(()=>({editBody:forEditComment}));
        this.showHideElem(e, "none");
    }

    // Event handler for showing the Accept or Cancel button during editing a comment
    handleShowButton = (e) => {
        e.preventDefault();
        const chkId = "k"+e.target.id.substr(1);
        const clId = "r"+e.target.id.substr(1);
        let elemChk = document.getElementById(chkId).childNodes[0];
        elemChk.style.display="block";
        let elemCl = document.getElementById(clId).childNodes[0];
        elemCl.style.display="block";
    }

    // Event handler when user cancel the editing of a comment
    handleCancelEditComment = (e) => {
        e.preventDefault();
        this.showHideElem(e, "block");
    }

    // Event handler for updating a comment after edit
    handleSaveEditComment = (e) => {
        e.preventDefault();
        const editedBody = this.state.editBody;
        const commentID = e.target.parentNode.id.substr(1);
        let editedComment = { 
             id: commentID,
             timestamp:Date.now(),
             body: editedBody,
             author:'thingone',
             parentId: this.parentId.value,
         };
        this.props.updateComment(editedComment);
        this.showHideElem(e, "block");
    }

    componentDidMount() {
        this.props.getAllComments(this.props.post_id);
        this.props.setEditFlag(true);
    }

    componentWillUnmount() {
       this.props.setEditFlag(false);        
    }

    // Script for getting the UUID
    componentWillMount() {
        const script = document.createElement("script");
        const realScript = `function getUUID() { 
            return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36)); }`;
        const scriptText = document.createTextNode(realScript);
        script.appendChild(scriptText);
        document.head.appendChild(script);

        // Mount JQuery script
        const scriptJQ = document.createElement("script");
        scriptJQ.src = "https://code.jquery.com/jquery-3.2.1.min.js";
        scriptJQ.async = true;
        document.body.appendChild(scriptJQ);

        // Mount Materialize script
        const scriptMaterialize = document.createElement("script");
        scriptMaterialize.src = "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js";
        scriptMaterialize.async = true;
        document.body.appendChild(scriptMaterialize);    
        
        // Mount Readable script
        const scriptReadable = document.createElement("script");
        scriptReadable.src = "../js/readable.js";
        scriptReadable.async = true;
        document.body.appendChild(scriptReadable);
        
    }

    componentDidUpdate() {
        if (typeof this.props.posts.length !== 'undefined' && !this.state.postLoaded) {
            const forEditPost = this.props.posts.filter((post)=>post.id===this.props.post_id);
            if (forEditPost.length>0)
            {
                const title = forEditPost[0].title;
                const body = forEditPost[0].body;
                this.setState({editPost:forEditPost});  
                this.setState({post:forEditPost[0]});  
                this.setState({origTitle:title});   
                this.setState({origBody:body});   
                this.setState({postLoaded:true});                    
            }
        }
    }

    

    render() {

        const comments = this.props.comments;

        return (
            <div>
                { typeof this.props.posts.length !== 'undefined' && ( this.props.posts.map((post)=>post.id===this.props.post_id &&
                    <div id="view-post" style={{paddingTop:'70px'}} key={post.id}>   
                        {/* Post Detail view section */}
                        <div className="row">
                            <div className="col s1 offset-s11">
                                <a className="tooltip2 modal-trigger" href="#edit-post" onClick={this.handleEditPost}><span className="tooltiptext">Edit post</span><i className="material-icons">edit</i></a>
                                <a className="tooltip2" href="" onClick={this.handleDeletePost}><span className="tooltiptext">Delete post</span><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                        <div className="float-date">Date: {new Date(post.timestamp).toDateString()}</div>
                        
                        <span className="edit-font">Title</span><input type="text" id="editTitle" name="editTitle" className="materialize-textarea" value={this.state.postLoaded ? this.state.editPost.title : post.title} required={this.state.isEditing} disabled={!this.state.isEditing} onChange={this.state.isEditing ? this.handleEditPostChange : ""}/>
                        <span className="edit-font">Body</span><textarea id="editBody" name="editBody" className="materialize-textarea" value={this.state.postLoaded ? this.state.editPost.body : post.body} required={this.state.isEditing} disabled={!this.state.isEditing} onChange={this.state.isEditing ? this.handleEditPostChange : ""}></textarea>


                        <div className="row" style={{marginLeft:'-10px'}}>
                            <div className="col s12">
                                <span className="edit-font">By : </span> {post.author}
                                <span className="right" style={{fontWeight:'bold'}}>{post.voteScore}</span><span className="edit-font right">Post Vote(s) : </span> 
                            </div>
                            <div className="col s2 offset-s10" style={{paddingTop:'10px'}}>
                                <a className="tooltip2" data-position="bottom" href="" onClick={this.handleVotePost}><span className="tooltiptext">Vote up</span><i className="material-icons" id="upVote" style={{paddingRight:'3px', paddingLeft:'40px'}}>thumb_up</i></a>
                                <a className="tooltip2" data-position="bottom" href="" onClick={this.handleVotePost}><span className="tooltiptext">Vote down</span><i className="material-icons" id="downVote">thumb_down</i></a>
                            </div>
                        </div>
                        {
                            !this.state.isEditing ?
                            (
                                <div>
                                    <div className="row" style={{color:'blue', fontWeight:'bold', paddingTop:'20px'}}><span>Comments ({comments.length})</span></div>
                                    <form onSubmit={this.handleSubmitComment} id="viewComments">
                                        {/* Comment section for a post */}
                                        <div className="row s12">
                                            <div className="row s9">
                                                <textarea placeholder="Add your comments here" name="addComment" id="addCommentText" className="validate" required aria-required="true" onChange={this.handleInputChange}></textarea>
                                            </div>
                                            <div className="row s3 right">
                                                <a href="" onClick={this.handleSubmitComment}><span className="button-add">+Add Comment</span></a>
                                            </div>
                                            {
                                                typeof comments.length !== 'undefined' && comments.map((comment)=>(
                                                    <div key={comment.id} className="comment-box col s12">
                                                            <div className="col s1" style={{marginTop:'-5px'}}>
                                                                <div><a href="" onClick={this.handleVoteComments} id={comment.id}><i className="material-icons" id="upVote" style={{paddingTop:'-4px', fontSize:'2.5em'}}>arrow_drop_up</i></a></div>
                                                                <div><span style={{paddingLeft:'14px', marginTop:'-10px', fontWeight:'bold'}}>{comment.voteScore}</span></div>
                                                                <div><a href="" onClick={this.handleVoteComments} id={comment.id}><i className="material-icons" id="downVote" style={{paddingBottom:'4px', fontSize:'2.5em'}}>arrow_drop_down</i></a></div>
                                                            </div>
                                                            <div className="col s9" style={{paddingTop:'15px'}}>
                                                                <div id={"c"+comment.id} style={{width:'100%', display:'block'}}>{comment.body}</div>
                                                                <div><textarea onFocus={this.handleShowButton} onChange={this.handleEditChange} value={this.state.editBody} id={"t"+comment.id} className="validate" required aria-required="true" style={{display:'none'}} placeholder="Add your comments now"></textarea></div>
                                                                <br/>
                                                                <span id={"a"+comment.id} >By: <em>{comment.author}</em>&nbsp;&nbsp; Date : <em>{new Date(comment.timestamp).toLocaleString()}</em></span>
                                                            </div>
                                                            <div className="col s2" style={{paddingTop:'15px'}}>
                                                                <div className="right"><a className="tooltip2" href="" onClick={this.handleDeleteComment} id={"d"+comment.id}><span className="tooltiptext">Delete comment</span><i className="material-icons">delete</i></a></div>
                                                                <div className="right"><a className="tooltip2" href="" onClick={this.handleUpdateComment} id={"e"+comment.id}><span className="tooltiptext">Edit comment</span><i className="material-icons">edit</i></a></div>
                                                                <div><a href="" onClick={this.handleSaveEditComment} id={"k"+comment.id}><i className="material-icons" style={{float:'left', display:'none'}}>check</i></a></div>
                                                                <div><a href="" onClick={this.handleCancelEditComment} id={"r"+comment.id}><i className="material-icons" style={{float:'left', display:'none'}}>clear</i></a></div>
                                                            </div>
                                                    </div>    
                                                ))
                                            }
                                            </div>
                                        </form>  
                                </div>
                
                            ) :
                            (
                                <div>
                                    <div className="row s3 center">
                                        <a href="" onClick={this.handleUpdatePost}><span className="button-edit" id="Update">Update Post</span></a>&nbsp;&nbsp;
                                        <a href="" onClick={this.handleUpdatePost}><span className="button-edit" id="Cancel">Cancel Post</span></a>
                                    </div>
                                </div>
                            )
                        }
                        <div><input type="text" name="parentId" style={{display:'none'}} ref={input => this.parentId = input} value={post.id}/></div>
                    </div>
                ))}
            </div>
        )
    }
}

    
export default FormViewPostComments;
    

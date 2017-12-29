import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormViewPostComments extends Component {

    state = {
        post: [],
        comment:'',
        editBody:'',
    }

    static propTypes = {
        fetchPost: PropTypes.func.isRequired,
        getAllComments: PropTypes.func.isRequired,
    };


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
        this.props.getAllComments(this.props.postID);
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
    }


    render() {

        const comments = this.props.comments;

        return (
            <div>
                { typeof this.props.posts.length !== 'undefined' && ( this.props.posts.map((post)=>post.id===this.props.postID &&
                    <div id="view-post" style={{paddingTop:'70px'}} key={post.id}>   
                        <form onSubmit={this.handleSubmitComment} id="viewComments">
                            <div>
                                {/* Post Detail view section */}
                                <div className="float-date">Date: {new Date(post.timestamp).toDateString()}</div>
                                <div className="row">
                                    <span className="edit-font">Title</span><input name="viewTitle" type="text" value={post.title} disabled/>
                                </div>
                                <div className="row">
                                    <span className="edit-font">Body</span><textarea name="viewBody" className="materialize-textarea" value={post.body} disabled></textarea>
                                </div>
                                <div><span className="edit-font">By : </span> {post.author} <span className="right">{post.voteScore}</span> <span className="edit-font right">Post Vote(s) :</span></div> 
                                <div className="row" style={{color:'blue', fontWeight:'bold', paddingTop:'20px'}}><span>Comments</span></div>
                                {/* Comment section for a post */}
                                <div className="row s12">
                                    <div className="row s9">
                                        <textarea placeholder="Add your comments here" name="addComment" id="addCommentText" className="validate" required aria-required="true" onChange={this.handleInputChange}></textarea>
                                    </div>
                                    <div className="row s3 right">
                                        <a href="" onClick={this.handleSubmitComment}><span className="button-add">+Add Comment</span></a>
                                    </div>
                                    {
                                        comments.map((comment)=>(
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
                                                    <div><a href="" onClick={this.handleDeleteComment} id={"d"+comment.id}><i className="material-icons" style={{float:'right'}}>delete</i></a></div>
                                                    <div><a href="" onClick={this.handleUpdateComment} id={"e"+comment.id}><i className="material-icons" style={{float:'right'}}>edit</i></a></div>
                                                    <div><a href="" onClick={this.handleSaveEditComment} id={"k"+comment.id}><i className="material-icons" style={{float:'left', display:'none'}}>check</i></a></div>
                                                    <div><a href="" onClick={this.handleCancelEditComment} id={"r"+comment.id}><i className="material-icons" style={{float:'left', display:'none'}}>clear</i></a></div>
                                                </div>
                                            </div>    
                                        ))
                                    }
                                </div>
                                <div><input type="text" name="parentId" style={{display:'none'}} ref={input => this.parentId = input} value={post.id}/></div>
                            </div>
                        </form>          
                    </div>
                ))}
            </div>
        )
    }
}

    
export default FormViewPostComments;
    

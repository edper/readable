import React, {Component} from 'react';
  
class PostInfo extends Component {

    constructor(props) {
        super(props);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleVotePost = this.handleVotePost.bind(this);
        this.handlePassPost = this.handlePassPost.bind(this);
        this.handleViewPost = this.handleViewPost.bind(this);
    }

    handleDeletePost = (e) => {
        e.preventDefault();
        this.props.removePost(this.postid.value);
    }

    handleVotePost = (e) => {
        e.preventDefault();
        this.props.votedPost(e.target.id, this.postid.value);
    }

    handlePassPost = (e) => {
        e.preventDefault();
        this.props.passPost(this.props.post);
    }

    handleViewPost = (e) => {
        this.props.getViewPost(this.postid.value);
    }

    componentDidMount() {
        this.setState({currentPost:this.props.post})
    }

    render() {

        const post = this.props.post;
        const postDate = new Date(post.timestamp).toDateString();
        const url = `/messages/${post.id}`;
        return (
            <div className="row">
                <div className="row readable-list-card z-depth-4">
                    <div className="float-date">{postDate}</div><br/>
                    {/* Title here */}
                    <div className="row">
                        <a href={url} onClick={this.handleViewPost}>
                            <div name="title" ref="myTitle" className="card-title truncate"><strong>Title : </strong>{post.title}</div>
                        </a>
                    </div>
                    {/* Author */}
                    <div className="row">
                        <div>By : {post.author}</div>
                    </div>
                    {/* Vote, Comments, Edit, Delete */}
                    <div className="row readable-list-card-bar col s12">
                        <div className="col s6">
                            <div className="chip"><strong className="bold">Vote : </strong><span className="chip-color">{post.voteScore}</span></div>&nbsp;&nbsp;
                            <div className="chip"><strong className="bold">Comment : </strong><span className="chip-color">{post.commentCount}</span></div>&nbsp;&nbsp;
                        </div>
                        <div className="col s4">
                            <a className="tooltip2" href="" onClick={this.handleVotePost}><span className="tooltiptext">Vote up</span><i className="material-icons" id="upVote">thumb_up</i></a><span>&nbsp;&nbsp;</span>
                            <a className="tooltip2" href="" onClick={this.handleVotePost}><span className="tooltiptext">Vote down</span><i className="material-icons" id="downVote">thumb_down</i></a>
                        </div>
                        <div className="col s2">
                            <a className="tooltip2 modal-trigger" href="#edit-post" onClick={this.handlePassPost}><span className="tooltiptext">Edit post</span><i className="material-icons">edit</i></a>
                            <a className="tooltip2" href="" onClick={this.handleDeletePost}><span className="tooltiptext">Delete post</span><i className="material-icons">delete</i></a>
                        </div>
                        <div><input type="text" name="postid" style={{display:'none'}} ref={input => this.postid = input} value={post.id}/></div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

  

export default PostInfo;
  
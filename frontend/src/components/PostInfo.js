import React, {Component} from 'react';

class PostInfo extends Component {
    render() {
        const post = this.props.post;
        const postDate = new Date(post.timestamp).toDateString();
        return (
            <div className="row">
                <div className="row readable-list-card z-depth-4">
                    <div className="float-date">{postDate}</div><br/>
                    <a href=""><div className="card-title truncate"><strong>Title :</strong> {post.title}</div>
                    <p>By : {post.author}</p></a>
                    <div className="row readable-list-card-bar">
                        <div className="chip"><strong className="bold">Vote : </strong><span className="chip-color">{post.voteScore}</span></div>&nbsp;&nbsp;
                        <div className="chip"><strong className="bold">Comment : </strong><span className="chip-color">{post.commentCount}</span></div>&nbsp;&nbsp;
                        <div className="float-date">
                            <a className="tooltip2" href=""><span class="tooltiptext">Edit post</span><i className="material-icons">edit</i></a>
                            <a className="tooltip2" href=""><span class="tooltiptext">Delete post</span><i className="material-icons">delete</i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostInfo;
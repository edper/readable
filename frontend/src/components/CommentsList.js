import React, {Component}  from 'react';

class CommentsList extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        this.setState({comments:this.props.comments});
    }
    render() {
        
        //const comments = this.props.comments;

        return (
            <div className="comment-box">
                <span>Count :  { this.state.comments.length}</span>
            </div>
        )
    }
}

export default CommentsList;
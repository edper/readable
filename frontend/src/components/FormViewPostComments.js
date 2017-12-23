import React, {Component} from 'react';
import CommentsList from './CommentsList';
import { fetchPostComments} from '../actions'
import { connect } from 'react-redux'
  

class FormViewPostComments extends Component {

    state = {
        comments: [],
    }
    constructor(props) {
        super(props);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleViewComments = this.handleViewComments.bind(this);
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleSubmitEdit = (e) => {
        e.preventDefault();
    }

    handleViewComments = (e) => {
        e.preventDefault();
        this.setState({comments: this.props.getAllComments(this.props.post.id)})
    }

    componentDidMount() {
        this.props.setEditFlag(true);
    }

    componentWillUnmount() {
        this.props.setEditFlag(false);        
    }

    render() {

        const post = this.props.viewPost;
        const postDate = new Date(post.timestamp).toDateString();
        
        return (
            <div>
                <div id="view-post">   
                        <form onSubmit={this.handleSubmitEdit}>
                            <div>
                                {/* <span className="modal-action modal-close right"><i className="material-icons">close</i></span> */}
                                <div className="float-date">Date: {postDate}</div>
                                <div className="row">
                                    <span className="edit-font">Title</span><input name="viewTitle" type="text" value={post.title} disabled/>
                                </div>
                                <div className="row">
                                    <span className="edit-font">Body</span><textarea name="viewBody" className="materialize-textarea" value={post.body} disabled></textarea>
                                </div>
                                <div><span className="edit-font">By : </span> {post.author}</div>
                                <div className="row">
                                    <a onClick={this.handleViewComments} href=""><span className="float-date"><strong style={{fontWeight:'bold'}}>View Comments</strong></span></a>
                                </div>
                                <div>
                                    <CommentsList comments={this.state.comments}/>                            
                                </div>
                            </div>
                        </form>          
                    </div>
            </div>
        )
    }
}

function mapStateToProps ({comments}) {  
    return {
      comments: comments,
    }
  }
    
  function mapDispatchToProps (dispatch) {
    return {
      getAllComments: (postID) => dispatch(fetchPostComments(postID)),
    }
  }
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormViewPostComments)
    

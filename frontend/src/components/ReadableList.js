import React, {Component} from 'react';
import PostInfo from './PostInfo';

class ReadableList extends Component {
    render() {
        const showPosts  = this.props.posts;
        const categoryId = this.props.categoryId;
        const removePost = this.props.removePost;
                
        return(
            <div>
                <div className="row readable-list">
                    {
                        typeof categoryId === 'undefined' ?
                        showPosts.length > 0 && 
                            showPosts.map((post)=> (
                                    (!post.deleted) &&
                                    <PostInfo key={post.id} post={post} removePost={removePost}/>
                                )
                            ) : 
                        showPosts.length > 0 && 
                        showPosts.map((post)=> (
                                (!post.deleted && post.category===categoryId) &&
                                <PostInfo key={post.id} post={post} removePost={removePost}/>
                            )
                        ) 
                    
                    }                    
                </div>
            </div>
        )
    }

}

export default ReadableList;
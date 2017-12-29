import React, {Component} from 'react';

class FormAddPost extends Component {

    // state for added Post detail
    state = {
        id:'',
        title:'',
        body:'',
        author:'',
        category:'react',
        timestamp:null,
    }

    // for clearing state and input fields after post is added
    clearState=()=>{
        this.setState({ id: '', title: '', body: '', author:'', category: 'react', timestamp: null });        
    }

    // Event handler for input field changes when adding details of the post
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    // Event handler when user saves the post
    handleSubmit = (e) => {
        e.preventDefault();
        const post = this.state;
        post.id = window.getUUID();
        post.timestamp = Date.now();
        post.category = this.category.value;
        this.props.savePost(post);
        this.clearState();
    }

    // Loading all Script needed
    componentWillMount() {

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


    render() {
        return (
            <div>
                <div id="add-post" className="modal modal-fixed-footer">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-content">
                                <span className="modal-action modal-close right"><i className="material-icons">close</i></span>
                                <h4>Adding new Post</h4>
                                <div className="input-field row">
                                    <input id="title" name="title" type="text" value={this.state.title} className="validate" required aria-required="true" onChange={this.handleInputChange}/>
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="input-field row">
                                    <textarea id="body" name="body" value={this.state.body} className="materialize-textarea" required aria-required="true" onChange={this.handleInputChange}></textarea>
                                    <label htmlFor="body">Body</label>                                
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="author" name="author" type="text" value={this.state.author} className="validate" required aria-required="true" onChange={this.handleInputChange}/>
                                        <label htmlFor="author">Author</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <select id="category" name="category" className="validate" value={this.state.category} required aria-required="true" onChange={this.handleInputChange} ref={select => this.category = select}>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="react">React</option>
                                            <option value="redux">Redux</option>
                                            <option value="udacity">Udacity</option>
                                        </select>
                                        <label htmlFor="category">Choose category</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn waves-effect waves-light deep-purple" type="submit" name="action">Submit</button>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}

export default FormAddPost;
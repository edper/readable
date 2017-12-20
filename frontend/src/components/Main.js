import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ReadableList from './ReadableList';
import PropTypes from 'prop-types'


class Main extends Component {
        
    static propTypes = {
        savePost: PropTypes.func.isRequired,
        removePost: PropTypes.func.isRequired
    };

    initialState = () => {
        const newState = {
            id: '',
            title: '',
            body: '',
            author:'',
            category: 'react',
            timestamp: null,
          };
        return newState; 
    }

    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (e) => {
        const post = this.state;
        post.id = window.getUUID();
        post.timestamp = Date.now();
        
        const sel = document.getElementById("category");
        const category_value = sel.options[sel.selectedIndex].value;

        post.category = category_value;
        this.props.savePost(post);
        // Clear state from input values
        this.setState({ state : this.initialState() });
    }
    
    render() {
        const { posts, removePost } = this.props;
        
        return(
            <div className="App-col-all">
                <div className="col s9">
                    <nav className="remover">
                        <div className="nav-wrapper indigo darken-4">
                            <a href="" className="brand-logo center">Readable</a>
                        </div>
                    </nav>
                    <div className="float-button row">
                        <strong className="sortByFont">Sort by:</strong> <a className='dropdown-button btn deep-purple' href='' data-activates='sortBy'>Popularity</a>
                        <ul id='sortBy' className='dropdown-content'>
                            <li>Popularity</li>
                            <li>Date</li>
                        </ul>
                    </div>
                    <div className="row">
                        <Route key="root" exact path="/" render={()=>(
                            <ReadableList posts={posts} removePost={removePost}/>                        
                        )}/>
                        <Route key="withCategory" path='/:categoryId' render={({match})=>(
                            <ReadableList categoryId={match.params.categoryId} posts={posts} removePost={removePost} />
                        )}/>
                    </div>
                    <div id="add-post" className="modal modal-fixed-footer">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-content">
                                <span className="modal-action modal-close right"><i className="material-icons">close</i></span>
                                <h4>Adding new Post</h4>
                                <div className="input-field row">
                                    <input id="title" name="title" type="text" className="validate" required aria-required="true" onChange={this.handleInputChange}/>
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="input-field row">
                                    <textarea id="body" name="body" className="materialize-textarea" required aria-required="true" onChange={this.handleInputChange}></textarea>
                                    <label htmlFor="body">Body</label>                                
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="author" name="author" type="text" className="validate" required aria-required="true" onChange={this.handleInputChange}/>
                                        <label htmlFor="author">Author</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <select id="category" name="category" className="validate" value={this.state.category} required aria-required="true" onChange={this.handleInputChange}>
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
                    <footer className="add-button">
                        <a className="btn btn-floating btn-large modal-trigger deep-purple" href="#add-post"><i className="material-icons">add</i></a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Main;
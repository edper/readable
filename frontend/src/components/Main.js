import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ReadableList from './ReadableList';

class Main extends Component {
    
    state = {
        sortBy : 'popularity'
    }
    componentWillMount () {
        //const script = document.createElement("script");
        //const scriptText = "$(document).ready(function(){$('.modal').modal(); $('select').material_select();$('select[required]').css({display: 'inline',height: 0,padding: 0,width: 0});}); function getUID() { return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36));}";
        //const scriptNode = document.createTextNode(scriptText);
        //script.appendChild(scriptNode);
        //document.head.appendChild(script);
    }

    constructor(props) {
        super(props);
        this.state = {
          id: window.getUUID(),
          title: '',
          body: '',
          author:'',
          category: '',
          timestamp: new Date(),
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    
    render() {
        return(
            <div className="App-col-all">
                <div className="col s9">
                    <nav className="remover">
                        <div className="nav-wrapper indigo darken-4">
                            <a href="#" className="brand-logo center">Readable</a>
                        </div>
                    </nav>
                    <div className="float-button row">
                        <strong className="sortByFont">Sort by:</strong> <a className='dropdown-button btn deep-purple' href='#' data-activates='sortBy'>Popularity</a>
                        <ul id='sortBy' className='dropdown-content'>
                            <li>Popularity</li>
                            <li>Date</li>
                        </ul>
                    </div>
                    <div className="row">
                        <Route key="root" exact path="/" render={()=>(
                            <ReadableList posts={this.props.posts} />                        
                        )}/>
                        <Route key="withCategory" path='/:categoryId' render={({match})=>(
                            <ReadableList categoryId={match.params.categoryId} posts={this.props.posts} />
                        )}/>
                    </div>
                    <div id="add-post" class="modal modal-fixed-footer">
                        <form>
                            <div className="modal-content">
                                <span className="modal-action modal-close right"><i className="material-icons">close</i></span>
                                <h4>Adding new Post</h4>
                                <div className="input-field row">
                                    <input id="title" type="text" className="validate" required aria-required="true"/>
                                    <label for="title">Title</label>
                                </div>
                                <div className="input-field row">
                                    <textarea id="body" className="materialize-textarea" required aria-required="true"></textarea>
                                    <label for="body">Body</label>                                
                                </div>
                                <div className="input-field row">
                                    <select required aria-required="true" id="category">
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="react">React</option>
                                        <option value="redux">Redux</option>
                                        <option value="udacity">Udacity</option>
                                    </select>
                                    <label>Choose category</label>
                                </div>
                                <div className="input-field row">
                                    <input id="author" type="text" className="validate" required aria-required="true"/>
                                    <label for="author">Author</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn waves-effect waves-light deep-purple" type="submit" name="action">Submit</button>
                            </div>
                        </form>
                    </div>
                    <footer className="add-button">
                        <a className="btn btn-floating btn-large modal-trigger deep-purple" href="#add-post"><i class="material-icons">add</i></a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Main;
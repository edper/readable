import React, {Component} from 'react';
import logo from '../readable-logo.png';
import { NavLink } from 'react-router-dom';
import capitalize from '../util/Helper';

class SideBar extends Component {

    render() {
        const active_hilight = {
            color: 'yellow',
        }
      
        const categories = this.props.categories;
        return(
            <div className="col s3 z-depth-1 App-col-all indigo darken-1">
                <img className="responsive-img z-depth-1" src={logo} alt="readable logo"/>
                <div className="row">
                    <h5 className="center categories">Categories</h5>
                        <ul>
                            {
                                <NavLink key="all" className="menubar-color" exact to="/" activeStyle={active_hilight}> 
                                    <li key="all" className="menubar waves-effect waves-light">All</li>
                                </NavLink>
                            
                            }
                            { 
                                categories.length > 0 && 
                                categories.map((category)=> (                                
                                <NavLink key={category.name} className="menubar-color" to = {`/${category.name}`} activeStyle={active_hilight}>
                                    <li key={category.name} className="menubar waves-effect waves-light">
                                        {capitalize(String(category.name))}
                                    </li>
                                </NavLink>))
                            }                    
                        </ul>
                </div>
            </div>
        )
    }

}

export default SideBar;
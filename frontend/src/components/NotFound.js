import React, {Component} from 'react';

class NotFound extends Component {
    
    handleReturnHomePage=(e)=>{
        this.props.history.push("/");
    }
                


    render() {
        return (
            <div>
                <div className="row" onload={this.handleReturnHomePage}>
                    <br/><br/><br/>
                    <h3 className="center">Page not found!</h3>
                    {
                        <h6 className="center">
                            {
                                this.props.history.location.state.referrer==="Category"
                                ? <span>Category could not be found!</span>
                                : <span>Post could not be found!</span>
                            }
                        </h6>
                    }
                </div>
                <div className="row s3 center">
                    <a href="" onClick={this.handleReturnHomePage}><span className="button-edit" id="Update">Return to Homepage</span></a>&nbsp;&nbsp;
                </div>

            </div>
        )
    }
}

    
export default NotFound;
    

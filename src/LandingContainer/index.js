import React from 'react'
import Apod from '../Apod'
import Register from '../Register'
import Login from '../Login'

class LandingContainer extends React.Component{
	constructor(){
		super()
		this.state = {
			displayLogin: true 
		}
	}

	toggleLogin = () => {
	    this.setState({
	      displayLogin: !this.state.displayLogin
	    })
  	}

 

  	render(){
		return(
			<div>
				<Apod caption={this.props.caption} date={this.props.date} bio={this.props.bio} video={this.props.video} notification={this.props.notification}/>
	
		        {this.state.displayLogin ? 
		        	<Login {...this.props} toggleContainer={this.props.toggleContainer} toggleLoginContainer={this.props.toggleLoginContainer} toggleLogin={this.toggleLogin} /> : 
		        	<Register {...this.props} toggleLogin={this.toggleLogin} toggleRegisterContainer={this.props.toggleRegisterContainer}/>
		        }

	        </div>
		)
 	
  	}
}

export default LandingContainer
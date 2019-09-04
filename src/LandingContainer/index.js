import React from 'react'
import Apod from '../Apod'
import Register from '../Register'
import Login from '../Login'

class LandingContainer extends React.Component{
	constructor(){
		super()
		this.state = {
			displayLogin: false 
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
				<Apod caption={this.props.caption} date={this.props.date} bio={this.props.bio} />
				
		        {this.state.displayLogin ? 
		        	<Login toggleContainer={this.props.toggleContainer} toggleLogin={this.toggleLogin} /> : 
		        	<Register toggleLogin={this.toggleLogin} toggleContainer={this.props.toggleContainer}/>
		        }

	        </div>
		)
 	
  	}
}

export default LandingContainer
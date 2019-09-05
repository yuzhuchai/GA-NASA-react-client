import React from 'react'
import {} from 'semantic-ui-react'


class Header extends React.Component{
	constructor(){
		super()
		this.state={
			loggedUser: null
		}
	}

	render(){
		const header = "{YUZHU'S AWESOME SITE}"

		return(

			<div>
	
											<a onClick={this.props.logout}>logout</a>
					
			
				<h1 className='App-header'> {header}</h1>
			
			</div>
		)
	}

}

export default Header
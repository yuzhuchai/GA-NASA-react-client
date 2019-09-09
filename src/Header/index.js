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
		const header = "{HOSHI ATSUME}"

		return(

			<div className='App-header'>
	
				<a onClick={this.props.logout}>logout</a>	
				<h1 className='App-header-header'> {header}</h1>
			
			</div>
		)
	}

}

export default Header
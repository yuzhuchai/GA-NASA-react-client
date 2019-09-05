import React from 'react'
import {} from 'semantic-ui-react'


class Header extends React.Component{
	constructor(){
		super()
		this.state={
			loggedUser: null
		}
	}
	// const style = {
	// 	color: 'white'
	// }

	// logOut = 
	render(){
		const header = "{YUZHU'S AWESOME SITE}"

		return(

			<div>
				{this.state.loggedUser? 
					<div>
						<p>welcome! {this.state.loggedUser.username}</p>
						<a onClick={this.logout}>logout</a>
					</div> 
					:
					<a>login</a>
				}
				<h1 className='App-header'> {header}</h1>
				}
			</div>
		)
	}

}

export default Header
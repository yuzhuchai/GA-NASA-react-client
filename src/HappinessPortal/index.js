import React from 'react'
import { TransitionablePortal, Segment } from 'semantic-ui-react'

class HappinessPortal extends React.Component {
	constructor(){
		super()
		// this.state={
		// 	open: false 
		// }
	}

	// handleOpen = () => {
	// 	this.setState({
	// 		open: true 
	// 	})
	// }

	handleClose = () => {
		this.props.handleClose()
	}

	render(){
		const open = this.props.open
		return(
			<TransitionablePortal 
				open={open}
				// onOpen={this.handleOpen}
				onClose={this.handleClose}
			>
			<Segment inverted color='teal' style={{left:'30%', position:'fixed', top: '50%',zIndex: 1000}}>
				<h3> your just increased your baby planet's happiness</h3>
			</Segment>
			</TransitionablePortal>

		)

	}
}

export default HappinessPortal
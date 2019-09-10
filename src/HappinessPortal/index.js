import React from 'react'
import { TransitionablePortal, Segment } from 'semantic-ui-react'

class HappinessPortal extends React.Component {
	constructor(){
		super()
		
	}


	handleClose = () => {
		this.props.handleClose()
	}

	render(){
		const style = {
			left:'5%', 
			position:'fixed', 
			top: '40%',
			zIndex: 1000
		}

		const open = this.props.open
		return(
			<TransitionablePortal 
				open={open}
				// onOpen={this.handleOpen}
				onClose={this.handleClose}
			>
			<Segment color='teal' inverted style={style}>
				<h3> you just increased your baby planet's happiness</h3>
			</Segment>
			</TransitionablePortal>

		)

	}
}
export default HappinessPortal
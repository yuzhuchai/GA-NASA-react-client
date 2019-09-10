import React from 'react'
import { TransitionablePortal, Segment } from 'semantic-ui-react'

class CreatePostPortal extends React.Component {
	constructor(){
		super()
		
	}


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
				<Segment inverted color='teal' style={{left:'5%', position:'fixed', top: '20%',zIndex: 1000}}>
					<h3> you just created a post</h3>
				</Segment>
			</TransitionablePortal>
		)

	}
}

export default CreatePostPortal
import React from 'react'

class SelectPosts extends React.Component {
	constructor(){
		super()
	}

	render(){
		return(
			<div>
				some sample posts of {this.props.cat}
			</div>
		)
	}
}

export default SelectPosts
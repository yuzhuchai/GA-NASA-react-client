import React from 'react'

class SelectPosts extends React.Component {
	constructor(){
		super()
	}

	componentDidMount(){
		this.samplePost()
	}

	samplePost = () => {
		const url = `http://localhost:9000/api/v1/nasadata/${this.props.cat}`
		console.log(url);
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
import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

class Register extends React.Component {
	constructor(){
		super()
		this.state={
			username: '',
			password:''
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value 
		})
	}


	render(){
		return(
			<div className='RegisterLogin'>
				<h3>Register!</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<label> username </label>
						<input type='text' value={this.state.username} name='username' onChange={this.handleChange}/>
					</Form.Field>
					<Form.Field>
						<label> password </label>
						<input type='password' value={this.state.password} name='password' onChange={this.handleChange}/>
					</Form.Field>
					<Button>submit</Button>
				</Form> 
				<p>already have an account? <a onClick={this.props.toggleLogin.bind(null)}>Login</a> </p>
			</div>
		)
	}
}

export default Register

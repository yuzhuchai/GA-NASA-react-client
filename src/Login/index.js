import React from 'react'
import { Form, Button } from 'semantic-ui-react'


class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			username: '',
			password: ''
		}
	}

	handleSubmit = (e) => {
		e.preventDafault()
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value 
		})
	}

	render(){
		return(
			<div className='RegisterLogin'>
				<h3>Log in!</h3>
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
				<p>dont have an account? <a onClick={this.props.toggleLogin.bind(null)}>register</a> </p>
			</div> 
		)
	}
}



export default Login 
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

	handleSubmit = async (e) => {
		e.preventDefault()
		const url = `http://localhost:9000/api/v1/user/register`
		const registerResponse = await fetch(url,{
			method: 'POST',
			body: JSON.stringify(this.state),
			credentials: 'include',
			headers: {
		          'Content-Type': 'application/json'
		        }
		})

		if(registerResponse.status !== 200){
	       	throw Error('login not working')
	    } else {
		    const parsed = await registerResponse.json()
		    console.log(parsed);
		    if (parsed.success){
				this.props.toggleRegisterContainer(parsed.data)
		    } else {
		    	console.log(parsed.message);
		    	this.setState({
		    		message: parsed.message
		    	})
		    }
	    }
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
				<p>{this.state.message}</p>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<label> username </label>
						<input type='text' value={this.state.username} name='username' onChange={this.handleChange}/>
					</Form.Field>
					<Form.Field>
						<label> password </label>
						<input type='password' value={this.state.password} name='password' onChange={this.handleChange}/>
					</Form.Field>
					<Button>register</Button>
				</Form> 
				<p>already have an account? <a onClick={this.props.toggleLogin.bind(null)}>Login</a> </p>
			</div>
		)
	}
}

export default Register

import React from 'react'

function Apod (props){
	return(
		<div className='Apod'>
			<h3>{props.caption}</h3>
			<p>{props.bio}</p>
			<p>{props.date.split('T')[0]}</p>
		</div> 
	)
}

export default Apod
import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import SelectPosts from '../SelectPosts'


class DataCategory extends React.Component{

	constructor(){
		super()
		this.state={
			cat: null,
			displayPosts: false,
			displayCat: true
		}

	}


	handleClick = (e) => {
		console.log(e.target.text);
		this.setState({
			cat: e.target.text,
			displayPosts: !this.state.displayPosts,
			displayCat: !this.state.displayCat 
		})	
	}


	render(){
		console.log(this.props,'<-----look for planet happiness');
		return(
			<div className='DataCategory'>
			{this.state.displayCat? 
				<div>
					<h3>list of data DataCategory</h3>
					<Card.Group centered itemsPerRow={2}>
							<Card>
								<Image src='https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/iss052e007857_0.jpg' wrapped ui={false} />
								<Card.Content>
									<Card.Header><a onClick={this.handleClick}>spaceweather</a></Card.Header>
									<Card.Description>
		        						this data category gets data from the NASA Space Weather Database of Notifications, Knowledge, Information (DNKI) api. <br/>Generated post content will contain: 
		     						</Card.Description>
								</Card.Content>
							</Card>
						<Card>
							<Image src='https://apod.nasa.gov/apod/image/1602/PinnaclesGalaxy_Goh_2400.jpg' wrapped ui={false} />
							<Card.Content>
								<Card.Header><a onClick={this.handleClick}>apod</a></Card.Header>
								<Card.Description>
	        						this data category gets data from the NASA Astronomy Picture of the Day(APOD) api. (the background image of the app is today's APOD image) <br/>Generated post content will contain: the image, the title, the description, date of the image, as well as the camera.
	     						</Card.Description>
							</Card.Content>
						</Card>
						<Card>
							<Image src='https://mars.nasa.gov/system/resources/detail_files/22581_methane_main.jpeg' wrapped ui={false} />
							<Card.Content>
								<Card.Header><a onClick={this.handleClick}>mars</a></Card.Header>
								<Card.Description>
									this data category gets data from the NASA Mars Rover Photos api, as well as the InSight: Mars Weather Service api.<br/> Generated post content will include: a photo, the description/title of the photo taken by the Mars rover, some data about the Mars weather on a certain day.
								</Card.Description>
							</Card.Content>
						</Card>
						<Card>
							<Image src='https://www.nasa.gov/sites/default/files/thumbnails/image/187_1003705_americas_dxm.png' wrapped ui={false} />
							<Card.Content>
								<Card.Header><a onClick={this.handleClick}>earth</a></Card.Header>
								<Card.Description>
									this data category gets data from the NASA EPIC api, which provides daily imagery collected by DISCOVER's Earth Polychromativ Imaging camera, as well as Near Earth Object Web Service(NeoWs) api. <br/>Generated post  content will include: the picture, title/description of the picture, one astroid and it's information.
								</Card.Description>
							</Card.Content>
						</Card>
					</Card.Group>
				</div> : null
			}
			{this.state.displayPosts? 
				<div>
					<a onClick={this.handleClick}>back to DataCategory</a>
					<h1>should be some posts of {this.state.cat}</h1>
					<SelectPosts handlePostOpen={this.props.handlePostOpen} increasePlanetHappiness={this.props.increasePlanetHappiness} cat={this.state.cat}/>
				</div>
				:null
			}
			</div>
		)
	}

}

export default DataCategory
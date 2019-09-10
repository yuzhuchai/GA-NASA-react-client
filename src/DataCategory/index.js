import React from 'react'
import { Card, Image, Responsive, Container, Button } from 'semantic-ui-react'
import SelectPosts from '../SelectPosts'


class DataCategory extends React.Component{

	constructor(){
		super()
		this.state={
			cat: null,
			displayPosts: false,
			displayCat: true,
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

	handleOnUpdate = (e,{width}) =>{
		this.setState({
			width
		})
	}

	render(){
		console.log(this.props,'<-----look for planet happiness');
		const width = this.state.width 
		const num = (width >= 640) ? 2 : 1 
		return(
			<div className='DataCategory'>
			{this.state.displayCat? 
				<div>
					<h3>list of data DataCategory</h3>
					<Responsive as={Container} fireOnMount onUpdate={this.handleOnUpdate}>
						<Card.Group centered itemsPerRow={num}>
								<Card>
									<Image 
										src='https://www.nasa.gov/sites/default/files/thumbnails/image/06_airglow.gif' wrapped ui={false}
									/>
									<Card.Content>
										<Card.Header><a onClick={this.handleClick}>spaceweather</a></Card.Header>
										<Responsive as={Container} minWidth={640}>
											<Card.Description>
				        						this data category gets data from the NASA Space Weather Database of Notifications, Knowledge, Information (DONKI) api. <br/>Generated post content will contain: a notification of space weather from NASA
				     						</Card.Description>
			     						</Responsive>
			     						<Responsive as={Container} maxWidth={640}>
			     							<Card.Description>
				        						this data category gets data from the NASA Space Weather Database of Notifications....
				     						</Card.Description>
			     						</Responsive>
									</Card.Content>
								</Card>
							<Card>
								<Image src='https://apod.nasa.gov/apod/image/1602/PinnaclesGalaxy_Goh_2400.jpg' wrapped ui={false} />
								<Card.Content>
									<Card.Header><a onClick={this.handleClick}>apod</a></Card.Header>
									<Responsive as={Container} minWidth={640}>
										<Card.Description>
			        						this data category gets data from the NASA Astronomy Picture of the Day(APOD) api. (the background image of the app is today's APOD image) <br/>Generated post content will contain: the image, the title, the description, date of the image, as well as the camera.
			     						</Card.Description>
			     					</Responsive>
									<Responsive as={Container} maxWidth={640}>
										<Card.Description>
											this data category gets data from the NASA Astronomy Picture of the Day(APOD) api. (the background image of the app......
										</Card.Description>
									</Responsive>
								</Card.Content>
							</Card>
							<Card>
								<Image src='https://mars.nasa.gov/system/resources/detail_files/22581_methane_main.jpeg' wrapped ui={false} />
								<Card.Content>
									<Card.Header><a onClick={this.handleClick}>mars</a></Card.Header>
									<Responsive as={Container} minWidth={640}>
										<Card.Description>
											this data category gets data from the NASA Mars Rover Photos api, as well as the InSight: Mars Weather Service api.<br/> Generated post content will include: a photo, the description/title of the photo taken by the Mars rover, some data about the Mars weather on a certain day.
										</Card.Description>
									</Responsive>
									<Responsive as={Container} maxWidth={640}>
										<Card.Description>
											this data category gets data from the NASA Mars Rover Photos api, as well as the InSight: Mars Weather Service api......
										</Card.Description>
									</Responsive>
								</Card.Content>
							</Card>
							<Card>
								<Image src='https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/iss056e006994_lrg.jpg' wrapped ui={false} />
								<Card.Content>
									<Card.Header><a onClick={this.handleClick}>earth</a></Card.Header>
									<Responsive as={Container} minWidth={640}>
										<Card.Description>
											this data category gets data from the NASA EPIC api, which provides daily imagery collected by DISCOVER's Earth Polychromativ Imaging camera, as well as Near Earth Object Web Service(NeoWs) api. <br/>Generated post  content will include: the picture, title/description of the picture, one astroid and it's information.
										</Card.Description>
									</Responsive>
									<Responsive as={Container} maxWidth={640}>
										<Card.Description>
											this data category gets data from the NASA EPIC api, which provides daily imagery collected by DISCOVER's Earth Polychromativ Imaging camera......
										</Card.Description>
									</Responsive>
								</Card.Content>
							</Card>
						</Card.Group>
					</Responsive>
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
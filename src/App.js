import React from 'react';
import './App.css';
import Header from './Header'
import LandingContainer from './LandingContainer'
import SelectPlanetContainer from './SelectPlanetContainer'
import MainContainer from './MainContainer'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apodImgUrl: '',
      apodCaption:'',
      apodParagraph:'',
      date:'',
      displayLandingPage: true,
      loggedUser: null,
      selectPlanet: false,
      displayProfile: false,
      planetStatus: 0,
      planetId: null
    }
  }

  componentDidMount(){
      this.getApodData()
      // console.log('this should only run once');
  }


  logout = async () => {
    const logoutResponse = await fetch(`http://localhost:9000/api/v1/user/logout`,{
      credentials: 'include'
    })
    console.log(logoutResponse,'<-=----logout response ');
    this.setState({
      loggedUser: null,
      displayLandingPage: true,
      selectPlanet: false,
      displayProfile: false,
    })

    // so right here when i log out i have to save the planet status. 
    const updatePlanetStatus = await fetch(`http://localhost:9000/api/v1/planet/status/${this.state.planetId}`,{
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify({status:this.state.planetStatus}),
          headers: {
                'Content-Type': 'application/json'
              }
      })
    console.log(updatePlanetStatus,'<--------updated plannet status response');
  }



  getApodData = async () => {
      const response = await fetch('http://localhost:9000/api/v1/nasadata/apod', {
          method: 'GET',
          credentials: 'include',
      })
      const parsdResponse = await response.json()
      // console.log(parsdResponse,"<------landing page apod data");

      this.setState({
        apodImgUrl: parsdResponse.data.imgUrl,
        apodCaption: parsdResponse.data.imgCaption,
        apodParagraph: parsdResponse.data.explnation,
        date: parsdResponse.data.date
      }) 
  }

  toggleRegisterContainer = (user) => {
    this.setState({
      displayLandingPage: !this.state.displayLandingPage,
      loggedUser: user,
      selectPlanet: !this.state.selectPlanet
    })
  }

  toggleLogInContainer = (user) => {
    this.setState({
      displayLandingPage: !this.state.displayLandingPage,
      loggedUser: user,
      displayProfile: true 
    })
  }

  togglePlanetContainer = () => {
    this.setState({
      selectPlanet: !this.state.selectPlanet,
      displayProfile: !this.state.displayProfile
    })
  }

  changePlanetStatus = (num, planetId) => {
    this.setState({
        planetStatus: num,
        planetId: planetId
    })
  }

  render(){
    console.log(this.state.planetId);
    const appStyle = {
        backgroundImage: `url(${this.state.apodImgUrl})`,
      }
    // console.log(this.state,"<--------state in app");
    return (
      <div style={ appStyle } className="App">
        <Header logout={this.logout}/>
        {this.state.displayLandingPage? <LandingContainer toggleLoginContainer={this.toggleLogInContainer} toggleRegisterContainer={this.toggleRegisterContainer} caption={this.state.apodCaption} date={this.state.date} bio={this.state.apodParagraph}/>: null}
        {this.state.selectPlanet ? <SelectPlanetContainer toggleContainer={this.togglePlanetContainer} loggedUser={this.state.loggedUser}/> : null}
        {this.state.displayProfile ? <MainContainer changePlanetStatus={this.changePlanetStatus} togglePlanetContainer={this.togglePlanetContainer} loggedUser={this.state.loggedUser} /> : null}
      </div>
    ); 
  }
}



export default App;

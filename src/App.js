import React from 'react';
import './App.css';
import Header from './Header'
import LandingContainer from './LandingContainer'
import SelectPlanetContainer from './SelectPlanetContainer'
import UserProfileContainer from './UserProfileContainer'


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
      displayProfile: false 
    }
  }

  componentDidMount(){
      this.getApodData()
      // console.log('this should only run once');
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



  render(){
    const appStyle = {
        backgroundImage: `url(${this.state.apodImgUrl})`,
      }
    // console.log(this.state,"<--------state in app");
    return (
      <div style={ appStyle } className="App">
        <Header />
        {this.state.displayLandingPage? <LandingContainer toggleLoginContainer={this.toggleLogInContainer} toggleRegisterContainer={this.toggleRegisterContainer} caption={this.state.apodCaption} date={this.state.date} bio={this.state.apodParagraph}/>: null}
        {this.state.selectPlanet ? <SelectPlanetContainer toggleContainer={this.togglePlanetContainer} loggedUser={this.state.loggedUser}/> : null}
        {this.state.displayProfile ? <UserProfileContainer togglePlanetContainer={this.togglePlanetContainer} loggedUser={this.state.loggedUser} /> : null}
      </div>
    ); 
  }
}



export default App;

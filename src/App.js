import React from 'react';
import './App.css';
import Header from './Header'
import LandingContainer from './LandingContainer'
import SelectPlanetContainer from './SelectPlanetContainer'



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
      selectPlanet: false
    }
  }

  componentDidMount(){
      this.getApodData()
      console.log('this should only run once');
  }

  getApodData = async () => {
      const response = await fetch('http://localhost:9000/api/v1/nasadata/apod', {
          method: 'GET',
          credentials: 'include',
      })
      const parsdResponse = await response.json()
      const mydata = JSON.parse(parsdResponse.data.myData)
      console.log(parsdResponse,"<------landing page apod data");

      this.setState({
        apodImgUrl: parsdResponse.data.imgUrl,
        apodCaption: mydata.imgCaption,
        apodParagraph: mydata.explnation,
        date: parsdResponse.data.date
      }) 
  }

  toggleContainer = (user) => {
    this.setState({
      displayLandingPage: !this.state.displayLandingPage,
      loggedUser: user,
      selectPlanet: !this.state.selectPlanet
    })
  }




  render(){
    const appStyle = {
        backgroundImage: `url(${this.state.apodImgUrl})`,
      }
    console.log(this.state,"<--------state in app");
    return (
      <div style={ appStyle } className="App">
        <Header />
        {this.state.displayLandingPage? <LandingContainer toggleContainer={this.toggleContainer} caption={this.state.apodCaption} date={this.state.date} bio={this.state.apodParagraph}/>: null}
        {this.state.selectPlanet ? <SelectPlanetContainer loggedUser={this.state.loggedUser}/> : null}
      </div>
    ); 
  }
}



export default App;

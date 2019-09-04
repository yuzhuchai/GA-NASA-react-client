import React from 'react';
import './App.css';
import Header from './Header'
import Apod from './Apod'
import Register from './Register'
import Login from './Login'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apodImgUrl: '',
      apodCaption:'',
      apodParagraph:'',
      date:'',
      displayLogin: false 
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

  toggleLogin = () => {
    this.setState({
      displayLogin: !this.state.displayLogin
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
        <Apod caption={this.state.apodCaption} date={this.state.date} bio={this.state.apodParagraph}/>
        {this.state.displayLogin? <Login toggleLogin={this.toggleLogin}/>: <Register toggleLogin={this.toggleLogin}/>}

      </div>
    ); 
  }
}



export default App;

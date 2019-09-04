import React from 'react';
import './App.css';
import Header from './Header'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apodImgUrl: '',
      apodCaption:'',
      apodParagraph:''
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
      console.log(mydata,"<------landing page apod data");

      this.setState({
        apodImgUrl: parsdResponse.data.imgUrl,
        apodCaption: mydata.imgCaption,
        apodParagraph: mydata.explnation,
      }) 
  }

  render(){
    const appStyle = {
        backgroundImage: `url(${this.state.apodImgUrl})`,
        backgroundSize: 'cover'
      }
    console.log(this.state,"<--------state in app");
    return (
      <div style={ appStyle } className="App">
        <Header />
      </div>
    ); 
  }
}



export default App;

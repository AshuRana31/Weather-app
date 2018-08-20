import React from "react";
import Titles from "./components/Titles.js";
import Form from "./components/Form.js";
import Weather from "./components/Weather";
import Projectname from "./components/Projectname";
import Headerone from "./components/Headerone";
import Headertwo from "./components/Headertwo";
import classes from './App.css';
import Chart from "react-google-charts";


const API_KEY="a057dfbe45c6caa4ee0f95b96b41c707";
const Tempoptions = {
  width: 350,
  redFrom: 40,
  redTo: 60,
  yellowFrom: 20,
  yellowTo: 40,
  greenColor: '#11B5E9',
  greenFrom:0,
  greenTo:20,
  minorTicks: 10,
  majorTicks:['0','10','20','30','40','50','60'],
  max:60
};
const Humoptions = {
  width: 350,
  redFrom: 67,
  redTo: 100,
  yellowFrom: 33,
  yellowTo: 67,
  greenFrom:0,
  greenTo:33,
  majorTicks:['0','20','40','60','80','100'],
  minorTicks: 10
};
class App extends React.Component{
  state= {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    temp:0,
    hum:0
  };
  getWeather =async (e) =>{
    e.preventDefault();
    const city= e.target.elements.city.value;
    const country= e.target.elements.country.value;
   const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
   const data = await api_call.json();
    if(city && country){
      console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error:"",
      temp:0,
      hum:0
  
    });
    }
    else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error:"Please fill the fields",
        temp:0,
        hum:0
      });
    }
 }
 
  intervalID = null;
  getTemperature = () => {
    return [
      ["Label", "Value"],
      ["Temperature", Number(this.state.temp)]
    ];
  };
  getHumidity = () => {
    return [
      ["Label", "Value"],
      ["Humidity", Number(this.state.hum)]
    ];
  };
  
  componentWillUnmount() {
    if (this.intervalID === null) return;
    clearInterval(this.intervalID);
  }

componentDidMount () {
    this.getData();
  }
getData()
{
  let self=this;
    fetch('https://api.thingspeak.com/channels/520307/feeds.json?api_key=K6WZGEQM0R9D0QHI&results=1')
                .then(response => {
                    if (!response.ok) {
                        throw Error('Network request failed.')
                    }
                    return response;
                })
                .then(data => data.json())
                .then(data => {
                    self.setState({
                        temp: data.feeds[0].field1, hum: data.feeds[0].field2
                    });
                    //console.log("Temperature: "+self.state.temp);
                    //console.log("Humidity: "+self.state.hum);
                    setTimeout(() => {
                      this.getData();
                    }, 3000);
                }, (ex) => {
                    self.setState({
                        requestError : true
                    });
                    console.log('parsing failed', ex)
                })
   
}
  render(){
    return(
      <div>
        <Projectname />
         <div className={classes.div1}>
         
          <div className={classes.box}>
          <Headerone />
            <div className={classes.box}>
            <div className={classes.content_title}>
            <Titles />
            <Form getWeather={this.getWeather}/>
            </div>
          <div className={classes.content_weather}>
          <Weather temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
          </div>
         </div>
          </div>
          <div>
            <div className={classes.verticalLine}></div>
          </div>
         </div>
         <div className={classes.div2}>
            <div className={classes.box}>
            <Headertwo />
              <div className={classes.box}>
              <div className={classes.content_title}>
                <h1>Room Temperature:</h1> {this.state.temp}&deg;&nbsp;
                  
                  <br />
                  <Chart className={classes.chart}
                  chartType="Gauge"
                  width="100%"
                  height="300px"
                  data={this.getTemperature()}
                  options={Tempoptions}
                  />
                  <h1>Humidity</h1>
                  {this.state.hum}%
                  <Chart className={classes.chart}
                  chartType="Gauge"
                  width="100%"
                  height="300px"
                  data={this.getHumidity()}
                  options={Humoptions}
                  />
              </div>
            </div>
            </div>
         </div>
                  
      </div>
              
    );
  }
};
export default App;
/*<div className="container-fluid">
          <div className="box">
            <div className="row">
                <div className="col-md-5">
                  <div className="content_title">
                  <Titles />
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="verticalLine"></div>
                </div>
              <div className="col-md-6">
                <div className="content_form">
                <Form getWeather={this.getWeather}/>
                </div>
                <div className="content_weather">
                  <Weather temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        */
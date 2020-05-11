import React, {Component} from 'react';
import TimeSeriesChart from './TimeSeriesChart.js'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

	state = {
		loading: true,
		allData: null,
		chartData: [],
		dataSelection: 'temperature',
		dataSelection2: 'humidity',
		gardenIdSelection: 0
	};

	async componentDidMount() {
		const url = "http://ec2-3-21-171-75.us-east-2.compute.amazonaws.com:9000"
		const response = await fetch(url);
		const data = await response.json();
		let cleanData = await parseData(data);	
		let myChartData = await convertForRecharts(cleanData); 
		this.setState({allData: cleanData, loading: false, chartData: myChartData});
		
	}

	render() {
		return <div>
			{this.state.loading || !this.state.allData ? 
				(<div>loading...</div> ): 
				(
				<TimeSeriesChart 
					chartData={parseForGardenId(this.state.chartData, this.state.gardenIdSelection)} 
					yAxis1={this.state.dataSelection}
					yAxis2={this.state.dataSelection2}
					gardenId={this.state.gardenIdSelection}/>
				)
			}
		<div> Garden Selection </div>
		<div>
			<Button variant={(this.state.gardenIdSelection === 0) ? 'primary' : 'outline-primary'}
				onClick={() => this.setState({gardenIdSelection: 0})}>
				Dan's Garden</Button>{' '}	
			<Button variant={(this.state.gardenIdSelection === 2) ? 'primary' : 'outline-primary'}
				onClick={() => this.setState({gardenIdSelection: 2})}>
				Zach's Garden</Button>{' '}	
		</div>
		<div> Data Selection 1 </div>
		<div>
			<Button variant={(this.state.dataSelection === 'temperature') ? 'dark' : 'outline-dark'}
				onClick={() => this.setState({dataSelection: 'temperature'})}>
				Temperature</Button>{' '}	
			<Button variant={(this.state.dataSelection === 'humidity') ? 'dark' : 'outline-dark'}
				onClick={() => this.setState({dataSelection: 'humidity'})}>
				Humidity</Button>{' '}	
			<Button variant={(this.state.dataSelection === 'soilMoisture') ? 'dark' : 'outline-dark'}
 				onClick={() => this.setState({dataSelection: 'soilMoisture'})}>
				Soil Moisture</Button>{' '}	
			<Button variant={(this.state.dataSelection === 'light') ? 'dark' : 'outline-dark'}
				onClick={() => this.setState({dataSelection: 'light'})}>
				Light</Button>{' '}		
		</div>
		<div> Data Selection 2 </div>
		<div>
			<Button variant={(this.state.dataSelection2 === 'temperature') ? 'primary' : 'outline-primary'}
				onClick={() => this.setState({dataSelection2: 'temperature'})}>
				Temperature</Button>{' '}	
			<Button variant={(this.state.dataSelection2 === 'humidity') ? 'primary' : 'outline-primary'}
				onClick={() => this.setState({dataSelection2: 'humidity'})}>
				Humidity</Button>{' '}	
			<Button variant={(this.state.dataSelection2 === 'soilMoisture') ? 'primary' : 'outline-primary'}
 				onClick={() => this.setState({dataSelection2: 'soilMoisture'})}>
				Soil Moisture</Button>{' '}	
			<Button variant={(this.state.dataSelection2 === 'light') ? 'primary' : 'outline-primary'}
				onClick={() => this.setState({dataSelection2: 'light'})}>
				Light</Button>{' '}		
		</div>

		</div>;

	}

}
async function parseData(data) {
	let cleanData = {
		gardenID : [],
		timestamp: [],
		temperature: [],
		humidity: [],
		soilMoisture: [],
		light: []
	}

	for (var i = 0; i < data.length; i++) {
		cleanData.gardenID.push(data[i].GardenID);
		cleanData.timestamp.push(data[i].timestamp);
		cleanData.temperature.push(data[i].Payload.temperature);
		cleanData.humidity.push(data[i].Payload.humidity);
		cleanData.soilMoisture.push(data[i].Payload['soil moisture']);
		cleanData.light.push(data[i].Payload.light);
	}
	return cleanData;
}

function toTimestamp(year, month, day, hour, minute, second) {
	var datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
	return datum.getTime()/1000;
}

function parseForGardenId(data, id) {
	let gardenData = []
	for (var i = 0; i < data.length; i++) {
		if (data[i].gardenId === id) {
			gardenData.push(data[i])
		}
	}
	return gardenData;
}	

function convertForRecharts(data) {
	let chartData = []

	for (var i = 0; i < data.timestamp.length; i++) {
		var splitTimestamp = data.timestamp[i].split('-').join(',').split(':').join(',').split(' ').join(',').split(',')
		let curObject = {
					timestamp: toTimestamp(splitTimestamp[2], splitTimestamp[0], splitTimestamp[1], splitTimestamp[3], splitTimestamp[4], splitTimestamp[5]),
					light: data.light[i],
					temperature: data.temperature[i],
					humidity: data.humidity[i],
					soilMoisture: data.soilMoisture[i],
					gardenId: data.gardenID[i]
				}
		chartData.push(curObject);
	}
	return chartData;
}

export default App;

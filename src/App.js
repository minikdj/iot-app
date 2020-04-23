import React, {Component} from 'react';
//import Chart from './Chart'
//import './App.scss'
import TimeSeriesChart from './TimeSeriesChart.js'

class App extends Component {


	state = {
		loading: true,
		allData: null,
		chartData: []
	};

	async componentDidMount() {
		const url = "https://5h9n1wytff.execute-api.us-east-2.amazonaws.com/default/serverlessAppFunction";
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
				<TimeSeriesChart chartData={this.state.chartData} />
				)
			}
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
	console.log(cleanData)
	return cleanData;
}

function toTimestamp(year, month, day, hour, minute, second) {
	var datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
	return datum.getTime()/1000;
}

function convertForRecharts(data) {
	let chartData = []

	for (var i = 0; i < data.timestamp.length; i++) {
		var splitTimestamp = data.timestamp[i].split('-').join(',').split(':').join(',').split(' ').join(',').split(',')
		let curObject = {
					timestamp: toTimestamp(splitTimestamp[2], splitTimestamp[0], splitTimestamp[1], splitTimestamp[3], splitTimestamp[4], splitTimestamp[5]),
					light: data.light[i]
				}
		chartData.push(curObject);
	}
	console.log(chartData)
	return chartData;
}

export default App;

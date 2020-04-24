import React from 'react';
import Title from './Title.js';
import Graph from './Graph.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SensorCard from './SensorCard.js';
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class App extends React.Component {

	state = {
		loading: true,
		allData: null
	};

	async componentDidMount() {
		const url = "https://5h9n1wytff.execute-api.us-east-2.amazonaws.com/default/serverlessAppFunction";
		const response = await fetch(url);
		const data = await response.json();
		let cleanData = await parseData(data);
		console.log(cleanData);
		this.setState({allData: cleanData, loading: false});
	}

	render() {
		return(
			<div>
			<Title />
			<div className="cardHeader">
			<h2>Dan's Garden</h2>
			</div>
			{this.state.loading || !this.state.allData ?
				(<div>loading...</div>):
				<React.Fragment>
				<Container>
				<Row>
				<Col>
				<SensorCard sensorName={"Temperature"} unit ={"Fahrenheit"} sensorData={findAverage(this.state.allData.temperature, this.state.allData.gardenID, 0)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Light Level"} unit={"Lux"} sensorData={findAverage(this.state.allData.light, this.state.allData.gardenID, 0)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Humidity"} unit={"Grams per Cubic Meter"} sensorData={findAverage(this.state.allData.humidity, this.state.allData.gardenID, 0)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Soil Moisture"} unit={"Moisture Content"} sensorData={findAverage(this.state.allData.soilMoisture, this.state.allData.gardenID, 0)}/>
				</Col>
				</Row>
				</Container>
				</React.Fragment>
}
				<div style={{padding:30}}></div>
				<div className="cardHeader">
				<h2>Zach's Garden</h2>
				</div>
				{this.state.loading || !this.state.allData ?
					(<div>loading...</div>):
					<React.Fragment>
					<Container>
				<Row>
				<Col>
				<SensorCard sensorName={"Temperature"} unit ={"Fahrenheit"} sensorData={findAverage(this.state.allData.temperature, this.state.allData.gardenID, 2)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Light Level"} unit={"Lux"} sensorData={findAverage(this.state.allData.light, this.state.allData.gardenID, 2)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Humidity"} unit={"Grams per Cubic Meter"} sensorData={findAverage(this.state.allData.humidity, this.state.allData.gardenID, 2)}/>
				</Col>
				<Col>
				<SensorCard sensorName={"Soil Moisture"} unit={"Moisture Content"} sensorData={findAverage(this.state.allData.soilMoisture, this.state.allData.gardenID, 2)}/>
				</Col>
				</Row>
				</Container>
				</React.Fragment>
			}
			<div className="graph">
			<Graph sensorData={this.state.allData}/>
			</div>
			<div className="buttonGroup">
			<ButtonGroup toggle>
			<ToggleButton type="radio" name="showData" variant='dark' defaultChecked value="1">
			Temperature
			</ToggleButton>
			<ToggleButton type="radio" name="showData" variant='dark' value="2">
			Light Level
			</ToggleButton>
			<ToggleButton type="radio" name="showData" variant='dark' value="3">
			Humidity
			</ToggleButton>
			<ToggleButton type="radio" name="showData" variant='dark' value="3">
			Soil Moisture
			</ToggleButton>
			</ButtonGroup>
			</div>
			</div>
		);
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
	cleanData.timestamp = createDateObjs(cleanData.timestamp);
	return cleanData;
}

function findAverage(reading, gid, target) {
	var total = 0;
	var count = 0;
	for (var i=0; i < reading.length; i++){
		if (reading[i] > 0 && gid[i]===target){
			total = total + reading[i];
			count++;
		}
	}
	var average = (total / count).toFixed(1);
	return average;
}

function createDateObjs(timestamp){
		var dateObjs = [];
		var temp;
		for (var i=0; i < timestamp.length; i++){
			temp = new Date(timestamp[i]);
			dateObjs[i] = temp;
		}
		return dateObjs;
}

import React from 'react';

export default class App extends React.Component {


	state = {
		loading: true,
		allData: null
	};

	async componentDidMount() {
		const url = "https://5h9n1wytff.execute-api.us-east-2.amazonaws.com/default/serverlessAppFunction";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({allData: data, loading: false});
		let parsedData = parseData(data);
	}

	render() {
		return <div>
			{this.state.loading || !this.state.allData ? 
				(<div>loading...</div> ): 
				(<div>{JSON.stringify(this.state.allData)}</div>)
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
	return data.Payload;
}

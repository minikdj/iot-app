import React from 'react';

export default class App extends React.Component {

	state = {
		loading: true,
		dataPoint: null
	};

	async componentDidMount() {
		const url = "https://5h9n1wytff.execute-api.us-east-2.amazonaws.com/default/serverlessAppFunction";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({dataPoint: data[0], loading: false});
		console.log(data[0])
	}

	render() {
		return <div>
			{this.state.loading || !this.state.dataPoint ? 
				(<div>loading...</div> ): 
				(<div>{this.state.dataPoint.Payload.temperature}</div>)
			}
		</div>;
	}

}


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
		console.log(JSON.stringify(data))
	
		console.log(data[0])
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


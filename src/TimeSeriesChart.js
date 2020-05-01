import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  LineChart, 
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const TimeSeriesChart = ({ chartData, yAxis1, yAxis2, gardenId }) => (
	<LineChart
		width={1000}
		height={500}
		data={chartData}
		margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		}}
	>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="timestamp" />
		<YAxis yAxisId="left" />
	        <YAxis yAxisId="right" orientation="right" />
		<Tooltip />
		<Legend />
		<Line yAxisId="left" type="monotone" dataKey={yAxis1} label={yAxis1} stroke="#000000" activeDot={{ r: 8 }} strokeWidth={3}      />
		<Line yAxisId="right" type="monotone" dataKey={yAxis2} label={yAxis2} stroke="#6666ff" activeDot={{ r: 8 }} strokeWidth={3}	/> 
</LineChart>
);


TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired

}

export default TimeSeriesChart;

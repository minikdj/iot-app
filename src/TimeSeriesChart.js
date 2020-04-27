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
/*
const TimeSeriesChart = ({ chartData, yAxis }) => (
  <ResponsiveContainer width = '95%' height = {500} >
    <ScatterChart>
      <XAxis
        dataKey = 'timestamp'
        domain = {['auto', 'auto']}
        name = 'Time'
        tickFormatter = {chartData.timestamp}
        type = 'number'
      />
      <YAxis yAxisID="left" dataKey = {yAxis} name = {yAxis} />
      <YAxis yAxisID="right" orientation="right" dataKey = "humidity" name = "humidity" />
      <Scatter
        data = {chartData}
        line = {{ stroke: '#000' }}
        lineJointType = 'monotoneX'
        lineType = 'joint'
        name = 'Values'
      />
    </ScatterChart>
  </ResponsiveContainer>
)
*/
const TimeSeriesChart = ({ chartData, yAxis1, yAxis2 }) => (
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
		<Line yAxisId="left" type="monotone" dataKey={yAxis1} label={yAxis1} stroke="#ff0000" activeDot={{ r: 8 }} />
		<Line yAxisId="right" type="monotone" dataKey={yAxis2} label={yAxis2} stroke="#00ff00" /> 
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

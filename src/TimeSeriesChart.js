import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

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
      <YAxis dataKey = {yAxis} name = {yAxis} />
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

TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired

}

export default TimeSeriesChart;

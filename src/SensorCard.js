import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

function SensorCard(props) {
  return (
    <Card>
  <Card.Header>{props.sensorName}</Card.Header>
  <Card.Body>
    <blockquote className="blockquote mb-0">
      <p style={{fontSize:50}}>
      {props.sensorData}
      </p>
      <footer style={{fontSize:20}}>
        {props.unit}
      </footer>
    </blockquote>
  </Card.Body>
</Card>
  )
}

export default SensorCard

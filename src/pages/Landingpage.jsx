import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {

  // useNavigate() is a hook
  const navigate=useNavigate()

  const handleNavigate=()=>{
    // navigate to homepage
     navigate('/home')

  }

  return (
    <div>
        <Row className='align-items-center'>

            <Col></Col>

            <Col lg={6}>
                <h1>Welcome to Video.com</h1>
                <p >Where user can use their favourite videos user can upload any youtube videos by copying and paste their url. Video.com will allow to add and remove their uploaded videos and also arrange them in different catagories by drag and drop. It is free. Try it now!!!!!</p>
                <button onClick={handleNavigate} className='btn btn-success'>Click here to more</button>
            </Col>
            <Col lg={4}>
                <img className='img-fluid ms-5' src="https://media.istockphoto.com/id/176979702/photo/media-telecommunications-and-streaming-video-concept.jpg?s=612x612&w=0&k=20&c=-JcS01fMqG0OWxVqNyTzuMu4WNJrycAVwZ-lIigILKk=" alt=""  width={600} height={400}/>
            </Col>

            <Col></Col>

        </Row>
    </div>
  )
}

export default Landingpage
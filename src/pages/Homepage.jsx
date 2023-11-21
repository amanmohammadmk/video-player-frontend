import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Catageory from './Catageory'
import View from './View'
import Add from './Add'
import { Link } from 'react-router-dom'


function Homepage() {

  const [serverRes,setserverResponse]=useState({})

  const handleResponse=(res)=>{
    setserverResponse(res)
  }
  return (

  <>
      <div>
        <h1 className='text-info ms-5 mb-5'>All videocards</h1>
        
        <Link to={'/watchhistory'} className='mb-5 d-flex justify-content-end' style={{textDecoration:'none',fontSize:'25px',color:'blue'}}>Watch history</Link>

        <Row className='text-center'>

          <Col lg={1}>
            <Add handleRes={handleResponse}/>
          </Col>

          <Col lg={7}>
            <View serverRes={serverRes}/>
          </Col>

          <Col lg={4}>
            <Catageory/>
          </Col>

        </Row>

      </div>
  </>
  )
}

export default Homepage
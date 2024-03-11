import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceApi'

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  return (
    <Container>
      <Row className='d-flex justify-content-around'>
        <Col md={4} className='mt-3'>
          <h5 >{device.name}</h5>
          <Image width={540} height={400} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>

        <Col md={4}>
          <Card
            className='d-flex align-items-center justify-content-around flex-column mt-3'
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3 >Цена: {device.price} сум.</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
          </Card>

        </Col>
      </Row>
      
      <Row className='d-flex justify-content-center m-3'>
        <h1>Характеристики:</h1>
        {device.info.map((info, index) =>
          <Row key={info.id} 
          style={{ color: 'black', background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
           {info.title +":"} {info.description}

          </Row>
        )}
      </Row>

    </Container>
  )
}



export default DevicePage
import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import Pages from '../components/Pages'

const Shop = observer(() => {
  const {device} = useContext(Context)
  const {user} = useContext(Context)

  useEffect(()=>{
    fetchTypes().then(data =>device.setTypes(data))
    fetchBrands().then(data =>device.setBrands(data))
    fetchDevices(null,null,device.page,device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      
    })
  }, [])

  useEffect(()=>{
    fetchDevices(device.selectedType.id,device.selectedBrand.id,device.page, device.limit ).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page,device.selectedType,device.selectedBrand,])


  return (
    <Container style={{height:'100%',
      minHeight: 750,
    }}>
      <Row className='d-flex flex-direction-row mt-2' >
        <Col md={2} >
          <TypeBar />
          <BrandBar />
        </Col>
        <Col md={10} >
          <div>
          <h4 style={{margin: 15}}>{device.selectedType.name ? `${device.selectedType.name}` : 'Все категории товаров'}</h4>
          <h6 style={{marginLeft: 15,
              color: '#8492a6',
          }}>{device.selectedBrand.name ? `Производитель ${device.selectedBrand.name}` : ''}</h6>
          </div>
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
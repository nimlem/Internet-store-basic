import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import { Context } from '..'

const Admin = () => {
  
  
  const [brandVisible,setBrandVisible] = useState(false)
  const [typeVisible,setTypeVisible] = useState(false)
  const [deviceVisible,setDeviceVisible] = useState(false)

  return (
    <Container className='d-flex flex-column'
    style={{height:'100%',
      minHeight:750,
    }}>
      <div style={{width:'100%',
          display: 'flex',
          justifyContent: 'center'
      }}>
      <Button
        variant='outline-dark'
        className='m-3'
        onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>
      <Button
        variant='outline-dark'
        className='m-3'
        onClick={() => setBrandVisible(true)}>
        Добавить брэнд
      </Button>
      <Button
        variant='outline-dark'
        className='m-3'
        onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>
      </div>
    
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
    </Container>
  )
}

export default Admin
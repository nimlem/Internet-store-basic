import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { addToBasket, fetchOneDevice } from '../http/deviceApi'
import styles from '../components/styles.module.css'

const DevicePage = () => {

  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  const [isClicked, setIsClicked] = useState(false);
  const [isValidating, setIsValidating] = useState(false);


  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))

  }, [])

  const add = () => {
    handleClick()
    const formData = new FormData()
    formData.append('deviceId', id)
    addToBasket(formData)

  }

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsValidating(true);
      setTimeout(() => {
        setIsValidating(false);
      }, 1250);
    }, 2250);
  };

  const price = device.price
  const formatNumber = (number) => {
    if (typeof number !== 'undefined') {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return '';
  }
  const devicePrice = formatNumber(price)

  return (
    <Container style={{
      height: '100%',
      minHeight: 750,
    }}>
      <Row className='d-flex justify-content-center mt-3'>

        <Col md={10} className='mt-3'
          style={{
            maxHeight:500,
            width: 540,
            border: 'none',
            borderRadius: 20,
            // boxShadow: `2px 8px 16px rgba(0, 0, 0, .2)`,
          }}>

          <Image className={styles.device_page_img} src={process.env.REACT_APP_API_URL + '/' + device.img} />
        </Col>

        <Col style={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} md={3}>

          <Card
            style={{ height: 250 }}
            className={styles.card_device}

          > <div className={styles.device_card_name}><h5 >{device.name}</h5></div>

            <div className={styles.device_price}><h4  >Цена: {devicePrice} сум.</h4></div>


            <button
              id="button"
              className={`${styles.cart_button} ${isClicked ? styles.onclic : ''} ${isValidating ? styles.validate : ''}`}
              style={{ marginBottom: 15 }}
              onClick={add} >


            </button>

          </Card>

        </Col>
      </Row>

      <Row
        className=''
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}

      > <div style={{
        width: "95%",
        border: '0 solid rgba(0,0,0,0.5)',
        borderRadius: 30,
        margin: 'auto',
        marginTop: 25,
      }}>

          <h3 style={{ marginTop: 25 }}>Характеристики устройства</h3>

          <div className={styles.info_list}>

            {device.info.map((info, index) =>
              <div
                className={styles.list_title}
                style={{ color: 'black', background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 3 }}
                key={info.id}

              >
                <div className={styles.title_name}>{info.title + ": "}</div>
                <div className={styles.title_info}>{info.description}</div>

              </div>
            )}
          </div>
        </div>
      </Row>
    </Container >
  )
}



export default DevicePage

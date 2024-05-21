import React, { useContext, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../untils/consts'
import styles from './styles.module.css'
import { addToBasket, deleteDevice } from '../http/deviceApi'
import { Context } from '..'

const DeviceItem = ({ device }) => {
    const navigate = useNavigate()
    const { user } = useContext(Context)
    const price = device.price

    const formatNumber = (number) => {
        if (typeof number !== 'undefined') {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
        return '';
    }
    const devicePrice = formatNumber(price)

    const add = () => {

        const formData = new FormData()
        formData.append('deviceId', device.id)
        addToBasket(formData)

    }

    const removeDevice = (event) => {
        const id = event.target.id;
        deleteDevice(id)
        window.location.reload();
        console.log(id)
    }


    return (

        <div className={styles.card}  >

            <div className={styles.card_top} onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
                <a className={styles.card_img}><img src={process.env.REACT_APP_API_URL + device.img} /></a>
            </div>
            <div className={styles.card_name} onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}><a> {device.name}</a></div>

            <div className={styles.card_bottom}>
                <div className={styles.card_price}>{devicePrice} сум</div>

                <button className={styles.card_btn_add} onClick={add}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 3 16 16">
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                    </svg></button>
                {user.user.role === "ADMIN" ?
                    <Button id={device.id}
                        variant='outline-danger'
                        onClick={removeDevice}
                    >x
                    </Button>

                    :
                    ""
                }
            </div>


        </div>


    )
}

export default DeviceItem
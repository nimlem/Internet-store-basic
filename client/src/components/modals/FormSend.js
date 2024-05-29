import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from 'react-bootstrap'
import { getBasket, removeTheBasket } from "../../http/deviceApi";
import styles from '../styles.module.css'
import { Context } from "../../index";
import { TOKEN, CHAT_ID, URL_API } from "../../untils/consts"

const FormSend = ({ show, onHide }) => {

    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [deviceArray, setDeviceArray] = useState('')



    useEffect(() => {

        getBasket().then(data => device.setBaskets(data))

    }, [])

    useEffect(() => {
        
        const uniqueProducts = [...new Set(device.basket.map(product => `${product.device.id}. ${product.device.name}`))];
       
        setDeviceArray(uniqueProducts.join('\n'));

    }, [device.basket]);






    const sendMessageToTelegram = async (message) => {
        try {
            await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
            });
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
        }
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (name !== '' && phone !== '' && address !== '') {
            if (deviceArray !== '') {
                const message = `Заказ доставки №${user.user.id}\nИмя получателя: ${name}\nНомер телефона: ${phone}\nПолный адрес: ${address}\nТовары: \n${deviceArray}`;

                await sendMessageToTelegram(message);

                onHide();
                removeTheBasket()
                window.location.reload();
            } else {
                alert('В корзине нет товаров!');
            }
        } else {
            alert('Заполните необходимые данные!');
        }

    };




    return (
        <Modal
            id="form"
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >

            <Modal.Header closeButton className={styles.form_send}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформить доставку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                    
                     style={{width:350,}}
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите ваше имя"}
                        required />

                    <Form.Control
                     className="mt-2"
                     style={{width:350,}}
                        value={phone}
                        type="tel"
                        pattern="[0-9]*"
                        onChange={e => setPhone(e.target.value)}
                        placeholder={"Введите телефонный номер"}
                        required />
                    <Form.Control
                        className="mt-2"
                        style={{width:350,}}
                        value={address}
                        type="text"
                        onChange={e => setAddress(e.target.value)}
                        placeholder={"Введите полный адрес"}
                        required />

                    <span className="d-flex justify-content-center m-2">Товары</span>
                    {device.basket.map(product =>

                        <div className="d-flex" key={product.device.id}>
                            <img src={process.env.REACT_APP_API_URL + product.device.img} width={100}></img>
                            <input
                                style={{
                                    width: '100%',
                                    marginBottom: 5,
                                    border: 'none'
                                }}
                                key={product.device.id}
                                type="text"
                                className="d-flex align-items-center"
                                value={`${product.device.id}. ${product.device.name}`}
                                readOnly
                            />

                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button type="submit" variant="outline-success" onClick={handleSubmit}>Отправить</Button>
            </Modal.Footer>

        </Modal>

    )
}

export default FormSend
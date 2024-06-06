import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getBasket, removeFromBasket, removeTheBasket } from '../http/deviceApi';

import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import FormSend from '../components/modals/FormSend';
import styles from './../components/styles.module.css'

const Basket = observer(() => {
    const { device } = useContext(Context)
    const [formVisible, setFormVisible] = useState(false)

    useEffect(() => {

        getBasket().then(data => device.setBaskets(data))
    }, [])

    const removeDevice = (event) => {
        const deviceId = event.target.id;
        removeFromBasket(deviceId)
        window.location.reload();
    }

    let prices = 0;
    {
        device.basket.map(price =>
            prices += Number(price.device.price)

        )
    }

    const formatNumber = (number) => {
        if (typeof number !== 'undefined') {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
        return '';
    }

    return (

        <div className='container_basket d-flex'
            style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                minHeight:750,
            }}
        // className="product_list d-flex flex-sm-column justify-content align-items-start mt-3" 

        >

            <div className='content_basket '
                style={{ width: '70%' }}
            >
                <div>
                    <h2 className="pt-3">Корзина</h2>
                </div>

                <div className='deviceList'
                    style={{ marginLeft: 10 }}
                >
                    <div className={styles.categories_top}>
                        <div className={styles.left_top}>
                            <div className={styles.name_top}>ПРОДУКТ</div>
                        </div>

                        <div className={styles.right_top}>
                            <div className={styles.price_top}>ЦЕНА</div>
                            
                        </div>
                    </div>

                    <div className='card_list'>
                        {device.basket.map(product =>

                            <Card className={styles.basket_device_card} key={product.id}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>

                                <div className={styles.card_info_right} >
                                    <div className='d-flex align-items-center'
                                        style={{
                                            marginLeft: 10,

                                        }}>
                                        <img src={process.env.REACT_APP_API_URL + '/' + product.device.img} width={100} />
                                        <h6 className={styles.basket_device_card_name}>{product.device.name}</h6>
                                    </div>
                                </div>

                                <div className={styles.card_info_left}>
                                    <div className="d-flex  flex-row justify-content-end align-items-center">
                                        <h5 className={styles.basket_device_card_price}>{formatNumber(product.device.price)} сум</h5>
                                    </div>
                                    <div className={styles.info_left_btn}>
                                        <Button
                                            id={product.device.id}
                                            style={{ marginLeft: 10 }}
                                            variant='outline-danger'
                                            onClick={removeDevice}

                                        >
                                            х
                                        </Button>
                                    </div>
                                </div>



                            </Card>

                        )}
                    </div>

                </div>


                <Card className={styles.basket_card_footer}>

                    <div>
                        <h6 className={styles.card_footer_name}>Итого: <span style={{fontSize:18}}>{formatNumber(prices)} сум</span> </h6>
                    </div>

                    <div className=''>
                        <Button
                            variant='outline-dark'
                            className=''
                            onClick={() => setFormVisible(true)}>
                            Оформить заказ!
                        </Button>

                    </div>

                </Card>

                <FormSend show={formVisible} onHide={() => setFormVisible(false)} />
            </div>



        </div>
    )

});

export default Basket;

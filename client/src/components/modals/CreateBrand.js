import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBrand, removeOneBrand } from '../../http/deviceApi'
import { Context } from '../..'

const CreateBrand = ({ show, onHide }) => {

    const [value, setValue] = useState('')

    const { device } = useContext(Context)

    const addBrand = () => {
        createBrand({ name: value }).then(data => {
            setValue('')
            onHide()
            window.location.reload();
        })
    }
    const removeBrand = (event) => {
        const brandId = event.target.id;
        removeOneBrand(brandId)
        window.location.reload();
        console.log(brandId)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Брэнды товаров
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                    <h6 className='mb-3'>Созданные брэнды товаров</h6>
                    {device.brands.map(brand =>
                        <div className='d-flex justify-content-between m-2'
                            key={brand.id}>
                            <span>{brand.name}</span>
                            <Button id={brand.id}
                                variant='outline-danger'
                                 onClick={removeBrand}
                            >x</Button>
                        </div>)}
                </div>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название брэнда"} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType, fetchTypes, removeOneType } from '../../http/deviceApi'
import { Context } from '../..'


const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('')

    const { device } = useContext(Context)


    const addType = () => {
        createType({ name: value }).then(data => {
            setValue('')
            onHide()
            window.location.reload();
        })
    }

    const removeType = (event) => {
        const typeId = event.target.id;
        removeOneType(typeId)
        window.location.reload();
        console.log(typeId)
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
                    Тип товаров
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6 className='mb-3'>Созданные типы товаров</h6>
                    {device.types.map(type =>
                        <div className='d-flex justify-content-between m-2'
                            key={type.id}>
                            <span>{type.name}</span>
                            <Button id={type.id}
                                variant='outline-danger'
                                onClick={removeType}
                            >Удалить</Button>
                        </div>)}
                </div>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType
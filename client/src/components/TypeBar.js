import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
    const { device } = useContext(Context)

    
    return (
        <ListGroup >
            <ListGroup.Item
                style={{ cursor: 'pointer', fontWeight: 500, }}
                active={device.types.id === device.selectedType.id}
                onClick={() => device.setSelectedType([])}>Все товары</ListGroup.Item>
            {device.types.map(type =>

                <ListGroup.Item
                    style={{ cursor: 'pointer', }}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >

                    <span style={{
                        fontSize: '85%',
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{type.name}</span>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default TypeBar
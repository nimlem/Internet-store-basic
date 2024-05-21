import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Card, Row } from 'react-bootstrap'


const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (

        <Row className='d-flex justify-content-center pt-2'>
            <Card
                style={{ cursor: 'pointer', width: '90%', alignItems: "center", justifyContent: 'center', border: '1px solid', backgroundColor: "white" }}
                className='p-2'
                onClick={() => device.setSelectedBrand('')}
                border={device.brands.name === device.selectedBrand.name ?  'danger' : 'light'}>Все бренды</Card>
            {device.brands.map(brand =>
                <Card key={brand.id}
                    style={{ cursor: 'pointer', width: 80, alignItems: "center", border: '1px solid', backgroundColor: "white",fontWeight: 450,}}
                    className='p-2'
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                   {brand.name}
                </Card>

            )}
        </Row>
    )
})

export default BrandBar
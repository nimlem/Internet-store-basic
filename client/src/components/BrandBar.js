import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Card, Row} from 'react-bootstrap'


const BrandBar = observer(() => {
    const { device } = useContext(Context)

    return (

        <Row className='d-flex'>
            {device.brands.map(brand =>
                <Card key={brand.id}
                    style={{ cursor: 'pointer', width: 100, alignItems: "center" }}
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
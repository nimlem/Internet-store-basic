import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
import styles from './styles.module.css'

const DeviceList = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className={styles.device_list}
            >
            {device.devices.map(device =>
                    <DeviceItem  key = {device.id} device = {device}></DeviceItem>
                )}
        </Row>
    )
})

export default DeviceList
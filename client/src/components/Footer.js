import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './styles.module.css'

const Footer = observer(() => {
   
    return (
       <div className={styles.footer_container}> <span className='d-flex align-items-center justify-content-center' style={{color: 'white',width: '15%',height: '100%',}}>@Copyright 2024</span></div>
    )
})

export default Footer
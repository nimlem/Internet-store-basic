import React, { useContext, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../untils/consts'
import { login, registration } from '../http/userApi'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import styles from '../components/styles.module.css'


const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);

            }
            user.setUser(data)
            user.setIsAuth(true)
            if (user.user.role == "ADMIN") {
                user.setIsAdmin(true)
            }
            navigate(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }

    }




    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 55 }}
        >
            <Card className={styles.modal_auth}>

                <h2 className={styles.h2}> {isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                <Form className={styles.form_box} >
                    <Form.Control
                        className={styles.form_input}
                        placeholder='Введите ваш логин...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Control
                        className={styles.form_input}
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <div className=''>
                        <div>
                            <Button
                                className={styles.form_btn}
                                variant={'outline-success'}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </div>
                        <div className={styles.login_register}>
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Создать акканут</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти </NavLink>
                                </div>}
                        </div>

                    </div>

                </Form>
            </Card>
        </Container>
    )
})

export default Auth
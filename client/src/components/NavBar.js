import React, { useContext, useState } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../untils/consts';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'




const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    
    const [prevLocation, setPrevLocation] = useState(window.location.href);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth({})
        user.setIsAdmin(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    
    const reload = () => {

        const currentLocation = window.location.href;
        if (prevLocation !== currentLocation) {
            setPrevLocation(currentLocation);
        } else {
            setTimeout(() => {
                window.location.reload();
            },)
        }


    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} onClick={reload}
                    style={{ textDecoration: 'none', color: 'White' ,marginLeft: 30}}
                > ACER Computers </NavLink>
                {user.isAuth == true ?
                    <Nav className="ml-auto" >
                        {user.user.role ==="ADMIN" ? 
                            <Button
                            className={styles.material_icons}
                            variant={"outline-light"}
                            style={{ marginRight: 5 }}
                            onClick={() => navigate(ADMIN_ROUTE)}>
                            Админ панель
                        </Button>
                        :
                        <div style={{
                            display: 'flex',
                            color: 'white',
                            marginRight: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}> Пользователь {user.user.email}</div>
                        }
                        <Button
                            className={styles.material_icons}
                            variant={"outline-light"}
                            style={{ marginRight: 5 }}
                            onClick={() => navigate(BASKET_ROUTE)}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                            </svg>

                            <span style={{ marginLeft: 5 }} >Корзина</span>
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            style={{ marginLeft: 5 }} >
                            Выйти
                        </Button>
                    </Nav>

                    :

                    <Nav className="ml-auto">
                        <NavLink to={LOGIN_ROUTE}><Button variant={"outline-light"} > Войти </Button></NavLink>
                    </Nav>
                }

            </Container>
        </Navbar >
    )
})

export default NavBar
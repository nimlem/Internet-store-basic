import React, { useContext } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../untils/consts';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}> MELORE </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        {user.role === 'USER' && (
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        )}
                        <Button
                            variant={"outline-light"} style={{ marginLeft: 5 }}
                            onClick={() => {logOut();navigate(SHOP_ROUTE)}}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    
                    <Nav className="ml-auto">
                        <NavLink to={LOGIN_ROUTE}><Button variant={"outline-light"}> Авторизация </Button></NavLink>
                    </Nav>
                }
                
            </Container>
        </Navbar >
    )
})

export default NavBar
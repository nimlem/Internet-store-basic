import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';
import Footer from './components/Footer';
import image from './image/imageMain.png';
import styles from './components/styles.module.css';

const App = observer(() => {
  const { user, device } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      {/* <img className={styles.image_main} src={image}></img> */}
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
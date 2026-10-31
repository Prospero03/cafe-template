import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

if (typeof window !== 'undefined'){
  require('./Header.scss')
}

const Header = (props) => {
    return (
        <header className='header'>
          <div className='header__container main-container'>

            <NavLink className='header__logo' to="/">
              Логотип
            </NavLink>

            <div className='header__wrap'>
              <div>Адрес</div>
              <search>Поиск</search>
            </div>


            <div className='header__wrap'>
              <nav className='header__nav'>
                <NavLink className='header__profile'  to='/profile'>
                  {/* <img src='' alt='' /> */}
                </NavLink>
                <NavLink className='header__cart'  to='/basket'>
                  Корзина
                </NavLink>
              </nav>
            </div>

          </div>
        </header>
    )
}

export default Header
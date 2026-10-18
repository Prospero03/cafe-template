import React from 'react'

if (typeof window !== 'undefined'){
  require('./Footer.scss')
}

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container main-container'>
        Footer
      </div>
    </footer>
  )
}

export default Footer
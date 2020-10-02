import React from 'react'
import './Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
           <div className="header--logo">
               <a href="/">
                   <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-2-1.png" />
               </a>
           </div>
           <div className="header--user">
               <a href="/">
                   <img src="https://img.pngio.com/customer-login-avatar-head-portrait-client-user-png-transparent-png-avatar-600_500.png" />
               </a>
           </div>
        </header>
    )
}

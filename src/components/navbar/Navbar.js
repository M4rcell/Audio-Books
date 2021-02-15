import React, { Fragment } from 'react'
import './style.scss'
import { NavLink,Link } from 'react-router-dom'

const Navbar = props => {
    return (
        <Fragment>

        <nav>
            <div className="container">
                <div className="navbar-left">
                   <NavLink 
                        activeClassName="active"
                        className="nav-item" 
                        exact
                        to="/marvel"
                    >
                        home
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item" 
                        exact
                        to="/admin"
                    >
                        Administrar
                        
                   </NavLink>
                </div>
               
            </div> 
        </nav>
        

        </Fragment>
    )
}

Navbar.propTypes = {

}

export default Navbar

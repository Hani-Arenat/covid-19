import React from 'react'
import CovidLogo from '../../assets/covid.png'
import {NavLink} from "react-router-dom"

import './header.css'
const Header = props=>{
    
    return(
        <div className="Toolbar">
            <div className="menu">
            <NavLink className="app-name" exact to="/"> Covid-19 App</NavLink>
            </div>
            <div className="logo">
            
                <img className="covid-logo" src={CovidLogo} alt="logo" />
            </div>
            <div className="nav">
                <ul>
                    <li><NavLink exact to="/CovidInfo"> Info Chart</NavLink></li>
                    <li><NavLink exact to="/TimeSeries"> Statistics Chart</NavLink></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header;
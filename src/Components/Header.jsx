import React from 'react'

import Scores from './Scores'
import './Header.css'

const Header = () => {
    return(
        <div className="header">
            <div className="instruction">
                <h4>HOW TO PLAY</h4>
                <p>Objective: The player must non-repeatedly click the same champion.</p>
            </div>
            <Scores />
        </div>
    )
}

export default Header;
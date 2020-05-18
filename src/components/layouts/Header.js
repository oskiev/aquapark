import React, { Component } from 'react';
import logo from '../../unionpark-logo.png';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <div className="header-toggle">
                        <div onClick={this.props.onClick}><i className="fas fa-bars"></i></div>
                    </div>
                    <a href="/"><img src={logo} className="header-logo-img" alt="Union AquaPark" /></a>
                </div>
                <div className="header-info">Aquapark Name Here</div>
                <div className="header-menu"></div>
            </div>
        );
    }
}

export default Header;

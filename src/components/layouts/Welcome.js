import React, { Component } from 'react';
import product from '../../assets/product1.png';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <div className="wrap">
                    <img src={product} alt="Aquapark" />
                    <h1 className="welcome-heading">Union Aquaparks 3D Builder</h1>
                    <span className="welcome-bar"></span>
                    <h2 className="welcome-subheading">PERSONALIZE YOUR <span>AQUA</span> PARK</h2>
                    <div className="welcome-actions">
                        <Link to="/new-aquapark" className="btn btn--orange" onClick={this.props.onClick}>BUILD NEW AQUAPARK</Link>
                        <a href="/my-aquaparks" className="btn btn--gray">MY AQUAPARKS</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;

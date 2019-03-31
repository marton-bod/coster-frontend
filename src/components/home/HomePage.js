import React from 'react'
import logo from '../../images/logo.png';
import ImageFadeIn from 'react-image-fade-in'

const HomePage = () => {
    return (
        <div className="dashboard-page">
            <ImageFadeIn className="logo" src={logo} opacityTransition={4.5} />
            <div className="type-line typewriter">
                <h5>Welcome to Coster.io. Get started today!</h5>
            </div>
            <div className="home-tagline">Super easy, online cost tracking and analytics</div>

        </div>
    )
}

export default HomePage
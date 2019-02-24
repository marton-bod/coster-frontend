import React from 'react'
import logo_charts from '../../logo_charts.png';
import ImageFadeIn from 'react-image-fade-in'

const HomePage = () => {
    return (
        <div className="dashboard-page">
            <ImageFadeIn className="logo" src={logo_charts} opacityTransition={3.5} />
            <div className="type-line typewriter">
                <h5>The best-in-class cost tracking web application.</h5>
            </div>
        </div>
    )
}

export default HomePage
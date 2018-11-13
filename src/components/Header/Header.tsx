import * as React from 'react';

const SantaJumbotron = () => {
    return (
        <div id="hero">
            <div className="redoverlay">
                <div className="container">
                    <div className="row">
                        <div className="herotext">
                            <h2 className="wow zoomInDown" data-wow-duration="3s">Secret Santa</h2>

                            <img className="bigbell wow tada infinite" data-wow-duration="30s" src="img/bell.png" alt="" />
                        </div>

                        <div className="santa wow bounceInDown" data-wow-duration="2s">
                            <img src="img/santa.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SantaJumbotron;
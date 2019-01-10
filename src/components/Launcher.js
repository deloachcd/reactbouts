import React from 'react';
import { StandardButton } from './Buttons';

import logo from './img/logo.png';

function Launcher(props) {
    return (
        <div>
            <div className="center" id="logo">
                <img src={logo} alt="logo" className="bouts-logo" />
                <h1>ReactBouts</h1>
                <StandardButton text="Random bouts"
                                onClick={() => props.onClick("Random")} />
                <StandardButton text="Ranked bouts"
                                onClick={() => props.onClick("Ranked")} />
                <div className="padded-small-text">
                    <small>
                        Created by Chandler DeLoach
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Launcher;
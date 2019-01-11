import React from 'react';

import shuffle from './algorithm/shuffle';

import Launcher from './components/Launcher';
import NameEntryRoster from './components/NameEntryRoster';
import BoutsContainer from './components/BoutsContainer';

class LaunchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active_mode: null,
            names_submitted: null,
        }

        this.changeMode = this.changeMode.bind(this)
    }

    getActiveModePrintable() {
        let printable;
        if (this.state.active_mode) {
            if (this.state.active_mode === "Ranked") {
                printable = "Ranked bouts";
            } else if (this.state.active_mode === "Random") {
                printable = "Random bouts";
            }
        } else {
            printable = "None"; // shouldn't be any use for this case
        }
        return printable;
    }

    changeMode(new_mode) {
        this.setState({active_mode: new_mode});
    }

    setNamesSubmitted(new_names) {
        const active_mode = this.state.active_mode;
        this.setState({
            active_mode: active_mode,
            names_submitted: new_names,
        })
    }

    render() {
        if (!this.state.active_mode) {
            return <Launcher onClick={(new_mode) => this.changeMode(new_mode)}/>;
        } else if (!this.state.names_submitted) {
            return (
                <div className="center">
                    <h2 className="padded-title">
                        {this.getActiveModePrintable()}
                    </h2>
                    <NameEntryRoster resetButtonClick={() =>
                        this.changeMode(null)
                    } startButtonClick={(names) => {
                        shuffle(names);
                        this.setNamesSubmitted(names);
                    }}/>
                </div>
            )
        } else {
            return (
                <div className="center">
                    <h2 className="padded-title">
                        {this.getActiveModePrintable()}
                    </h2>
                    <BoutsContainer onClick={() => {
                                             this.setState({
                                                 active_mode: null,
                                                 names_submitted: null,
                                             })}}
                                           names={this.state.names_submitted}
                                           />
                </div>
            )
        }
    }
}

export default LaunchPage;
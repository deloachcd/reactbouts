import React from 'react';
import { StandardButton, StartButton,
         WinButton, ResetButton } from './Buttons';

class BoutTimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total_seconds: 0,
            next_second_timeout: null,
        };

        this.getFormattedTime.bind(this);
        this.incrementTime.bind(this);
    }

    incrementTime() {
        // Increment timer by a single second, provided
        // the timer is active
        const total_seconds = this.state.total_seconds;
        const next_second_timeout = this.state.next_second_timeout;

        this.setState({
            total_seconds: (this.props.timer_paused) ? total_seconds
                                                     : total_seconds+1,
            next_second_timeout: next_second_timeout,
        })
    }

    getFormattedTime() {
        const total_seconds = this.state.total_seconds;
        const minutes = Math.floor(total_seconds / 60);
        const seconds = String(Math.floor(total_seconds % 60));
        const seconds_fmt = (seconds.length < 2) ? '0' + seconds : seconds;

        return `${minutes}:${seconds_fmt}`;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.incrementTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="nes-container fixed-width-timer center">
                <h2>{this.getFormattedTime()}</h2>
            </div>
        );
    }
}

class Bout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timer_paused: true,
            status: "not started",
            winner: null,
        }

        this.setRenderContentFromState.bind(this);
        this.declareWinner.bind(this);
        this.startBout.bind(this);
        this.flipTimer.bind(this);
    }

    declareWinner(combatant) {
        this.setState({
            timer_paused: true,
            status: "winner declared",
            winner: combatant,
        });
    }

    startBout() {
        this.setState({
            timer_paused: false,
            status: "in progress",
            winner: null,
        });
    }

    flipTimer() {
        this.setState({
            timer_paused: !this.state.timer_paused,
            status: this.state.status,
            winner: this.state.winner,
        });
    }

    setRenderContentFromState() {
        const combatant_1 = this.props.combatant_1;
        const combatant_2 = this.props.combatant_2;

        if (this.state.status === "not started") {
            return (
                <div>
                    <h2 className="vertical-margin">
                        {combatant_1}&nbsp;vs.&nbsp;{combatant_2}
                    </h2>
                    <StartButton text="Start bout"
                                 onClick={() => this.startBout()}/>
                </div>
            );
        } else if (this.state.status === "in progress") {
            let button;
            if (!this.state.timer_paused) {
                button = <StandardButton text="Pause bout"
                                         onClick={() => this.flipTimer()}/>
            } else {
                button = <StandardButton text="Resume bout"
                                         onClick={() => this.flipTimer()}/>
            }
            return (
                <div>
                    <h2 className="vertical-margin">
                        <WinButton onClick={() =>
                                       this.declareWinner(combatant_1)
                                   }/>
                        &nbsp;&nbsp;{combatant_1}
                        &nbsp;vs.&nbsp;
                        {combatant_2}&nbsp;&nbsp;
                        <WinButton onClick={() =>
                                       this.declareWinner(combatant_2)
                                   }/>
                    </h2>
                    {button}
                </div>
            );
        } else if (this.state.status === "winner declared") {
            if (this.state.winner === combatant_1) {
                return (
                    <div>
                        <h2 className="vertical-margin">
                            <i className="nes-icon trophy is-medium"></i>
                            &nbsp;{combatant_1}&nbsp;wins!&nbsp;
                            <i className="nes-icon trophy is-medium"></i>
                            <br/><br/>
                            <small className="vertical-margin">
                                Runner-up:&nbsp;{combatant_2}
                            </small>
                        </h2>
                    </div>
                );
            } else if (this.state.winner === combatant_2) {
                return (
                    <div>
                        <h2 className="vertical-margin">
                            <i className="nes-icon trophy is-medium"></i>
                            &nbsp;{combatant_2}&nbsp;wins!&nbsp;
                            <i className="nes-icon trophy is-medium"></i>
                            <br/><br/>
                            <small className="vertical-margin">
                                Runner-up:&nbsp;{combatant_1}
                            </small>
                        </h2>
                    </div>
                );
            }
            return (
                <div>
                    <h2 className="vertical-margin">
                        {this.state.winner} wins!
                    </h2>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nes-container with-title vertical-margin center">
                <h2 className="title">Bout #{this.props.bout_number}</h2>
                <BoutTimer timer_paused={this.state.timer_paused}/>
                {this.setRenderContentFromState()}
            </div>
        );
    }
};

class BoutsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.printNames = this.printNames.bind(this);
        this.generateBouts = this.generateBouts.bind(this);
    }

    generateBouts() {
        let bouts = [], names = this.props.names;
        if (names.length > 1) {
            if (names.length % 2 === 0) {
                // Even number of combatants, easy case
                for (let i = 0; i < names.length; i += 2) {
                    bouts.push(<Bout bout_number={Math.floor(i/2) + 1}
                                     key={Math.floor(i/2) + 1}
                                     combatant_1={names[i]}
                                     combatant_2={names[i+1]}/>);
                }
            } else {
                // Odd number of combatants
                for (let i = 0; i < names.length-1; i += 2) {
                    bouts.push(<Bout bout_number={Math.floor(i/2) + 1}
                                     key={Math.floor(i/2) + 1}
                                     combatant_1={names[i]}
                                     combatant_2={names[i+1]}/>);
                }
                // Randomly pick a person who has already been placed
                // in a bout to compete with final combatant
                let l = names.length-1, 
                    r = Math.floor(Math.random() * (names.length-1));
                bouts.push(<Bout bout_number={Math.floor(l/2) + 1}
                                 key={Math.floor(l/2) + 1}
                                 combatant_1={names[l]}
                                 combatant_2={names[r]}/>);
            }
        } else {
            bouts = ["Not enough combatants to generate any bouts!"];
        }
        return bouts;
    }

    printNames() {
        let names_printable = ""
        for (let i = 0; i < this.props.names.length; i++) {
            names_printable += this.props.names[i] + ", ";
        }
        return names_printable;
    }
    
    render() {
        return (
            <div className="width80">
                {this.generateBouts()}
                <ResetButton text="Return to menu"
                                onClick={this.props.onClick}
                                shouldConfirm={true}/>
            </div>
        );
    }
}

export default BoutsContainer;
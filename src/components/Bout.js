import React from 'react';
import { StandardButton, StartButton,
         WinButton } from './Buttons';
import BoutTimer from './BoutTimer';

class Bout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timer_paused: true,
            status: "not started",
            winner: null,
            runner_up: null,
        }

        this.setRenderContentFromState.bind(this);
        this.declareWinner.bind(this);
        this.startBout.bind(this);
        this.flipTimer.bind(this);
    }

    declareWinner(winner, runner_up) {
        this.setState({
            timer_paused: true,
            status: "winner declared",
            winner: winner,
            runner_up: runner_up,
        });
        this.props.recordBoutResult(winner, runner_up);
    }

    startBout() {
        this.setState({
            timer_paused: false,
            status: "in progress",
            winner: null,
            runner_up: null,
        });
    }

    flipTimer() {
        this.setState({
            timer_paused: !this.state.timer_paused,
            status: this.state.status,
            winner: this.state.winner,
            runner_up: this.state.runner_up,
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
                                       this.declareWinner(combatant_1,
                                                          combatant_2)
                                   }/>
                        &nbsp;&nbsp;{combatant_1}
                        &nbsp;vs.&nbsp;
                        {combatant_2}&nbsp;&nbsp;
                        <WinButton onClick={() =>
                                       this.declareWinner(combatant_2,
                                                          combatant_1)
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
                            &nbsp;{combatant_1}&nbsp;wins!&nbsp;
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
                            &nbsp;{combatant_2}&nbsp;wins!&nbsp;
                            <br/><br/>
                            <small className="vertical-margin">
                                Runner-up:&nbsp;{combatant_1}
                            </small>
                        </h2>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h2 className="vertical-margin">
                            How the hell did you get this state?
                        </h2>
                    </div>
                );
            }
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

export default Bout;
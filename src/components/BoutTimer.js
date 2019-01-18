import React from 'react';

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

export default BoutTimer;
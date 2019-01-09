import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.png';
import './nes.css';
import './press_start_2P.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import shuffle from './shuffle.js'

// import {create_bout_sequence,
//         get_num_bouts} from './bout_order_algorithm.js';

function StandardButton(props) {
    return <button type="button"
                   className="nes-btn padded-btn"
                   onClick={props.onClick}>{props.text}</button>;

}

function StartButton(props) {
    return <button type="button"
                   className="nes-btn padded-btn wide-btn is-success"
                   onClick={props.onClick}>{props.text}</button>;

}

function ResetButton(props) {
    return <button type="button"
                   className="nes-btn padded-btn wide-btn"
                   onClick={() => {
                       if (props.shouldConfirm) {
                           if (window.confirm(
                               "Are you sure you want to start over completely?"))
                           {
                               props.onClick();
                           } 
                       } else {
                           props.onClick();
                       }
                   }}>
                {props.text}
           </button>;
}

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

class NameEntryField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getCurrentName = this.getCurrentName.bind(this);
    }

    getCurrentName() {
        return this.state.value;
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value);
    }

    render() {
        return <label htmlFor="name_field">
            Fencer #{this.props.id}:
            <input type="text" className="nes-input"
                   onChange={this.handleChange} />
        </label>
    }
}

class NameEntryRoster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name_entry_fields: [], 
            names_entered: [],
        }

        this.addNameEntryField = this.addNameEntryField.bind(this);
        this.removeNameEntryField = this.removeNameEntryField.bind(this);
        this.getNames = this.getNames.bind(this);
        this.updateName = this.updateName.bind(this);
        this.hasNamesOnRoster = this.hasNamesOnRoster.bind(this);
    }

    addNameEntryField() {
        var new_fields = this.state.name_entry_fields.slice();
        var new_names = this.state.names_entered.slice();
        var combatant_num = new_fields.length+1;
        new_names.push("");
        new_fields.push(<NameEntryField id={combatant_num}
                                        key={combatant_num}
                                        onChange={(id, new_name) =>
                                            this.updateName(id, new_name)
                                        }/>);
        this.setState({
            name_entry_fields: new_fields,
            names_entered: new_names,
        })
    }

    removeNameEntryField() {
        var new_fields = this.state.name_entry_fields.slice();
        var new_names = this.state.names_entered.slice();
        new_fields.pop();
        new_names.pop();
        this.setState({
            name_entry_fields: new_fields,
            names_entered: new_names,
        });
    }

    updateName(id, new_name) {
        var new_names = this.state.names_entered.slice();
        new_names[id-1] = new_name;
        this.setState({
            name_entry_fields: this.state.name_entry_fields,
            names_entered: new_names,
        });
    }

    getNames() {
        this.state.names_entered.map(console.log);
    }

    hasNamesOnRoster() {
        let has_names = !(this.state.names_entered.length === 0)
        return has_names;
    }

    render() {
        return (
            <div className="nes-container with-title width60">
                <h2 className="title">Fencer names</h2>
                <div>
                    {this.state.name_entry_fields}
                </div>
                <div>
                    <StandardButton text="Add fencer"
                                    onClick={this.addNameEntryField}/>
                    <StandardButton text="Remove fencer"
                                    onClick={this.removeNameEntryField}/>
                </div>
                <div>
                    <StartButton text="Start bouts"
                                 onClick={() => this.props.startButtonClick(
                                     this.state.names_entered
                                 )}/>
                </div>
                <div>
                    <ResetButton text="Return to menu"
                                 onClick={this.props.resetButtonClick}
                                 shouldConfirm={this.hasNamesOnRoster()}/>
                </div>
            </div>
        );
    }
}

function Bout(props) {
    return (
        <div className="nes-container with-title vertical-margin">
            <h2 className="title">Bout #{props.bout_number}</h2>
            <p>{props.combatant_1} vs. {props.combatant_2}</p>
        </div>
    );
}

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
            <div className="nes-container width80 with-title">
                <h2 className="title">(The Bouts)</h2>
                {this.generateBouts()}
                <ResetButton text="Return to menu"
                                onClick={this.props.onClick}
                                shouldConfirm={true}/>
            </div>
        );
    }
}

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

ReactDOM.render(<LaunchPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

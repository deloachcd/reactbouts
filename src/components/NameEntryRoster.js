import React from 'react';

import {StandardButton, ResetButton, StartButton} from './Buttons';

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

export default NameEntryRoster;
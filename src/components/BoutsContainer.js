import React from 'react';
import { ResetButton } from './Buttons';

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

export default BoutsContainer;
import React from 'react';
import { ResetButton } from './Buttons';
import { create_bout_sequence } from './algorithm/bout_order_algorithm'
import Bout from './Bout';
import Leaderboard from './Leaderboard';

class BoutsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score_grid: Array(this.props.names.length).fill(
                Array(this.props.names.length).fill(0)
            ),
        }

        this.printNames = this.printNames.bind(this);
        this.recordBoutResult = this.recordBoutResult.bind(this);
        this.generateRandomBouts = this.generateRandomBouts.bind(this);
        this.generateRankedBouts = this.generateRankedBouts.bind(this);
        this.generateRankings = this.generateRankings.bind(this);
    }

    recordBoutResult(winner, runner_up) {
        function array2d_modify_value(array, i, j, value) {
            // Equivalent to what sane programmers would expect
            // `array[i][j] = value` to do, why this somehow modifies
            // entire columns in this context is beyond me
            let before = array[i].slice(0,j)
            let new_value = [value]
            let after = array[i].slice(j+1)
            array[i] = before.concat(new_value).concat(after)
        }

        let winner_id = this.props.names.indexOf(winner);
        let runner_id = this.props.names.indexOf(runner_up);
        let new_score_grid = this.state.score_grid.slice();
        
        array2d_modify_value(new_score_grid, winner_id, runner_id, 2);
        array2d_modify_value(new_score_grid, runner_id, winner_id, -1);
        
        this.setState({
            score_grid: new_score_grid,
        });
    }

    generateRankings() {
        function has_non_zero_values(score_grid_row) {
            // Used to determine whether or not a combatant
            // has competed
            return score_grid_row.reduce((found_non_zero, element) => {
                return Boolean(found_non_zero || element !== 0);
            });
        }

        function get_score(score_grid_row) {
            return score_grid_row.reduce((total, element) => {
                return total + element;
            })
        }

        const names = this.props.names;
        const score_grid = this.state.score_grid;
        let combatants = [];
        for (var i = 0; i < names.length; i++) {
            if (has_non_zero_values(score_grid[i])) {
                combatants.push({
                    name: names[i],
                    score: get_score(score_grid[i]),
                });
            }
        }
        combatants.sort((a, b) => {
            return b.score - a.score;
        })

        console.log(combatants);
        return combatants;
    }

    generateRandomBouts() {
        let bouts = [], names = this.props.names;
        if (names.length > 1) {
            if (names.length % 2 === 0) {
                // Even number of combatants, easy case
                for (let i = 0; i < names.length; i += 2) {
                    bouts.push(<Bout bout_number={Math.floor(i/2) + 1}
                                     key={Math.floor(i/2) + 1}
                                     combatant_1={names[i]}
                                     combatant_2={names[i+1]}
                                     recordBoutResult={this.recordBoutResult
                                                       .bind(this)}
                                     />);
                }
            } else {
                // Odd number of combatants
                for (let i = 0; i < names.length-1; i += 2) {
                    bouts.push(<Bout bout_number={Math.floor(i/2) + 1}
                                     key={Math.floor(i/2) + 1}
                                     combatant_1={names[i]}
                                     combatant_2={names[i+1]}
                                     recordBoutResult={this.recordBoutResult
                                                       .bind(this)}
                                     />);
                }
                // Randomly pick a person who has already been placed
                // in a bout to compete with final combatant
                let l = names.length-1, 
                    r = Math.floor(Math.random() * (names.length-1));
                bouts.push(<Bout bout_number={Math.floor(l/2) + 1}
                                 key={Math.floor(l/2) + 1}
                                 combatant_1={names[l]}
                                 combatant_2={names[r]}
                                 recordBoutResult={this.recordBoutResult
                                                   .bind(this)}
                                 />);
            }
        } else {
            bouts = ["Not enough combatants to generate any bouts!"];
        }
        return bouts;
    }

    generateRankedBouts() {
        const score_grid = this.state.score_grid;
        const bout_sequence = create_bout_sequence(score_grid);
        const names = this.props.names;
        let bouts = [];
        
        for (var i = 0; i < bout_sequence.length; i++) {
            let sequence_entry = bout_sequence[i];
            bouts.push(<Bout bout_number={i+1}
                             key={i+1}
                             combatant_1={names[sequence_entry[0]]}
                             combatant_2={names[sequence_entry[1]]}
                             recordBoutResult={this.recordBoutResult
                                               .bind(this)}
                             />);
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
        if (this.props.mode === "Random") {
            return (
                <div className="width80">
                    {this.generateRandomBouts()}
                    <ResetButton text="Return to menu"
                                    onClick={this.props.onClick}
                                    shouldConfirm={true}/>
                </div>
            );
        } else if (this.props.mode === "Ranked") {
            return (
                <div className="width90">
                    <Leaderboard ranked_combatants={this.generateRankings()}/>
                    {this.generateRankedBouts()}
                    <ResetButton text="Return to menu"
                                    onClick={this.props.onClick}
                                    shouldConfirm={true}/>
                </div>
            );
        }
    }
}

export default BoutsContainer;
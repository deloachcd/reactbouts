import React from 'react';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
        };

        this.groupCombatantsByPoints = this.groupCombatantsByPoints.bind(this);
        this.renderByGroup = this.renderByGroup.bind(this);
    }

    groupCombatantsByPoints() {
        const combatants = this.props.ranked_combatants;

        let new_groups = [[combatants[0]]];
        let current_group_score = combatants[0].score;
        for (var i = 1, g = 0; i < combatants.length; i++) {
            if (combatants[i].score === current_group_score) {
                new_groups[g].push(combatants[i]);
            } else {
                current_group_score = combatants[i].score;
                new_groups.push([]);
                new_groups[++g].push(combatants[i]);
            }
        }
        
        this.setState({
            groups: new_groups,
        });
    }

    renderByGroup() {
        const places = [ "1st",   "2nd", "3rd",  "4th",  "5th",
                         "6th",   "7th", "8th",  "9th", "10th",
                        "11th", "12th", "13th", "14th", "15th",];
        let groups = this.state.groups;
        let jsx_elements = [];
        if (groups !== []) {
            for (var i = 0; i < groups.length; i++) {
                let names = groups[i].map(e => e.name).join(', ');
                jsx_elements.push(
                    <div key={i}>
                        <br/>
                        <h2>{places[i]} Place</h2>
                        <h3>{names}</h3>
                    </div>
                );
            }
        } else {
            jsx_elements = [<h2>Nothing here yet!</h2>];
        }
        return jsx_elements;
    }

    componentDidUpdate(previous_props) {
        if (this.props.ranked_combatants !== previous_props.ranked_combatants) {
            this.groupCombatantsByPoints();
        }
    }

    render() {
        return <div className="nes-container with-title width90">
            <h2 className="title">Leaderboard</h2>
            {this.renderByGroup()}
        </div>
    }
};

export default Leaderboard;
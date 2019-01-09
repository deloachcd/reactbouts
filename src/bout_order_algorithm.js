function create_bout_sequence(score_grid) {
	var rows = score_grid.length;
	var bouts = [];

	function add_inner_diagonals_values() {
		for (var k = 2; k < rows-1; k++) {
			for (var i = k; i < rows; i++) {
				var j = i-k;
				bouts.push([i, j]);
			}
		}
	}

    function add_lower_left_corner_value() {
        bouts.push([rows-1, 0]);
	}

    function add_hypotenuse_values(cardinality) {
		var start_index = (cardinality === 'even') ? 2 : 1;
		for (var i = start_index; i < rows; i += 2) {
            var j = i-1;
            bouts.push([i, j]);
		}
	}

    function find_repeat(bout_order) {
		for (var i = 0; i < bout_order.length-1; i++) {
			if (bout_order[i][0] === bout_order[i+1][0] ||
				    bout_order[i][0] === bout_order[i+1][1] ||
				    bout_order[i][1] === bout_order[i+1][0] ||
				    bout_order[i][1] === bout_order[i+1][1]) {
				return i+1;
			}
		}
		return -1;
	}

    function swap(a, i, j) {
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    if (rows % 2 === 1) {
        add_hypotenuse_values('odd');
        add_lower_left_corner_value();
        add_hypotenuse_values('even');
        add_inner_diagonals_values();
	} else {
        add_lower_left_corner_value();
        add_hypotenuse_values('even');
        add_hypotenuse_values('odd');
        add_inner_diagonals_values();
        let repeat_index = find_repeat(bouts);
        swap(bouts, repeat_index, repeat_index+1);
	}

    return bouts;
}


function get_num_bouts(num_combatants) {
    return (Math.pow(num_combatants, 2) - num_combatants) / 2
}

export {
	create_bout_sequence,
	get_num_bouts
}
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(22)},16:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(8),i=n.n(s);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(16),n(18),n(20);var o=n(2),c=n(3),l=n(5),u=n(4),m=n(6),d=n(1);var h=function(e){function t(t,n){var a=e[t];e[t]=e[n],e[n]=a}for(var n=e.length-1;n>0;n--)t(n,Math.floor(Math.random()*n))};function b(e){return r.a.createElement("button",{type:"button",className:"nes-btn padded-btn",onClick:e.onClick},e.text)}function v(e){return r.a.createElement("button",{type:"button",className:"nes-btn padded-btn wide-btn is-success",onClick:e.onClick},e.text)}function p(e){return r.a.createElement("button",{type:"button",className:"nes-btn padded-btn",onClick:e.onClick},r.a.createElement("i",{className:"nes-icon trophy is-medium"}))}function f(e){return r.a.createElement("button",{type:"button",className:"nes-btn padded-btn wide-btn",onClick:function(){e.shouldConfirm?window.confirm("Are you sure you want to start over completely?")&&e.onClick():e.onClick()}},e.text)}var g=n(9),k=n.n(g);var _=function(e){return r.a.createElement("div",null,r.a.createElement("div",{className:"center",id:"logo"},r.a.createElement("img",{src:k.a,alt:"logo",className:"bouts-logo"}),r.a.createElement("h1",null,"ReactBouts"),r.a.createElement(b,{text:"Random bouts",onClick:function(){return e.onClick("Random")}}),r.a.createElement(b,{text:"Ranked bouts",onClick:function(){return e.onClick("Ranked")}}),r.a.createElement("div",{className:"padded-small-text"},r.a.createElement("small",null,"Created by Chandler DeLoach"))))},E=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(d.a)(Object(d.a)(n))),n.getCurrentName=n.getCurrentName.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"getCurrentName",value:function(){return this.state.value}},{key:"handleChange",value:function(e){this.props.onChange(this.props.id,e.target.value)}},{key:"render",value:function(){return r.a.createElement("label",{htmlFor:"name_field"},"Fencer #",this.props.id,":",r.a.createElement("input",{type:"text",className:"nes-input",onChange:this.handleChange}))}}]),t}(r.a.Component),O=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={name_entry_fields:[],names_entered:[]},n.addNameEntryField=n.addNameEntryField.bind(Object(d.a)(Object(d.a)(n))),n.removeNameEntryField=n.removeNameEntryField.bind(Object(d.a)(Object(d.a)(n))),n.getNames=n.getNames.bind(Object(d.a)(Object(d.a)(n))),n.updateName=n.updateName.bind(Object(d.a)(Object(d.a)(n))),n.hasNamesOnRoster=n.hasNamesOnRoster.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"addNameEntryField",value:function(){var e=this,t=this.state.name_entry_fields.slice(),n=this.state.names_entered.slice(),a=t.length+1;n.push(""),t.push(r.a.createElement(E,{id:a,key:a,onChange:function(t,n){return e.updateName(t,n)}})),this.setState({name_entry_fields:t,names_entered:n})}},{key:"removeNameEntryField",value:function(){var e=this.state.name_entry_fields.slice(),t=this.state.names_entered.slice();e.pop(),t.pop(),this.setState({name_entry_fields:e,names_entered:t})}},{key:"updateName",value:function(e,t){var n=this.state.names_entered.slice();n[e-1]=t,this.setState({name_entry_fields:this.state.name_entry_fields,names_entered:n})}},{key:"getNames",value:function(){this.state.names_entered.map(console.log)}},{key:"hasNamesOnRoster",value:function(){return!(0===this.state.names_entered.length)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"nes-container with-title width60"},r.a.createElement("h2",{className:"title"},"Fencer names"),r.a.createElement("div",null,this.state.name_entry_fields),r.a.createElement("div",null,r.a.createElement(b,{text:"Add fencer",onClick:this.addNameEntryField}),r.a.createElement(b,{text:"Remove fencer",onClick:this.removeNameEntryField})),r.a.createElement("div",null,r.a.createElement(v,{text:"Start bouts",onClick:function(){return e.props.startButtonClick(e.state.names_entered)}})),r.a.createElement("div",null,r.a.createElement(f,{text:"Return to menu",onClick:this.props.resetButtonClick,shouldConfirm:this.hasNamesOnRoster()})))}}]),t}(r.a.Component);var y=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={total_seconds:0,next_second_timeout:null},n.getFormattedTime.bind(Object(d.a)(Object(d.a)(n))),n.incrementTime.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"incrementTime",value:function(){var e=this.state.total_seconds,t=this.state.next_second_timeout;this.setState({total_seconds:this.props.timer_paused?e:e+1,next_second_timeout:t})}},{key:"getFormattedTime",value:function(){var e=this.state.total_seconds,t=Math.floor(e/60),n=String(Math.floor(e%60)),a=n.length<2?"0"+n:n;return"".concat(t,":").concat(a)}},{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval(function(){return e.incrementTime()},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return r.a.createElement("div",{className:"nes-container fixed-width-timer center"},r.a.createElement("h2",null,this.getFormattedTime()))}}]),t}(r.a.Component),j=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={timer_paused:!0,status:"not started",winner:null,runner_up:null},n.setRenderContentFromState.bind(Object(d.a)(Object(d.a)(n))),n.declareWinner.bind(Object(d.a)(Object(d.a)(n))),n.startBout.bind(Object(d.a)(Object(d.a)(n))),n.flipTimer.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"declareWinner",value:function(e,t){this.setState({timer_paused:!0,status:"winner declared",winner:e,runner_up:t}),this.props.recordBoutResult(e,t)}},{key:"startBout",value:function(){this.setState({timer_paused:!1,status:"in progress",winner:null,runner_up:null})}},{key:"flipTimer",value:function(){this.setState({timer_paused:!this.state.timer_paused,status:this.state.status,winner:this.state.winner,runner_up:this.state.runner_up})}},{key:"setRenderContentFromState",value:function(){var e,t=this,n=this.props.combatant_1,a=this.props.combatant_2;return"not started"===this.state.status?r.a.createElement("div",null,r.a.createElement("h2",{className:"vertical-margin"},n,"\xa0vs.\xa0",a),r.a.createElement(v,{text:"Start bout",onClick:function(){return t.startBout()}})):"in progress"===this.state.status?(e=this.state.timer_paused?r.a.createElement(b,{text:"Resume bout",onClick:function(){return t.flipTimer()}}):r.a.createElement(b,{text:"Pause bout",onClick:function(){return t.flipTimer()}}),r.a.createElement("div",null,r.a.createElement("h2",{className:"vertical-margin"},r.a.createElement(p,{onClick:function(){return t.declareWinner(n,a)}}),"\xa0\xa0",n,"\xa0vs.\xa0",a,"\xa0\xa0",r.a.createElement(p,{onClick:function(){return t.declareWinner(a,n)}})),e)):"winner declared"===this.state.status?this.state.winner===n?r.a.createElement("div",null,r.a.createElement("h2",{className:"vertical-margin"},"\xa0",n,"\xa0wins!\xa0",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("small",{className:"vertical-margin"},"Runner-up:\xa0",a))):this.state.winner===a?r.a.createElement("div",null,r.a.createElement("h2",{className:"vertical-margin"},"\xa0",a,"\xa0wins!\xa0",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("small",{className:"vertical-margin"},"Runner-up:\xa0",n))):r.a.createElement("div",null,r.a.createElement("h2",{className:"vertical-margin"},"How the hell did you get this state?")):void 0}},{key:"render",value:function(){return r.a.createElement("div",{className:"nes-container with-title vertical-margin center"},r.a.createElement("h2",{className:"title"},"Bout #",this.props.bout_number),r.a.createElement(y,{timer_paused:this.state.timer_paused}),this.setRenderContentFromState())}}]),t}(r.a.Component),C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={groups:[]},n.groupCombatantsByPoints=n.groupCombatantsByPoints.bind(Object(d.a)(Object(d.a)(n))),n.renderByGroup=n.renderByGroup.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"groupCombatantsByPoints",value:function(){for(var e=this.props.ranked_combatants,t=[[e[0]]],n=e[0].score,a=1,r=0;a<e.length;a++)e[a].score===n?t[r].push(e[a]):(n=e[a].score,t.push([]),t[++r].push(e[a]));this.setState({groups:t})}},{key:"renderByGroup",value:function(){var e=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"],t=this.state.groups,n=[];if(t!==[])for(var a=0;a<t.length;a++){var s=t[a].map(function(e){return e.name}).join(", ");n.push(r.a.createElement("div",{key:a},r.a.createElement("br",null),r.a.createElement("h2",null,e[a]," Place"),r.a.createElement("h3",null,s)))}else n=[r.a.createElement("h2",null,"Nothing here yet!")];return n}},{key:"componentDidUpdate",value:function(e){this.props.ranked_combatants!==e.ranked_combatants&&this.groupCombatantsByPoints()}},{key:"render",value:function(){return r.a.createElement("div",{className:"nes-container with-title width90"},r.a.createElement("h2",{className:"title"},"Leaderboard"),this.renderByGroup())}}]),t}(r.a.Component),N=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={score_grid:Array(n.props.names.length).fill(Array(n.props.names.length).fill(0))},n.printNames=n.printNames.bind(Object(d.a)(Object(d.a)(n))),n.recordBoutResult=n.recordBoutResult.bind(Object(d.a)(Object(d.a)(n))),n.generateRandomBouts=n.generateRandomBouts.bind(Object(d.a)(Object(d.a)(n))),n.generateRankedBouts=n.generateRankedBouts.bind(Object(d.a)(Object(d.a)(n))),n.generateRankings=n.generateRankings.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"recordBoutResult",value:function(e,t){function n(e,t,n,a){var r=e[t].slice(0,n),s=[a],i=e[t].slice(n+1);e[t]=r.concat(s).concat(i)}var a=this.props.names.indexOf(e),r=this.props.names.indexOf(t),s=this.state.score_grid.slice();n(s,a,r,2),n(s,r,a,-1),this.setState({score_grid:s})}},{key:"generateRankings",value:function(){function e(e){return e.reduce(function(e,t){return e+t})}for(var t=this.props.names,n=this.state.score_grid,a=[],r=0;r<t.length;r++)n[r].reduce(function(e,t){return Boolean(e||0!==t)})&&a.push({name:t[r],score:e(n[r])});return a.sort(function(e,t){return t.score-e.score}),console.log(a),a}},{key:"generateRandomBouts",value:function(){var e=[],t=this.props.names;if(t.length>1)if(t.length%2===0)for(var n=0;n<t.length;n+=2)e.push(r.a.createElement(j,{bout_number:Math.floor(n/2)+1,key:Math.floor(n/2)+1,combatant_1:t[n],combatant_2:t[n+1],recordBoutResult:this.recordBoutResult.bind(this)}));else{for(var a=0;a<t.length-1;a+=2)e.push(r.a.createElement(j,{bout_number:Math.floor(a/2)+1,key:Math.floor(a/2)+1,combatant_1:t[a],combatant_2:t[a+1],recordBoutResult:this.recordBoutResult.bind(this)}));var s=t.length-1,i=Math.floor(Math.random()*(t.length-1));e.push(r.a.createElement(j,{bout_number:Math.floor(s/2)+1,key:Math.floor(s/2)+1,combatant_1:t[s],combatant_2:t[i],recordBoutResult:this.recordBoutResult.bind(this)}))}else e=["Not enough combatants to generate any bouts!"];return e}},{key:"generateRankedBouts",value:function(){for(var e=function(e){var t=e.length,n=[];function a(){for(var e=2;e<t-1;e++)for(var a=e;a<t;a++){var r=a-e;n.push([a,r])}}function r(){n.push([t-1,0])}function s(e){for(var a="even"===e?2:1;a<t;a+=2){var r=a-1;n.push([a,r])}}if(t%2===1)s("odd"),r(),s("even"),a();else{r(),s("even"),s("odd"),a();var i=function(e){for(var t=0;t<e.length-1;t++)if(e[t][0]===e[t+1][0]||e[t][0]===e[t+1][1]||e[t][1]===e[t+1][0]||e[t][1]===e[t+1][1])return t+1;return-1}(n);!function(e,t,n){var a=e[t];e[t]=e[n],e[n]=a}(n,i,i+1)}return n}(this.state.score_grid),t=this.props.names,n=[],a=0;a<e.length;a++){var s=e[a];n.push(r.a.createElement(j,{bout_number:a+1,key:a+1,combatant_1:t[s[0]],combatant_2:t[s[1]],recordBoutResult:this.recordBoutResult.bind(this)}))}return n}},{key:"printNames",value:function(){for(var e="",t=0;t<this.props.names.length;t++)e+=this.props.names[t]+", ";return e}},{key:"render",value:function(){return"Random"===this.props.mode?r.a.createElement("div",{className:"width80"},this.generateRandomBouts(),r.a.createElement(f,{text:"Return to menu",onClick:this.props.onClick,shouldConfirm:!0})):"Ranked"===this.props.mode?r.a.createElement("div",{className:"width90"},r.a.createElement(C,{ranked_combatants:this.generateRankings()}),this.generateRankedBouts(),r.a.createElement(f,{text:"Return to menu",onClick:this.props.onClick,shouldConfirm:!0})):void 0}}]),t}(r.a.Component),R=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={active_mode:null,names_submitted:null},n.changeMode=n.changeMode.bind(Object(d.a)(Object(d.a)(n))),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"getActiveModePrintable",value:function(){var e;return this.state.active_mode?"Ranked"===this.state.active_mode?e="Ranked bouts":"Random"===this.state.active_mode&&(e="Random bouts"):e="None",e}},{key:"changeMode",value:function(e){this.setState({active_mode:e})}},{key:"setNamesSubmitted",value:function(e){var t=this.state.active_mode;this.setState({active_mode:t,names_submitted:e})}},{key:"render",value:function(){var e=this;return this.state.active_mode?this.state.names_submitted?r.a.createElement("div",{className:"center"},r.a.createElement("h2",{className:"padded-title"},this.getActiveModePrintable()),r.a.createElement(N,{onClick:function(){e.setState({active_mode:null,names_submitted:null})},names:this.state.names_submitted,mode:this.state.active_mode})):r.a.createElement("div",{className:"center"},r.a.createElement("h2",{className:"padded-title"},this.getActiveModePrintable()),r.a.createElement(O,{resetButtonClick:function(){return e.changeMode(null)},startButtonClick:function(t){h(t),e.setNamesSubmitted(t)}})):r.a.createElement(_,{onClick:function(t){return e.changeMode(t)}})}}]),t}(r.a.Component);i.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n.p+"static/media/logo.8aade420.png"}},[[10,2,1]]]);
//# sourceMappingURL=main.25640657.chunk.js.map
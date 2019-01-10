import React from 'react';

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

export {
    StandardButton,
    StartButton,
    ResetButton,
}
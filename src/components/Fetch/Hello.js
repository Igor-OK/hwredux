import * as React from 'react';
import {connect} from 'react-redux';

const stateToProps = (state, props) => {
    return{
        counter: state.counter
    };
}

export const Hello = connect(stateToProps)( 
    ({name, counter, dispatch}) => {
        return (
            <React.Fragment>
               <h1> Hello, {name} &times; {counter}! </h1>
                <button onClick = {() => dispatch({type: 'TOGGLE_COUNTER'})}> Toggle </button>

            </React.Fragment>
        );
    }
);
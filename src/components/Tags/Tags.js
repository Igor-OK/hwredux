import * as React from 'react';
import {connect} from 'react-redux';


const TAGS = [
    {title: 'Котейки', tag: 'cats'},
    {title: 'Собаки', tag: 'dogs'},
    {title: 'Куры', tag: 'chickens'},
    {title: 'Лошади', tag: 'horses'},
    {title: 'Коровы', tag: 'cows'}
];

const stateToProps = (state) =>({
    current: state.tags.current
});

export const Tags = connect(stateToProps)(
    function Tags({current, dispatch}) {
        return(
            <div className="tags">
                <div className="tags__wrapper">
                    {TAGS.map(({title, tag}, index) => (
                        <button 
                            className = {`tag tag_color_${index} ${tag===current? 'tag_active': ''}`}
                            key = {tag}
                            onClick = {() => dispatch({
                                type: 'SET_TAG',
                                tag: tag
                            })}
                        >
                            {title}
                        </button>
                    ))}
                </div>    
            </div>    
        )
});
import * as React from 'react';
import {connect} from 'react-redux';


const TAGS = [
    {title: 'Аметист', tag: 'ametist'},
    {title: 'Ларимар', tag: 'larimar'},
    {title: 'Опал', tag: 'opal'},
    {title: 'Изумруд', tag: 'emerald'},
    {title: 'Лунный камень', tag: 'moon'},
    {title: 'Турмалин', tag: 'tourmaline'},
    {title: 'Чароит', tag: 'charoite'},
    {title: 'Спектролит', tag: 'spectro'}
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
                        <div 
                            className = {`tag tag_color_${index} ${tag===current? 'tag_active': ''}`}
                            key = {tag}
                            onClick = {() => dispatch({
                                type: 'SET_TAG',
                                tag: tag
                            })}
                        >
                            {title}
                        </div>
                    ))}
                </div>    
            </div>    
        )
});
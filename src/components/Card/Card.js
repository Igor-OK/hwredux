import * as React from 'react';


export function Card ({Item, OnClick}){

    if(!Item){
        return null
    }

    return(
        <div 
            id = {Item.count}
            className="card"  
            onClick = {OnClick}
            style={{
                width: Item.elem_width +'px',
                height: Item.elem_height + 'px',
                transform: 'translate3d('+Item.elem_left + 'px, ' + Item.elem_top + 'px, 0px)'
            }}
            >
            <img className = "card__image"
                alt={Item.title}                    
                src={Item.media} 
            />  
            <div 
                className="card__description"
            >{Item.title}</div>            
        </div>    
    );
}

//src={Item.thumbnail} 
import * as React from 'react';

export function Description ({Desc}){

if(!Desc){
    return null
}
    return(  
        <div className="dashboard__description"
            >
            <p>
                {Desc}
            </p>
        </div>
    );
}
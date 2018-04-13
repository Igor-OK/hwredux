export function fetchReducer(state, action){
    if (!state) {
        return{
            cards: [],
            step: 1,
            loading: false
        };
    }

    if (action.type === 'FETCH_LOADING'){
        return{
            ...state,
            loading: action.loading
        };
    }
  
    if (action.type === 'FETCH_ERROR'){
        return{
            ...state,
            error: action.error
        };
    }

    if (action.type === 'FETCH_APPEND_CARDS'){
        return{
            ...state,
            cards: state.cards.concat(action.cards),
            step: action.step
        };
    }
  
    if (action.type === 'FETCH_RESET'){
        return{
            ...state,
            cards: [],
            step: 1,
            error: null
          
        };
    }

    return state;
}


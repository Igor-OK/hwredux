export function tagsReducer(state, action){
    if (!state) {
        return{
            current:'larimar'
        };
    }

    if (action.type === 'SET_TAG') {
        return{
          ...state,
          current: action.tag
        };
    }

    return state;
}
export default function slides(state = { slides: []}, action){
    switch (action.type) {
        case 'GET_SLIDES':
            return Object.assign({}, state, {
                'slides': action.slides
            });
        default:
            return state;
    }
};
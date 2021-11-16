const initianState = {
    user: {},
    users: [],
    toggle: false
}

export const usersReducer = (state = initianState, action) => {
    switch (action.type) {
        case 'ALL_THE_USERS': {
            return { ...state, users: [...action.payload] }
        }
        case 'USER': {
            return { ...state, user: action.payload }
        }
        case 'LOG_OUT_USER': {
            return { ...state, user: {}, users: [] }
        }
        case 'TOGGLE': {
            return {...state, toggle: action.payload}
        }

        default:
            return state
    }
}

import { USER, LOG_OUT_USER, TOGGLE, ALL_THE_USERS } from './actionsType';

export const setAllUsers = (value) => {
    return {type: ALL_THE_USERS, payload: value}
};

export const setUser = (value) => {
    return {type: USER, payload: value}
};

export const setToggle = (value) => {
    return {type: TOGGLE, payload: value}
};

export const exit = () => {
    return {type: LOG_OUT_USER }
};

import UCIManager from '../../business/UCMainManager';
export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const loadActionType = () => {
    UCIManager.downloadTrackActionType();
};
import {UPDATE_ERROR} from './types';

export const updateError = error => ({
    type:UPDATE_ERROR,
    payload:error
});
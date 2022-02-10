import { Stroke } from "../types";
import {ActionTypes} from "./actionTypes";

export const beginStroke = (x: number, y: number) => {
    return { type: ActionTypes.BEGIN_STROKE, payload: { x, y } };
};

export const updateStroke = (x: number, y: number) => {
    return { type: ActionTypes.UPDATE_STROKE, payload: { x, y } };
};

export const endStroke = () => {
    return { type: ActionTypes.END_STROKE };
};

export const setStrokeColor = (color: string) => {
    return { type: ActionTypes.SET_STROKE_COLOR, payload: color };
};

export const undo = () => {
    return {
        type: ActionTypes.UNDO,
    };
};

export const redo = () => {
    return {
        type: ActionTypes.REDO,
    };
};

export const loadFromLocalStorage = (strokes: Stroke[], historyIndex: number) => {
    return { type: ActionTypes.LOAD_FROM_LOCAL_STORAGE, payload: {
        strokes,
        historyIndex,
    } };
};
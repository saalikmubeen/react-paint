// export const BEGIN_STROKE = "BEGIN_STROKE";
// export const UPDATE_STROKE = "UPDATE_STROKE";
// export const END_STROKE = "END_STROKE";

import { Point, Stroke } from "../types";

export enum ActionTypes {
    BEGIN_STROKE,
    UPDATE_STROKE,
    END_STROKE,
    SET_STROKE_COLOR,
    UNDO,
    REDO,
    LOAD_FROM_LOCAL_STORAGE,
}

export type Action =
    | {
        type: ActionTypes.BEGIN_STROKE;
        payload: Point;
    }
    | {
        type: ActionTypes.UPDATE_STROKE;
        payload: Point;
    }
    | {
        type: ActionTypes.END_STROKE;
    }
    | {
        type: ActionTypes.SET_STROKE_COLOR;
        payload: string;
    }
    | {
        type: ActionTypes.UNDO;
    }
    | {
        type: ActionTypes.REDO;
    }
    | {
        type: ActionTypes.LOAD_FROM_LOCAL_STORAGE;
        payload: {
            strokes: Stroke[];
            historyIndex: number;
        }
    }
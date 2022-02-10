import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../types";
import { Action, ActionTypes } from "../actions";

const initialState: RootState = {
    strokes: [],
    currentStroke: {
        color: "#000",
        points: [],
    },
    historyIndex: 0,
};

export const rootReducer = (
    state: RootState = initialState,
    action: Action
): RootState => {
    switch (action.type) {

        case ActionTypes.BEGIN_STROKE:
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    points: [{ x: action.payload.x, y: action.payload.y }],
                },
            };

        case ActionTypes.UPDATE_STROKE:
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    points: [
                        ...state.currentStroke.points,
                        { x: action.payload.x, y: action.payload.y },
                    ],
                },
            };

        case ActionTypes.END_STROKE:
            // if current stroke has no points/length
            if (state.currentStroke.points.length === 0) {
                return state;
            }

            return {
                ...state,
                // strokes: [...state.strokes, state.currentStroke], // add current stroke to strokes
                strokes: [...state.strokes.slice(0, state.historyIndex), state.currentStroke], // add current stroke to strokes)],
                currentStroke: {
                    ...state.currentStroke,
                    points: [],
                },
                historyIndex: state.historyIndex + 1,
            };

        case ActionTypes.SET_STROKE_COLOR:
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    color: action.payload,
                }
            }
        
        case ActionTypes.UNDO:
            if (state.historyIndex === 0) {
                return state;
            }
            return {
                ...state,
                // strokes: state.strokes.slice(0, state.historyIndex - 1),
                historyIndex: state.historyIndex - 1,
            }
        
        case ActionTypes.REDO:
            if (state.historyIndex === state.strokes.length  ) {
                return state;
            }

            return {
                ...state,
                historyIndex: state.historyIndex + 1,
            }
        
        case ActionTypes.LOAD_FROM_LOCAL_STORAGE:
            return {
                ...state,
                strokes: action.payload.strokes || [],
                historyIndex: action.payload.historyIndex || 0,
            }
        
        default:
            return state;
    }
};

export type StoreState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;

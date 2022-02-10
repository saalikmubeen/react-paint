export type Point = {
    x: number;
    y: number;
}

export type Stroke = {
    points: Point[];
    color: string;
}


export type RootState = {
    strokes: Stroke[];
    currentStroke: Stroke;
    historyIndex: number;
}
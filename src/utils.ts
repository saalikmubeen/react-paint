import { Point } from "./types";

export const drawStroke = (
    context: CanvasRenderingContext2D, 
    points: Point[], color: string) => {
    
    if (!points.length){
        return
    }

    // context.font = '48px serif';
    // context.strokeText('Hello world', 10, 50);

    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);


    points.forEach((point) => {
        context.lineTo(point.x, point.y);
        context.stroke();
    })

    context.closePath();

}

export const setCanvasSize = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number
) => {
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext("2d")?.scale(2, 2);
};


export const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
};


export const getCanvasImage = (
    canvas: HTMLCanvasElement | null
): Promise<null | Blob> => {
    return new Promise((resolve, reject) => {
        if (!canvas) {
            return reject(null);
        }
        // canvas.toBlob(resolve);
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
};
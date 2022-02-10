import {useRef, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {beginStroke, updateStroke, endStroke, loadFromLocalStorage} from "./actions";
import {useTypedSelector} from "./reducers";
import { clearCanvas, drawStroke, setCanvasSize } from "./utils";
import ColorPanel from "./ColorPanel";
import EditPanel from "./EditPanel";
import FilePanel from "./FilePanel";
import useWindowDimensions from "./useWindowDimensions";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // const { height, width } = useWindowDimensions();
    const { innerWidth: width, innerHeight: height } = window;
    console.log(height, width);

    const dispatch = useDispatch();
    const {currentStroke, historyIndex, strokes} = useTypedSelector((state) => state);

    const isDrawing = currentStroke.points.length > 0;

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = e.nativeEvent;
        dispatch(beginStroke(offsetX, offsetY));
    };


    const endDrawing = () => {
        if (isDrawing) {
            dispatch(endStroke());
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isDrawing) {
            return 
        }

        const {  offsetX, offsetY } = e.nativeEvent;
        dispatch(updateStroke(offsetX, offsetY));
    };


    // To draw on the canvas we need to get the canvas drawing context.
    const getCanvasWithContext = () => {
        return {canvas: canvasRef.current, context: canvasRef.current?.getContext("2d")};
    }

    useEffect(() => {
        const appState = JSON.parse(
            window.localStorage.getItem("react-paint") || "{}"
        );

        if (appState.strokes && appState.historyIndex) {
            dispatch(
                loadFromLocalStorage(appState.strokes, appState.historyIndex)
            );
        }
    }, [dispatch]);

    useEffect(() => {
        const { canvas, context } = getCanvasWithContext();
        if (!canvas || !context) {
            return;
        }

        setCanvasSize(canvas, width, height);

        context.lineJoin = "round";
        context.lineCap = "round";
        context.lineWidth = 5;

    }, [height, width]);

    useEffect(() => {

        const { canvas, context } = getCanvasWithContext();
        if (!canvas || !context) {
            return;
        }

        requestAnimationFrame(() => {
            drawStroke(context, currentStroke.points, currentStroke.color);
        })

    }, [currentStroke]);

    useEffect(() => {
        const { canvas, context } = getCanvasWithContext();
        if (!canvas || !context) {
            return;
        }

        requestAnimationFrame(() => {
            clearCanvas(canvas)
            strokes.slice(0, historyIndex).forEach((stroke) => {
                drawStroke(context, stroke.points, stroke.color);
            })
        });

        window.localStorage.setItem("react-paint", JSON.stringify({
            strokes,
            historyIndex
        }));

    }, [historyIndex, strokes]);

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ColorPanel/>
            <EditPanel/>
            <FilePanel canvasRef={canvasRef}/>
            <canvas
                id="canvas"
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    );
}

export default App;

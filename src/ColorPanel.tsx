import {useDispatch} from "react-redux";
import {setStrokeColor} from "./actions"

const COLORS = [
    "#000000",
    "#808080",
    "#c0c0c0",
    "#ffffff",
    "#800000",
    "#ff0000",
    "#808000",
    "#ffff00",
    "#008000",
    "#00ff00",
    "#008080",
    "#00ffff",
    "#000080",
    "#0000ff",
    "#800080",
    "#ff00ff",
    "#808040",
    "#ffff80",
    "#004040",
    "#00ff80",
    "#0080ff",
    "#80ffff",
    "#004080",
    "#8080ff",
    "#8000ff",
    "#ff0080",
    "#804000",
    "#ff8040",
];

const ColorPanel = () => {
    const dispatch = useDispatch();
  return (
      <div className="window colors-panel">
          <div className="title-bar">
                <div className="title-bar-text">Select Color</div>
          </div>

          <div className="window-body colors">
              {COLORS.map((color) => {
                    return (
                        <div
                            className="color"
                            style={{ backgroundColor: color }}
                            key={color}
                            onClick={() => dispatch(setStrokeColor(color))}
                        />
                    );
              })}
          </div>
      </div>
  );
};

export default ColorPanel;

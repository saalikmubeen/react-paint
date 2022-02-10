import React from "react";
import {saveAs} from "file-saver";
import { getCanvasImage } from "./utils";


type FilePanelProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}


const FilePanel: React.FC<FilePanelProps> = ({canvasRef}) => {

    const exportToFile = async () => {
        const file = await getCanvasImage(canvasRef.current);
        if (!file) {
            return;
        }
        saveAs(file, "my-drawing.png");
    };


  return (
      <div className="window file">
          <div className="title-bar">
              <div className="title-bar-text">File</div>
          </div>
          <div className="window-body">
              <div className="field-row">
                  <button className="save-button" onClick={exportToFile}>
                      Export
                  </button>
              </div>
          </div>
      </div>
  );
};

export default FilePanel;

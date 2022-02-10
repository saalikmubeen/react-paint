import {useDispatch} from "react-redux";
import {undo, redo} from "./actions";

const EditPanel = () => {
    const dispatch = useDispatch();
  return (
      <div className="window edit">
          <div className="title-bar">
              <div className="title-bar-text">Edit</div>
          </div>
          <div className="window-body">
              <div className="field-row">

                  <button
                      className="button undo"
                      onClick={() => dispatch(undo())}
                  >
                      Undo
                  </button>

                  <button
                      className="button redo"
                      onClick={() => dispatch(redo())}
                  >
                      Redo
                  </button>
                  
              </div>
          </div>
      </div>
  );
};

export default EditPanel;

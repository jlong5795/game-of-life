import React from "react";
import { useForm } from "react-hook-form";

const Settings = (props) => {
  const { register, handleSubmit, errors } = useForm();
  //const { numRows, setNumRows, numCols, setNumCols, setSpeed, clearGrid } = props;

  const onSubmit = (data) => {
    console.log(data);
    if (data.numRows > 0) {
        return props.setNumRows(parseInt(data.numRows));
    }

    if (data.numCols > 0) {
        return props.setNumCols(parseInt(data.numCols));    
    }
    
    if (data.speed > 0) {
        return props.setSpeed(parseInt(data.speed));
    }  

    return props.clearGrid(props.numRows, props.numCols);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Num Rows:
          <input type='text' name='numRows' ref={register} />
        </label>
        <label>
          Num Cols:
          <input type='text' name='numCols' ref={register} />
        </label>
        <label>
          Game Speed:
          <input type='text' name='speed' ref={register} />
        </label>
        <button type='submit'>Update Settings</button>
      </form>
    </div>
  );
};

export default Settings;

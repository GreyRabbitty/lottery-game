import { useState } from "react";

export default function Register({ handleEnter }) {
  const [number, setNumber] = useState(0);
  const [isValid, setIsValid] = useState(true);

  const handleEnterClick = () => {
    if (!isNaN(number) && number >= 0 && number <= 9) handleEnter(number);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 9) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setNumber(newValue);
  };

  return (
    <div className="border rounded mb-4 px-4 py-3">
      <h4>Try your luck by registering</h4>
      <div className="form-text">Choose your favorite number from (0 to 9)</div>
      <div className="d-flex">
        <input
          type="text"
          value={number}
          onChange={handleValueChange}
          className="form-control me-2"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleEnterClick}
        >
          Enter
        </button>
      </div>
      {!isValid && (
        <div className="form-text text-danger">
          Make sure the input is a number, and in the range between 0 and 9
        </div>
      )}
    </div>
  );
}

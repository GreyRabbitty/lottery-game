import { useState } from "react";

export default function Register({ handleEnter }) {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h4>Try your luck by registering</h4>
      <div className="d-flex">
        <input
          type="text"
          value={number}
          defaultValue={0}
          onChange={(e) => setNumber(e.target.value)}
          className="form-control me-2"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleEnter(number)}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

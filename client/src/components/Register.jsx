export default function Register({ handleEnter }) {
  return (
    <div>
      <h4>Try your luck by registering</h4>
      <button type="button" className="btn btn-primary" onClick={handleEnter}>
        Enter
      </button>
    </div>
  );
}

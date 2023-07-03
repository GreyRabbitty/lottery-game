export default function WinnerPicker({ handlePickWinner }) {
  return (
    <div>
      <h4>Find who has the good luck</h4>
      <button className="btn btn-success" onClick={handlePickWinner}>
        Pick a winner
      </button>
    </div>
  );
}

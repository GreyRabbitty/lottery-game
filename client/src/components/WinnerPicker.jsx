export default function WinnerPicker({ handlePickWinner, players }) {
  return (
    <div className="shadow-sm bg-body-tertiary border rounded px-4 py-3">
      <h4>Find who has the good luck</h4>
      <button
        className="btn btn-success"
        onClick={handlePickWinner}
        disabled={players?.length === 0}
      >
        Pick a winner
      </button>
    </div>
  );
}

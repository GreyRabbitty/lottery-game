export default function WinnerPicker({ handlePickWinner, players }) {
  return (
    <div>
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

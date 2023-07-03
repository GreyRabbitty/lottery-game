export default function WinnerPicker({ handlePickWinner }) {
  return (
    <div>
      <h4>Ready to pick a winner?</h4>
      <button onClick={handlePickWinner}>Pick a winner</button>
    </div>
  );
}

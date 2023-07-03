export default function PickWinner() {
  const onClick = () => {
    console.log("Picking a winner");
  };

  return (
    <div>
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner</button>
    </div>
  );
}

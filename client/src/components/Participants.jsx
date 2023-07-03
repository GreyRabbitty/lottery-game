export default function Participants({ players }) {
  return (
    <div style={{ width: "40%" }}>
      <h3>Participants</h3>
      <ul>
        {players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

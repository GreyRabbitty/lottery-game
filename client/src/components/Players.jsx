export default function Players({ accounts, players, balance, web3 }) {
  console.log(players);
  return (
    <div>
      <h4>Players</h4>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td className="text-center">
              <span className="fw-bold text-primary">{players.length}</span>{" "}
              player(s)
            </td>
            <td className="text-center">
              Compete{" "}
              <span className="fw-bold text-primary">
                {web3.utils.fromWei(balance, "ether")}
              </span>{" "}
              ETH
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-2 mb-1">List of current players' address:</p>
      <ul className="list-group">
        {players.map((player) => (
          <li className="list-group-item" key={player}>
            <span className="fs-6 fst-italic">
              <span class="badge text-bg-warning">{player["number"]}</span>{" "}
              {player["playerAddress"]}{" "}
              {accounts[0] === player["playerAddress"] && (
                <span className="fw-semibold text-danger">(me)</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

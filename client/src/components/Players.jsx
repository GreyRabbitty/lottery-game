export default function Players({ accounts, players, balance, web3 }) {
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
      {/* <ul className="list-group">
        {players.map((player) => (
          <li className="list-group-item" key={player}>
            <span className="fs-6 fst-italic">
              </span>{" "}
              {player["playerAddress"]}{" "}
              {accounts[0] === player["playerAddress"] && (
                <span className="fw-semibold text-danger">(me)</span>
              )}
            </span>
          </li>
        ))}
      </ul> */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Address</th>
            <th className="text-center">Number</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, index) => (
            <tr>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">
                <span className="fs-6 fst-italic">{player?.playerAddress}</span>
              </td>
              <td className="text-center">
                <span className="badge text-bg-warning">{player?.number}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

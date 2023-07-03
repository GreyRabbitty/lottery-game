export default function Players({ players, balance, web3 }) {
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
      <ol className="list-group list-group-numbered">
        {players.map((player) => (
          <li className="list-group-item" key={player}>
            <span className="fs-6 fst-italic">{player}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

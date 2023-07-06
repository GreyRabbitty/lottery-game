export default function Players({ accounts, players, prizeAmount }) {
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold">
        <i className="bi bi-people"></i> Players
      </div>
      <div className="card-body">
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
                  {prizeAmount * players.length}
                </span>{" "}
                ETH
              </td>
            </tr>
          </tbody>
        </table>
        <h5 className="mt-4 mb-2">List of current players' address</h5>
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
              <tr key={player?.playerAddress}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <span className="fs-6 fst-italic">
                    {player?.playerAddress}
                  </span>{" "}
                  {accounts[0] === player?.playerAddress && (
                    <span className="fw-semibold text-danger">(me)</span>
                  )}
                </td>
                <td className="text-center">
                  <span className="badge text-bg-warning">
                    {player?.number}
                  </span>
                </td>
              </tr>
            ))}
            {players?.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  No players yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

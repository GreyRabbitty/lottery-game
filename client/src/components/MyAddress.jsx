export default function MyAddress({ accounts }) {
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold">
        <i className="bi bi-person"></i> My address
      </div>
      <div className="card-body">
        <p className="card-text">{accounts[0]}</p>
      </div>
    </div>
  );
}

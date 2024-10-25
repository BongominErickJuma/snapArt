import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Accounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_ACCOUNTS,
    {}
  );

  useEffect(() => {
    document.title = "sNup Earn | Accounts";
    if (data) {
      setAccounts(data.accounts);
    }
  }, [data]);

  const openModal = (account) => {
    setSelectedAccount(account);
  };

  const closeModal = () => {
    setSelectedAccount(null);
  };

  const filteredAccounts = accounts?.filter((account) =>
    account.accountHolderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3 px-2">
        <h2>Accounts List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Accounts..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Accounts...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredAccounts && filteredAccounts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Account Holder Name</th>
                <th scope="col">Date Created</th>
                <th scope="col">Last Modified</th>
                <th scope="col">User ID</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountHolderName}</td>
                  <td>{account.dateCreated}</td>
                  <td>{account.lastModified}</td>
                  <td>{account.userId}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(account)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No Accounts Available</p>
      )}

      {selectedAccount && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {`Account Details for ${selectedAccount.accountHolderName}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedAccount && (
                  <div className="account-details-card">
                    <p>
                      <strong>Account Holder Name:</strong>{" "}
                      {selectedAccount.accountHolderName}
                    </p>
                    <p>
                      <strong>Date Created:</strong>{" "}
                      {selectedAccount.dateCreated}
                    </p>
                    <p>
                      <strong>Last Modified:</strong>{" "}
                      {selectedAccount.lastModified}
                    </p>
                    <p>
                      <strong>User ID:</strong> {selectedAccount.userId}
                    </p>
                    <h6>Holdings:</h6>
                    <ul>
                      {selectedAccount.holdings.map((holding) => (
                        <li key={holding.id}>
                          <strong>Asset:</strong> {holding.Asset},{" "}
                          <strong>Amount:</strong> {holding.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedAccount && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Accounts;

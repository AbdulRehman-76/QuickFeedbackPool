import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const MyPolls = () => {
  const [savedPolls, setSavedPolls] = useState([]);

  useEffect(() => {
    // Load polls from local storage when page opens
    const data = JSON.parse(localStorage.getItem('myPolls') || '[]');
    setSavedPolls(data);
  }, []);

  const copyToClipboard = (id) => {
    const link = `${window.location.origin}/poll/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="card">
      <h2>My Polls 📂</h2>
      
      {savedPolls.length === 0 ? (
        <p style={{textAlign: 'center', color: '#888'}}>
          You haven't created any polls yet. <br/>
          <Link to="/" style={{color: '#6c5ce7'}}>Create one now!</Link>
        </p>
      ) : (
        <div className="polls-list">
          {savedPolls.map((poll) => (
            <div key={poll.id} className="poll-history-item">
              <div className="poll-details">
                <Link to={`/poll/${poll.id}`} className="poll-question">
                  {poll.question}
                </Link>
                <span className="poll-date">{poll.createdAt}</span>
              </div>
              
              <button 
                onClick={() => copyToClipboard(poll.id)} 
                className="btn-copy"
                title="Copy Link"
              >
                🔗
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPolls;
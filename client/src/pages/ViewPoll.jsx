import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const ViewPoll = () => {
  const { id } = useParams(); // Get ID from URL
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    // Fetch poll data when page loads
    axios.get(`${import.meta.env.VITE_API_URL}/api/polls/${id}`)
      .then(res => setPoll(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleVote = async (index) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/polls/${id}/vote`, {
        optionIndex: index
      });
    //   const res = await axios.post(`http://localhost:5000/api/polls/${id}/vote`, {
    //     optionIndex: index
    //   });
      setPoll(res.data); // Update state with new vote counts immediately
    } catch (err) {
      console.error(err);
    }
  };

  if (!poll) return <div>Loading...</div>;

  // Calculate total votes for percentage bars
  const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="card">
      <h2>{poll.question}</h2>
      <div className="options-list">
        {poll.options.map((opt, index) => {
          // Calculate percentage for the bar width
          const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
          
          return (
            <div key={index} className="vote-item" onClick={() => handleVote(index)}>
              <div className="vote-info">
                <span>{opt.text}</span>
                <span>{opt.votes} votes ({percentage}%)</span>
              </div>
              {/* The Visual Bar */}
              <div className="progress-bg">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="share-section">
        <p>Share this link:</p>
        <code>{window.location.href}</code>
      </div>
    </div>
  );
};

export default ViewPoll;
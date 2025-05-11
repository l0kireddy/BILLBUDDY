import React, { useState } from 'react';
import './PollPage.css';

const PollPage = () => {
  const [pollTitle, setPollTitle] = useState('');
  const [pollOptions, setPollOptions] = useState('');
  const [polls, setPolls] = useState([]);

  // Handle creating a poll
  const handleCreatePoll = () => {
    if (pollTitle.trim() && pollOptions.trim()) {
      const newPoll = {
        title: pollTitle,
        options: pollOptions.split(',').map(option => ({
          text: option.trim(),
          votes: 0
        }))
      };
      setPolls([...polls, newPoll]);

      // Reset input fields
      setPollTitle('');
      setPollOptions('');
    } else {
      alert('Please enter a poll title and options.');
    }
  };

  // Handle deleting a poll
  const handleDeletePoll = (index) => {
    const updatedPolls = polls.filter((_, i) => i !== index);
    setPolls(updatedPolls);
  };

  // Handle voting on an option
  const handleVote = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].options[optionIndex].votes += 1;
    setPolls(updatedPolls);
  };

  return (
    <div className="poll-page-container">
      <h2>Create Poll</h2>

      {/* Poll Form */}
      <div className="poll-form">
        <input
          type="text"
          placeholder="Poll Title"
          value={pollTitle}
          onChange={(e) => setPollTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poll Options (comma separated)"
          value={pollOptions}
          onChange={(e) => setPollOptions(e.target.value)}
        />
        <button onClick={handleCreatePoll}>Create Poll</button>
      </div>

      {/* Polls List */}
      <div className="poll-list">
        <h5>Polls</h5>
        {polls.length === 0 ? (
          <p>No polls created yet.</p>
        ) : (
          <ul>
            {polls.map((poll, pollIndex) => (
              <li key={pollIndex}>
                <h4>{poll.title}</h4>
                <ul>
                  {poll.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      {option.text} — {option.votes} vote(s)
                      <button
                        onClick={() => handleVote(pollIndex, optionIndex)}
                        className="vote-btn"
                      >
                        Vote
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDeletePoll(pollIndex)}
                  className="delete-poll-btn"
                >
                  Delete Poll
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PollPage;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // Start with 2 options
  const navigate = useNavigate();

  // Update specific option text
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Add a new input field
  const addOption = () => setOptions([...options, '']);

  // --- NEW: Remove an option ---
  const removeOption = (indexToRemove) => {
    // Prevent removing if there are only 2 options left (optional rule)
    if (options.length <= 2) {
      alert("You need at least 2 options!");
      return;
    }
    const newOptions = options.filter((_, index) => index !== indexToRemove);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedOptions = options.filter(opt => opt.trim() !== '');
    
    if (cleanedOptions.length < 2) {
      alert("Please provide at least 2 valid options.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/polls`, {
        question,
        options: cleanedOptions
      });

      // Save to Local Storage (History)
      const existingPolls = JSON.parse(localStorage.getItem('myPolls') || '[]');
      const pollInfo = {
        id: res.data._id,
        question: res.data.question,
        createdAt: new Date().toLocaleDateString()
      };
      existingPolls.unshift(pollInfo);
      localStorage.setItem('myPolls', JSON.stringify(existingPolls));

      navigate(`/poll/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
      <label>Your Question:</label>  {/* Added Label */}
      <input 
        type="text" 
        placeholder="e.g. Best Pizza Topping?" 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required 
        className="input-main"
      />
    </div>
        
        <label>Answer Options</label>
        {options.map((opt, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            {/* Show delete button only if we have more than 2 options */}
            {options.length > 2 && (
              <button 
                type="button" 
                onClick={() => removeOption(index)} 
                className="btn-delete"
                title="Remove option"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addOption} className="btn-secondary">+ Add Option</button>
        <button type="submit" className="btn-primary">Create Poll 🚀</button>
      </form>
    </div>
  );
};

export default CreatePoll;
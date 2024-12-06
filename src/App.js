import React, { useState, useEffect } from "react";
import './App.css';
import logo from './logo.svg';
import logo2 from './JobHero.png';

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [resumePlaceholder, setResumePlaceholder] = useState(""); // State to manage placeholder text
  const [jobDescriptionPlaceholder, setJobDescriptionPlaceholder] = useState(""); // State to manage Job Description placeholder

  // Typing animation for placeholder
  useEffect(() => {
    const targetText = "Paste Resume Here"; // Placeholder text to animate
    let index = 0;
    const interval = setInterval(() => {
      setResumePlaceholder(targetText.substring(0, index + 1)); // Gradually set the placeholder text
      index++;
      if (index === targetText.length) {
        clearInterval(interval); // Stop the interval when the full text is displayed
      }
    }, 100); // Adjust the typing speed by modifying the interval time (100ms)
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Typing animation for Job Description placeholder
  useEffect(() => {
    const targetText = "Paste Job Description Here"; // Job Description placeholder text
    let index = 0;
    const interval = setInterval(() => {
      setJobDescriptionPlaceholder(targetText.substring(0, index + 1)); // Gradually set the Job Description placeholder text
      index++;
      if (index === targetText.length) {
        clearInterval(interval); // Stop the interval when the full text is displayed
      }
    }, 100); // Adjust the typing speed by modifying the interval time (100ms)
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job_description: jobDescription }),
      });

      const data = await response.json();
      
      console.log("Response data:", data); // Log the response data

      if (data && data.missing_keywords) {
        setResult({
          missingKeywords: data.missing_keywords,
          similarityScore: data.similarity_score,
        });
      } else {
        console.error("No missing keywords in response data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div>
      <a href="https://tinyurl.com/37ndbumw" target="_blank" rel="noopener noreferrer">
          <img src={logo2} alt="Logo" className="logo" />  {/* Use the imported logo */}
        </a>

      <h1>Resume Keyword Checker</h1>
      <form onSubmit={handleSubmit}>
      <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="textarea-container">
          <label htmlFor="resume">Paste Resume Here</label>
          <textarea
            id="resume"
            className="textarea"
            placeholder={resumePlaceholder} // Use the animated placeholder
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows="10"
            cols="50"
          />
        </div>

        <div className="textarea-container">
          <label htmlFor="jobDescription">Paste Job Description Here</label>
          <textarea
            id="jobDescription"
            className="textarea"
            placeholder={jobDescriptionPlaceholder}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="10"
            cols="50"
          />
        </div>

        <button className="button" type="submit">Compare</button>
      </form>

      {result && result.missingKeywords && result.missingKeywords.length > 0 ? (
        <div>
          <h2>Missing Keywords:</h2>
          <ul>
            {result.missingKeywords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <h3>Similarity Score: {result.similarityScore}</h3>
        </div>
      ) : (
        <p>No missing keywords found.</p>
      )}
    </div>
  );
}

export default App;
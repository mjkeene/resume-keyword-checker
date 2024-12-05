import React, { useState } from "react";
import './App.css';

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

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
      <h1>Resume Keyword Checker</h1>
      <form onSubmit={handleSubmit}>
        <div className="textarea-container">
          <label htmlFor="resume">Resume</label>
          <textarea
            id="resume"
            className="textarea"
            placeholder="Paste Resume Here"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows="10"
            cols="50"
          />
        </div>

        <div className="textarea-container">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            className="textarea"
            placeholder="Paste Job Description Here"
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
import React, { useState, useEffect } from "react";
import './App.css';
import logo from './logo.svg';
import logo2 from './JobHero.png';
import { useDropzone } from 'react-dropzone'; // Import react-dropzone
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.js`;


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

  // Handle resume PDF parsing
  const parsePDF = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = '';
        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const textContent = await page.getTextContent();
          text += textContent.items.map(item => item.str).join(' ');
        }
        setResume(text); // Set parsed resume text to the state
      };
      fileReader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
    } catch (error) {
      console.error("Error parsing PDF:", error);
    }
  };

  // Handle drag-and-drop functionality
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      parsePDF(file); // If the file is a PDF, parse it
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf", // Only allow PDF files
  });


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
          <label htmlFor="resume">Resume</label>
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
          <label htmlFor="jobDescription">Job Description</label>
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

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop your resume PDF here, or click to select a file</p>
      </div>

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
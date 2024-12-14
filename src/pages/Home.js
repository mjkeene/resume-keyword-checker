import React, { useState, useEffect } from "react";
import '../App.css';
import logo from '../logo.svg';
import logo2 from '../JobHero.png';
// import { useDropzone } from 'react-dropzone';
// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.js`;

const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "Don't let yesterday take up too much of today. – Will Rogers",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character. – Unknown",
  "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "It always seems impossible until it’s done. – Nelson Mandela",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently. – Marie Forleo"
];

function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [resumePlaceholder, setResumePlaceholder] = useState(""); // State to manage placeholder text
  const [jobDescriptionPlaceholder, setJobDescriptionPlaceholder] = useState(""); // State to manage Job Description placeholder
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a random quote when the component loads
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

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

  // // Handle resume PDF parsing
  // const parsePDF = async (file) => {
  //   try {
  //     const fileReader = new FileReader();
  //     fileReader.onload = async () => {
  //       const typedArray = new Uint8Array(fileReader.result);
  //       const pdf = await pdfjsLib.getDocument(typedArray).promise;
  //       let text = '';
  //       for (let i = 0; i < pdf.numPages; i++) {
  //         const page = await pdf.getPage(i + 1);
  //         const textContent = await page.getTextContent();
  //         text += textContent.items.map(item => item.str).join(' ');
  //       }
  //       setResume(text); // Set parsed resume text to the state
  //     };
  //     fileReader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
  //   } catch (error) {
  //     console.error("Error parsing PDF:", error);
  //   }
  // };

  // // Handle drag-and-drop functionality
  // const onDrop = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   if (file && file.type === "application/pdf") {
  //     parsePDF(file); // If the file is a PDF, parse it
  //   } else {
  //     alert("Please upload a PDF file.");
  //   }
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: ".pdf", // Only allow PDF files
  // });


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://ljamc3nez9.execute-api.us-west-2.amazonaws.com/default/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job_description: jobDescription }),
      });

      const data = await response.json();
      
      console.log("Response data:", data); // Log the response data

      if (data && data.missing_keywords) {
        setResult({
          missingKeywords: data.missing_keywords,
          // similarityScore: data.similarity_score,
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
        <img src={logo2} alt="Logo" className="logo" />
      </a>

      <h1>Resume Keyword Checker</h1>
      <div className="home-container">
        <div className="quote-banner">
          <p className="motivational-quote">{quote}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="textarea-container">
            <label htmlFor="resume">Resume</label>
            <textarea
              id="resume"
              className="textarea"
              placeholder={resumePlaceholder}
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

        {/*
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag and drop your resume PDF here, or click to select a file</p>
        </div>
        */}

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
    </div>
  );
};

export default Home;
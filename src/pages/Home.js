import React, { useState, useEffect } from "react";
import '../App.css';
import logo from '../logo.svg';
import logo2 from '../JobHero.png';

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
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [showSearchLink, setShowSearchLink] = useState(false);  // State to track button click
  const [advocateMessage, setAdvocateMessage] = useState("");
  const [copied, setCopied] = useState(false); // determine if advocateMessage has been copied
  const [hasEditedMessage, setHasEditedMessage] = useState(false); // only update advocateMessage if it hasn't been edited
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [resumePlaceholder, setResumePlaceholder] = useState(""); // State to manage placeholder text
  const [jobDescriptionPlaceholder, setJobDescriptionPlaceholder] = useState(""); // State to manage Job Description placeholder
  const [quote, setQuote] = useState("");

  // Helper to title case strings
  const titleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

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

    // Generate the Google search URL
    const generateSearchUrls = () => {
      const googleQuery = `site:linkedin.com/in/ ${jobTitle} recruiter ${company}`;
      const linkedInQuery = `${jobTitle} recruiter ${company}`;
    
      return {
        google: `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`,
        linkedIn: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(linkedInQuery)}`
      };
    };

    const handleCompareClick = () => {
      // Title-case the job title and company here
      const formattedJobTitle = titleCase(jobTitle);
      const formattedCompanyName = titleCase(company);

      // Set to true when the Compare button is clicked
      setShowSearchLink(true);

      // Scroll all the way down to the bottom
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',  // Enables smooth scrolling
        });
      }, 100); // Optional slight delay if needed

      if (company && jobTitle && !hasEditedMessage) {
        const message = 
      `Hi [Advocate Name],

I'm reaching out because I'm very interested in the ${formattedJobTitle} role at ${formattedCompanyName}. I believe my background and experience align well with the responsibilities and qualifications, and I'd love the opportunity to connect or learn more.

Thanks for your time, and I hope to hear from you!

Best regards,
[Your Name]`;
    
      setAdvocateMessage(message);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCompareClick();
    
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
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Airbnb"
                className="input"
              />
            </div>

            <div className="textarea-container">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Data Engineer"
                className="input"
              />
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

        {result && result.missingKeywords && result.missingKeywords.length > 0 ? (
          <div>
            <h2>Missing Keywords:</h2>
            <ul>
              {result.missingKeywords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
            {/* <h3>Similarity Score: {result.similarityScore}</h3> */}
          </div>
        ) : (
          <p>No missing keywords found.</p>
        )}
      </div>

      {/* Only show the link after clicking the "Compare" button */}
      {showSearchLink && company && jobTitle && (
        <div className="textarea-container">
          <label htmlFor="search-link-container">Google and LinkedIn Search for Recruiter/Company Advocate</label>
          <a
            href={generateSearchUrls().google}
            target="_blank"
            rel="noopener noreferrer"
            className="search-link"
          >
            Google results for "{jobTitle}" recruiter at "{company}"
          </a>
          <br />
          <a
            href={generateSearchUrls().linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="search-link"
          >
            LinkedIn results for "{jobTitle}" recruiter at "{company}"
          </a>

        </div>
          )}

        {showSearchLink && advocateMessage && (
          <div className="textarea-container">
            <label htmlFor="advocateMessageTemplate">Advocate Message Template</label>
            <div style={{ position: 'relative' }}>
              <textarea
                id="advocateMessageTemplate"
                className="textarea"
                value={advocateMessage}
                onChange={(e) => { 
                  setAdvocateMessage(e.target.value);
                  setHasEditedMessage(true);
                }}
                rows="12"
                cols="60"
              />
              <button
                className="copy-button"
                style={{
                  top: 5,
                  right: 5,
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const cleanedAdvocateMessage = advocateMessage
                  navigator.clipboard.writeText(cleanedAdvocateMessage);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? 'Copied!' : 'Copy Message'}
              </button>
                <p><strong>Tips for Advocate Message:</strong>
                <br />
                1. Mention your shared connection or interest (school, company, technology)<br />
                2. Keep it short and clear<br />
                3. Be polite and appreciative of their time<br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                </p>
              </div>
            </div>
          )}
    </div>
  );
};

export default Home;
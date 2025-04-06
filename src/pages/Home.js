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
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently. – Marie Forleo",
  "Whether you think you can or you think you can’t, you’re right. – Henry Ford",
  "I’m convinced that about half of what separates successful entrepreneurs from the non-successful ones is pure perseverance. – Steve Jobs",
  "Failure is simply the opportunity to begin again, this time more intelligently. – Henry Ford"
];

// TODO: Increase this later when error message is implemented. Resumes and Job Descriptions are hundreds of chars.
// Minimum length threshold for each document in order to make the API call
  const MIN_LENGTH = 10;

function Home() {
  const [company, setCompany] = useState("");
  const [companyPlaceholder, setCompanyPlaceholder] = useState('');
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitlePlaceholder, setJobTitlePlaceholder] = useState('');
  const [showSearchLink, setShowSearchLink] = useState(false);  // State to track button click
  const [networkingMessage, setNetworkingMessage] = useState("");
  const [copied, setCopied] = useState(false); // determine if networkingMessage has been copied
  const [hasEditedMessage, setHasEditedMessage] = useState(false); // only update networkingMessage if it hasn't been edited
  const [resume, setResume] = useState("");
  const [resumePlaceholder, setResumePlaceholder] = useState(""); // State to manage placeholder text
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionPlaceholder, setJobDescriptionPlaceholder] = useState(""); // State to manage Job Description placeholder
  const [result, setResult] = useState(null);
  const [quote, setQuote] = useState("");

  // Helper to title case strings
  const titleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

  useEffect(() => {
    // Select a random quote when the component loads
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Typing animation for placeholders
  const typingAnimation = (text, setPlaceholder) => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(() => text.substring(0, index + 1)); // Only update up to current character
      index++;
      if (index === text.length) {
        clearInterval(interval); // Stop the interval when the full text is displayed
      }
    }, 100); // Typing speed is adjustable here (100ms)
  };

  // Trigger typing animation on each placeholder text
  useEffect(() => {
    typingAnimation('Paste Resume Here', setResumePlaceholder);
    typingAnimation('Paste Job Description Here', setJobDescriptionPlaceholder);
    typingAnimation('e.g. AirBnb', setCompanyPlaceholder);
    typingAnimation('e.g. Product Manager', setJobTitlePlaceholder);
  }, []);

  // Generate Google and LinkedIn search URLs for recruiter or manager roles
  const generateSearchUrls = () => {
    // Build Google query with Boolean logic
    const googleQuery = `site:linkedin.com/in/ ${jobTitle} (recruiter OR manager) ${company}`;

    // LinkedIn also allows boolean logic, but it's a little different than google
    const linkedInQuery = `"${jobTitle}" AND ("recruiter" OR "manager") ${company}`;

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
    `Subject: Seeking Insight into [Your Field or Industry]

Hi [Contact Name],

I came across your profile while researching professionals in the [${formattedJobTitle}] space and noticed your impressive background at [${formattedCompanyName}]. I'm currently exploring [specific topic or role, e.g., data engineering, autonomous vehicles, software development], and I'd love to hear about your journey and experiences in this space. Would you be open to sharing a few insights or advice?

I'd love to hear how you navigated your career in [Their Field or Industry] and what key factors have influenced your success.

Thanks so much for your time — I really appreciate any guidance you can offer!

Best regards,
[Your Name]
[Your LinkedIn/Contact Info]
`
;
  
    setNetworkingMessage(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCompareClick();

    // TODO: Add descriptive error message when this happens rather than just saying no missing keywords.
    // Check if the job description or resume meets the minimum length
    if (jobDescription.length < MIN_LENGTH || resume.length < MIN_LENGTH) {
      console.log("Resume or Job Description document too short");
      return; // Exit the function early if the length is too short
    }
    
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

      <h1>Resume & Networking Optimizer</h1>
      <h4><i>Fix your resume's blind spots — and connect with the people who care.</i></h4>
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
                placeholder={companyPlaceholder}
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
                placeholder={jobTitlePlaceholder}
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
          <div className="textarea-container">
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
        <h2>Google and LinkedIn Search for Recruiter/Company Contact</h2>
          <a
            href={generateSearchUrls().google}
            target="_blank"
            rel="noopener noreferrer"
            className="search-link"
          >
            Google results for "{jobTitle}" at "{company}"
          </a>
          <br />
          <a
            href={generateSearchUrls().linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="search-link"
          >
            LinkedIn results for "{jobTitle}" at "{company}"
          </a>

        </div>
          )}

        {showSearchLink && networkingMessage && (
          <div className="textarea-container">
            <h2>Networking Message Template</h2>
            <div style={{ position: 'relative' }}>
              <textarea
                id="networkingMessageTemplate"
                className="textarea"
                value={networkingMessage}
                onChange={(e) => { 
                  setNetworkingMessage(e.target.value);
                  setHasEditedMessage(true);
                }}
                rows="16"
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
                  const cleanedNetworkingMessage = networkingMessage
                  navigator.clipboard.writeText(cleanedNetworkingMessage);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? 'Copied!' : 'Copy Message'}
              </button>
                <p><strong>Tips for Networking Message:</strong>
                <br />
                1. Make sure there are no [brackets] left (use ctrl + f). Fill those areas in with relevant words for you, then copy the message.<br />
                2. Keep it short and clear; easy for recipient to read quickly.<br />
                3. Mention your shared connection or interest (school, company, technology); nice touch but ultimately unnecessary.<br />
                4. Ask for insight and experience, not job leads or referrals yet.<br />
                5. First paragraph ends in a question mark. Keep in mind you're interested in them—don't overqualify yourself, just show genuine interest.<br />
                6. Use "you" and "your" a lot—it's about them; be polite and appreciative of their time.<br />
                7. Categorize interest clearly (e.g., trying to learn more about data engineering in the autonomous vehicle space).<br />
                8. <b>Follow up!</b> Over 80% of responses come after following-up. Wait ~1 week for the first follow-up. Note that most cold messages will be ignored (around 80%). Keep trying.
                <br />
                <br />
                </p>
              </div>
              <p><strong>Useful Resources:</strong>
              <br />
              1. <a href="https://linkedin.github.io/career-explorer/" target="_blank">LinkedIn Career Explorer</a>: This shows job skills and similar roles<br />
              2. <a href="https://www.apollo.io/" target="_blank">Apollo</a>: Find work emails to network<br /> 
              <br />
              <br />
              <br />
              </p>
            </div>
          )}
    </div>
  );
};

export default Home;
import React from 'react';

const jobBoards = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/jobs/",
    strengths: "Large network, diverse job postings, great for professional networking.",
    recommendedUse: "Best for professional-level jobs, networking, and connecting with recruiters."
  },
  {
    name: "Indeed",
    url: "https://www.indeed.com/",
    strengths: "Wide variety of job postings across industries, easy to use, includes salary info.",
    recommendedUse: "Ideal for job seekers looking for jobs across multiple industries or searching for remote work."
  },
  {
    name: "Glassdoor",
    url: "https://www.glassdoor.com/Job/index.htm",
    strengths: "Includes company reviews and salary information, transparent about company culture.",
    recommendedUse: "Good for research before applying, especially if you want insights into company culture or pay."
  },
  {
    name: "AngelList",
    url: "https://angel.co/jobs",
    strengths: "Focus on startup jobs, investment opportunities, and growing tech companies.",
    recommendedUse: "Best for job seekers interested in startup environments, technology, or entrepreneurial ventures."
  },
  {
    name: "Remote OK",
    url: "https://remoteok.io/",
    strengths: "Specifically for remote job listings across various industries and job types.",
    recommendedUse: "Perfect for remote job seekers looking for positions across different time zones and industries."
  },
  {
    name: "We Work Remotely",
    url: "https://weworkremotely.com/",
    strengths: "Exclusive listings for remote work opportunities.",
    recommendedUse: "Great for people focused on finding remote work, especially for developers, designers, and marketers."
  },
  {
    name: "FlexJobs",
    url: "https://www.flexjobs.com/",
    strengths: "Hand-curated listings, focused on remote, flexible, and freelance jobs.",
    recommendedUse: "Perfect for those seeking flexible work options, freelance gigs, or work-life balance."
  },
  {
    name: "SimplyHired",
    url: "https://www.simplyhired.com/",
    strengths: "Search engine that aggregates listings from other job boards, wide variety of roles.",
    recommendedUse: "Best for a broad search across job categories, especially for entry-level positions."
  }
];

const JobBoards = () => {
  return (
    <div className="job-boards-container">
      <h1>Job Boards and Their Strengths</h1>
      <p>Here is a list of some popular job boards along with their strengths and best use cases to help you find your next career opportunity.</p>
      
      <div className="job-boards-list">
        {jobBoards.map((board, index) => (
          <div className="job-board" key={index}>
            <h2><a href={board.url} target="_blank" rel="noopener noreferrer">{board.name}</a></h2>
            <p><strong>Strengths:</strong> {board.strengths}</p>
            <p><strong>Recommended Use:</strong> {board.recommendedUse}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoards;
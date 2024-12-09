import React from "react";
import "./About.css"; // Optional: CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About JobHero</h1>
      <p>
        Welcome to <strong>JobHero</strong>—your ultimate platform for career growth and job search success!
        We are dedicated to helping professionals craft standout resumes, access insightful
        resources, and find meaningful opportunities.
      </p>

      <section>
        <h2>Our Mission</h2>
        <p>
          At JobHero, our mission is to empower job seekers by providing tools and resources
          that enhance their job search experience. Whether you're crafting your resume or
          preparing for interviews, we're here to help every step of the way.
        </p>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Resume Optimization:</strong> Analyze and improve your resume for top keywords.</li>
          <li><strong>Blog Articles:</strong> Explore insightful tips and advice on career advancement.</li>
          <li><strong>Customizable Tools:</strong> Tailored resources to meet your specific job search needs.</li>
        </ul>
      </section>

      <section>
        <h2>Why Choose JobHero?</h2>
        <p>
          We believe that finding your dream job should be straightforward and stress-free.
          Our platform is designed to provide actionable insights and a seamless user experience.
        </p>
      </section>

      <footer>
        <p>
          <strong>Start your journey with JobHero today!</strong> We're excited to be a part of
          your career story.
        </p>
      </footer>
    </div>
  );
};

export default About;
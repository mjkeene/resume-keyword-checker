import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

function BlogDetail() {
  const { id } = useParams(); // Access the URL parameter (id)
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article details from an API or local data based on the id
    const articles = [
      {
        id: 1,
        title: "How to Stand Out in a Competitive Job Market",
        content: `
          <p>The job search can feel overwhelming, especially when the competition is fierce. However, there are several strategies you can employ to increase your chances of landing your dream job. From refining your resume to mastering networking, here are some top tips that can help you stand out.</p>
            <ol>
              <li><strong>Tailor Your Resume to Each Job</strong>
                <p>A generic resume might be easier to send out, but it's far less effective than a tailored one. By customizing your resume for each job application, you can emphasize the skills and experiences that are most relevant to the position. Be sure to read through the job description thoroughly and align your accomplishments and skills with the keywords the employer is looking for.</p>
              </li>
              <li><strong>Leverage LinkedIn to Build Your Network</strong>
                <p>Networking is one of the most powerful tools in your job search arsenal. LinkedIn is a goldmine for professional networking, allowing you to connect with hiring managers, recruiters, and potential colleagues in your industry. Regularly update your profile, join relevant groups, and engage with posts in your field to keep yourself visible and top-of-mind when job opportunities arise.</p>
              </li>
              <li><strong>Research Companies and Roles Thoroughly</strong>
                <p>Don't just apply blindly to every opening you see. Take the time to research companies and the roles they're hiring for. Look at company reviews, recent news, and employee testimonials to get a sense of the work culture and whether it's a good fit for you. This research will not only help you tailor your application but will also allow you to ask insightful questions during the interview.</p>
              </li>
              <li><strong>Practice for Interviews</strong>
                <p>Interviews are your chance to showcase your skills, experience, and fit for the role. Preparing ahead of time will give you a huge advantage. Review common interview questions and come up with thoughtful answers that highlight your achievements. You can also practice mock interviews with a friend or mentor to refine your communication skills and get comfortable with answering on the spot.</p>
              </li>
              <li><strong>Stay Positive and Persistent</strong>
                <p>Job searching can be a marathon, not a sprint. It's easy to get discouraged when you don't hear back immediately or face rejections, but persistence is key. Keep applying, networking, and improving your skills. Every no brings you closer to a yes, and the right opportunity could be just around the corner.</p>
              </li>
              <li><strong>Follow Up After Interviews</strong>
                <p>It's important to send a thank-you note after every interview. Not only is it polite, but it also serves as an opportunity to reiterate your interest in the position and highlight something specific you discussed during the interview. A thoughtful follow-up can leave a lasting impression and set you apart from other candidates.</p>
              </li>
            </ol>
        `
      },
      {
        id: 2,
        title: "5 Common Job Search Mistakes and How to Avoid Them",
        content: `
          <p>Job searching can be challenging, and it's easy to fall into some common traps that could hinder your progress. By being aware of these mistakes, you can adjust your approach and increase your chances of success.</p>
            <ol>
              <li><strong>Not Tailoring Your Resume</strong>
                <p>One of the most common mistakes job seekers make is submitting the same resume for every position. Employers want to see how your skills align with the specific role they're hiring for. By taking the extra time to tailor your resume, you're demonstrating that you understand the job requirements and are genuinely interested in the position.</p>
              </li>
              <li><strong>Ignoring Your Online Presence</strong>
                <p>In today's digital age, your online presence is just as important as your resume. Many hiring managers will look at your LinkedIn profile, social media accounts, or even Google your name before making a decision. Ensure that your online presence reflects your professional persona. Clean up any inappropriate content and ensure your profiles are up-to-date and aligned with your job goals.</p>
              </li>
              <li><strong>Not Preparing for Interviews</strong>
                <p>Interview preparation is critical to your success. Simply showing up is not enough. Take the time to research the company, rehearse your answers, and be ready to ask insightful questions. Not preparing thoroughly can leave a poor impression and reduce your chances of getting an offer.</p>
              </li>
              <li><strong>Underestimating the Power of Networking</strong>
                <p>While it's important to apply to jobs, networking can be just as essential. Many positions aren't advertised, and a strong network can help you tap into the hidden job market. Don't be afraid to reach out to industry contacts, attend networking events, and participate in online communities.</p>
              </li>
              <li><strong>Settling for the First Offer</strong>
                <p>It might be tempting to accept the first job offer that comes your way, especially if you've been job hunting for a while. However, it's essential to evaluate the offer carefully. Consider the company culture, compensation, growth potential, and work-life balance before making a decision. Taking the time to find the right fit can save you from regret later on.</p>
              </li>
            </ol>
        `
      },
      {
        id: 3,
        title: "Networking Tips for Job Seekers: Building Relationships That Last",
        content: `
            <p>Networking is often one of the most overlooked aspects of job searching, but it's crucial for opening doors to new opportunities. Building meaningful professional relationships takes time, but the benefits are well worth the effort.</p>
            <ol>
              <li><strong>Be Genuine</strong>
                <p>When networking, it's important to be genuine in your interactions. Focus on building relationships rather than immediately asking for a job. Show interest in others' careers, experiences, and insights, and offer help where you can. Authenticity goes a long way in creating lasting connections.</p>
              </li>
              <li><strong>Expand Your Network Beyond Your Current Industry</strong>
                <p>While networking within your field is important, you should also broaden your network to include professionals from other industries. Different perspectives and experiences can provide valuable insights and potential job leads that you wouldn't have access to otherwise.</p>
              </li>
              <li><strong>Attend Industry Events</strong>
                <p>Conferences, meetups, and workshops are great places to meet new people and expand your network. Many industries host virtual events, so don't feel limited to in-person gatherings. Participating in industry-specific events can help you stay up-to-date on trends and connect with like-minded professionals.</p>
              </li>
              <li><strong>Follow Up</strong>
                <p>After meeting someone at a networking event or on LinkedIn, be sure to follow up with a personalized message. This can help solidify the relationship and open the door for future interactions. Be respectful of their time and offer value, such as sharing relevant articles or resources.</p>
              </li>
            </ol>
        `
      },
      {
        id: 4,
        title: "How to Stay Motivated During Your Job Search",
        content: `
            <p>Searching for a job can feel like a full-time job in itself, and it's easy to become discouraged along the way. However, maintaining motivation is key to staying productive and positive throughout the process. Here are a few strategies to keep your momentum going.</p>
            <ol>
              <li><strong>Set Small Goals</strong>
                <p>Breaking your job search into manageable tasks can make it feel less overwhelming. Instead of focusing solely on the end goal, like landing a job, set small, achievable milestones along the way. For example, aim to apply to a certain number of jobs each week or update your resume and LinkedIn profile. Celebrating these small wins can boost your morale.</p>
              </li>
              <li><strong>Take Breaks and Avoid Burnout</strong>
                <p>While it's important to stay focused, taking regular breaks is essential for avoiding burnout. Spend time doing things that relax and recharge you, such as exercising, reading, or spending time with family. Taking care of yourself will help you stay energized and motivated throughout the process.</p>
              </li>
              <li><strong>Seek Support from Others</strong>
                <p>Job searching can be isolating, but you're not alone. Reach out to friends, family, or a mentor for encouragement. Sharing your experiences with others can help you feel supported and remind you that you're making progress, even when things feel slow.</p>
              </li>
              <li><strong>Stay Organized</strong>
                <p>Keeping track of the jobs you've applied to, upcoming interviews, and deadlines is critical for staying motivated. Consider using a spreadsheet or job search management tool to track your applications and follow-up tasks. Staying organized will help you feel more in control of the process and prevent missed opportunities.</p>
              </li>
              <li><strong>Focus on What You Can Control</strong>
                <p>The job market can be unpredictable, but focusing on the actions you can control—like improving your skills or expanding your network—will help you feel empowered. While you can't always control the outcome, you can control the effort you put into your job search.</p>
              </li>
            </ol>
        `
      }
    ];
    

    const article = articles.find((a) => a.id === parseInt(id));
    setArticle(article);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
      <h1>{article.title}</h1>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

export default BlogDetail;

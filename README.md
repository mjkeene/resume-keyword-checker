<h2>Resume Keyword Checker</h2>

[Link to frontend on S3](http://resume-networking-optimizer.s3-website.us-east-2.amazonaws.com/)

<h3>Overview</h3>

* The Resume & Networking Optimizer is a tool designed to help job seekers optimize their resumes by identifying critical keywords from job descriptions and comparing them with their resumes, and then network with relevant contacts. By pinpointing missing or underutilized keywords, this tool ensures that resumes are tailored for Applicant Tracking Systems (ATS) and stand out to recruiters. Networking ultimately gets you in front of the right people.
* This was inspired by websites like [jobscan](https://www.jobscan.co/)

<h3>Features</h3>

* Job Description Parsing: Extracts keywords and phrases from job postings.
* Resume Analysis: Scans resumes for keywords relevant to the job description.
* Keyword Matching: Highlights missing, overused, or underutilized keywords.
* Networking contact finder on Google and LinkedIn to make it easy to find relevant contacts.
* Networking template message to make this frictionless.
* Customizable Matching Criteria: Supports fine-tuning of keyword matching logic based on user preferences (e.g., synonyms, word frequency). -- not yet
* User-Friendly Reports: Generates clear, actionable feedback for improving resume alignment.

<h3>Benefits</h3>

* Increases chances of passing ATS screenings.
* Simplifies the resume tailoring process for specific roles.
* Empowers users with data-driven insights into their resumes.
* Easy to find 10-20 relevant connections to reach out to.
* Free; jobscan is not.


<h3>Technologies Used</h3>

* <b>Programming Languages</b>: JavaScript, Python

Libraries:

	* Frontend: `React` for building a user-friendly web interface.
	* Backend: `Flask` to serve the API and connect with analysis logic.
	* `pandas`: For data manipulation and analysis.
	* `nltk` or `spaCy`: For natural language processing.
	* File Handling: Supports pasting in resume for now; expand to parsing `.txt`, `.docx`, and `.pdf` formats for resumes.


<i>React boilerplate README below this line with run instructions.</i>

---
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

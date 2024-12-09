import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="blog-container">
      <h1>Blog Articles</h1>
      <div className="blog-articles">
        <article>
          <h2>Understanding React Components</h2>
          <p>
            React components are the building blocks of a React application...
          </p>
          <Link to="/blog/1">Read More</Link> {/* Link to individual article */}
        </article>

        <article>
          <h2>Getting Started with CSS Flexbox</h2>
          <p>
            CSS Flexbox is a layout module that helps you design flexible layouts...
          </p>
          <Link to="/blog/2">Read More</Link>
        </article>

        <article>
          <h2>JavaScript ES6 Features You Should Know</h2>
          <p>
            ES6 introduced several new features in JavaScript, including arrow...
          </p>
          <Link to="/blog/3">Read More</Link>
        </article>
      </div>
    </div>
  );
}

export default Blog;
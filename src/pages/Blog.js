import React from "react";

function Blog() {
  return (
    <div className="blog-container">
      <h1>Blog Articles</h1>
      <div className="blog-articles">
        <article>
          <h2>Understanding React Components</h2>
          <p>
            React components are the building blocks of a React application. They
            allow you to create reusable UI elements and manage state effectively.
          </p>
          <a href="/article-1">Read More</a>
        </article>

        <article>
          <h2>Getting Started with CSS Flexbox</h2>
          <p>
            CSS Flexbox is a layout module that helps you design flexible and
            responsive layouts easily. Learn the basics to get started.
          </p>
          <a href="/article-2">Read More</a>
        </article>

        <article>
          <h2>JavaScript ES6 Features You Should Know</h2>
          <p>
            ES6 introduced several new features in JavaScript, including arrow
            functions, template literals, and more. Find out how they can make
            your code cleaner.
          </p>
          <a href="/article-3">Read More</a>
        </article>
      </div>
    </div>
  );
}

export default Blog;
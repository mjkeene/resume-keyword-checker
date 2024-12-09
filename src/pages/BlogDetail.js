import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

function BlogDetail() {
  const { id } = useParams(); // Access the URL parameter (id)
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article details from an API or local data based on the id
    // For now, we'll just use mock data

    const articles = [
      { id: 1, title: "Understanding React Components", content: "Full content about React Components..." },
      { id: 2, title: "Getting Started with CSS Flexbox", content: "Full content about CSS Flexbox..." },
      { id: 3, title: "JavaScript ES6 Features You Should Know", content: "Full content about ES6 features..." }
    ];

    const article = articles.find((a) => a.id === parseInt(id));
    setArticle(article);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}

export default BlogDetail;
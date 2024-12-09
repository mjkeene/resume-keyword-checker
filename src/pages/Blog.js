import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: 'us-east-1', // Set your region
  // Fill these in for local access
  accessKeyId: '',
  secretAccessKey: '',
});

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogContent('blog-posts/'); // Replace 'blog-folder' with your S3 folder name
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  const getBlogContent = async (folderName) => {
    try {
      const params = {
        Bucket: 'resume-keyword-checker',
        Prefix: folderName,
      };

      const data = await s3.listObjectsV2(params).promise();
      const files = data.Contents.filter(file => file.Key.endsWith('.json'));

      const blogPosts = await Promise.all(files.map(async (file) => {
        const fileParams = { Bucket: 'resume-keyword-checker', Key: file.Key };
        const fileData = await s3.getObject(fileParams).promise();
        const content = fileData.Body.toString('utf-8');
        return JSON.parse(content);
      }));

      return blogPosts;
    } catch (error) {
      console.error('Error fetching blog content from S3:', error);
      return [];
    }
  };

  return (
    <div className="blog-container">
      <h1>Blog Articles</h1>
      <div className="blog-articles">
        {blogPosts.map((post, index) => (
          <article key={index}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p> {/* Excerpt or preview of the post */}
            <Link to={`/blog/${post.id}`}>Read More</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;

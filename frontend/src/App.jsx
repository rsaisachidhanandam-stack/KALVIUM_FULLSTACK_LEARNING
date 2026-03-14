import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPosts, deletePost } from './service/postService';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();

      if (!data.success) {
        throw new Error(data.message || 'Failed to load posts');
      }

      setPosts(data.posts || []);
    } catch (err) {
      toast.error(err.message || 'Something went wrong while loading posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deletePost(id);

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete post');
      }

      toast.success(data.message || 'Post deleted successfully');
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      // This will show messages from your backend like:
      // "You don't have permission to delete this post"
      toast.error(err.message || 'Something went wrong while deleting post');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Full-Stack Error Handling Demo</h1>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && <p>No posts yet.</p>}

      <ul>
        {posts.map((post) => (
          <li key={post._id} style={{ marginBottom: '0.5rem' }}>
            <strong>{post.title}</strong>{' '}
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={loadPosts} style={{ marginTop: '1rem' }}>
        Reload posts
      </button>
    </div>
  );
}

export default App;

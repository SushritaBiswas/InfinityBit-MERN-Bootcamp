import { useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await res.json();
        setArticles(result);
      } catch (err) {
        console.error('Could not fetch articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Latest Articles</h1>

      {isLoading ? (
        <p>Fetching awesome stuff for you...</p>
      ) : (
        articles.slice(0, 10).map((item) => (
          <article key={item.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))
      )}
    </main>
  );
}

export default App;

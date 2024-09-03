import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../components/BookItems';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5000/books/book');
        console.log(response);
        setBooks(response.data.books); // Assuming response.data is an array of book objects
      } catch (err) {
        setError('Failed to fetch books: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
};

export default Home;

import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import BookItem from '../components/BookItems';

const fetchBooks = async () => {
  const response = await axios.get('http://localhost:5000/books/book');
  return response.data.books; // Assuming response.data contains a books array
};

const Home = () => {
  const { data: books, isLoading, isError, error } = useQuery({
    queryKey: ['books'], // Using an array to define the query key
    queryFn: fetchBooks,
    staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div style={{ color: 'red' }}>{error.message}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
};

export default Home;

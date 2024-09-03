import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from '../components/BookItems';
import AddBookModal from '../components/AddBookModal';

const LikedBooks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mybooks,setMyBooks] = useState([]);


  const handleBookAdded = (newbook) => {
    // Refresh the list of books
    // You can either call fetchBooks() again or update the list directly
    //we going to use redux for this we can use usecntext .....

    console.log(newbook);
    alert("adding books..");
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5000/books/mybooks');
        console.log(response);
        setMyBooks(response.data); // Assuming response.data is an array of book objects
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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Book
        </button>
      </div>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAdded={handleBookAdded}
      />
 
 <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black py-8">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-white mb-6">My Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mybooks?.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>

    </div>
  );
};

export default LikedBooks;
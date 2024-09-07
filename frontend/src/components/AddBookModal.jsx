import React, { useState, useEffect } from 'react';
import axios from '../lib/axios.jsx';

const AddBookModal = ({ isOpen, onClose, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear.toString());
    if (image) {
      formData.append('bookimg', image); // Use 'bookimg' as the key
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('/books/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important: Set the correct content type
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert('Book added successfully!');
      setTitle('');
      setAuthor('');
      setPublishYear('');
      setImage(null);
      onBookAdded({
        title,author,publishYear
      }); // Callback to refresh the list
      onClose(); // Close the modal
    } catch (err) {
      if (err.response && err.response.data.message === 'jwt expired') {
        // Handle JWT expiration
        alert('Session expired. Please log in again.');
        
        // Clear the token and redirect to login page
        localStorage.removeItem('accessToken');
        navigate('/login');
      } 
      setError('Failed to add book: ' + err.message);
    } finally {
      setLoading(false);

      

    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Publish Year:</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-blue-500 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

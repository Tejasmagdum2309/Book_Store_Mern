import React from 'react';

const BookItem = ({ book }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
      <img
        src={book.imageUrl}
        alt={book.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{book.title || "ypoi"}</h3>
      <p className="text-gray-700 mb-2">by {book.author}</p>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {book.liked ? 'Liked' : 'Like'}
        </button>
        <span
          className={`px-3 py-1 text-sm font-medium rounded ${
            book.isPremium ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {book.isPremium ? 'Premium' : 'Standard'}
        </span>
      </div>
    </div>
  );
};

export default BookItem;

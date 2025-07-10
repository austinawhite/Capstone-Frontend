import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function Reviews() {
  const { id } = useParams(); // need to check route
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

// fetch review
// 
  useEffect(() => {
    fetch(`/api/experiences/${id}/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(err => {
        console.error("Failed to fetch reviews:", err);
      });
  }, [id]);

  // new review submit
  //
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/experiences/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment })
    });

    const data = await res.json();
    if (res.ok) {
      setReviews([data, ...reviews]);
      setRating(5);
      setComment('');
    } else {
      alert(data.error || "Failed to submit review.");
    }
  };

  return (
    <div>
      <h2>Reviews for Experience #{id}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Rating (1–5):
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>

      <h3>Previous Reviews:</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id}>
            <strong>{r.rating} / 5</strong>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

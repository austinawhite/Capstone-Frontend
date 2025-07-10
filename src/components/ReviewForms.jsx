import { useState } from 'react';

export default function ReviewForm({ experienceId, onReviewSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/experiences/${experienceId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });

    const data = await res.json();
    if (res.ok) {
      onReviewSubmit(data);
      setRating(5);
      setComment('');
    } else {
      alert(data.error || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Leave a Review</h4>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
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
  );
}

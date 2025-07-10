import { useEffect, useState } from 'react';

export default function ReviewList({ experienceId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/experiences/${experienceId}/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(err => {
        console.error("Failed to fetch reviews:", err);
      });
  }, [experienceId]);

  return (
    <div>
      <h3>User Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>Rating: {r.rating} / 5</strong>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

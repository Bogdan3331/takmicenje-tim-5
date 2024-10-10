import React, { useState } from "react";
import { Rate, Input, Button } from "antd";
import ApiService from "../../Shared/api";

interface RatingFormProps {
  reservationId: number;
  currentRating?: number;
  currentComment?: string;
  onRated: (reservationId: number, rating?: number, comment?: string) => void;
  loading?: boolean;
}

const RatingForm: React.FC<RatingFormProps> = ({
  reservationId,
  onRated,
  loading = false,
}) => {
  const [rating, setRating] = useState<number | undefined>();
  const [comment, setComment] = useState<string>();

  const handleRate = async () => {
    const payload: { rate?: number; comment?: string } = {};
    if (rating !== undefined) {
      payload.rate = rating;
    }
    if (comment) {
      payload.comment = comment;
    }

    try {
      await ApiService.RateReservation(reservationId, payload);
      alert("Rating submitted successfully!");
      onRated(reservationId, rating, comment);
    } catch (error: unknown) {
      console.error("Failed to submit rating", error);
    }
  };

  return (
    <>
      <Rate allowHalf value={rating} onChange={setRating} />
      <Input
        placeholder="Leave a comment"
        maxLength={100}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        type="primary"
        onClick={handleRate}
        loading={loading}
        className="mt-2"
      >
        Submit
      </Button>
    </>
  );
};

export default RatingForm;

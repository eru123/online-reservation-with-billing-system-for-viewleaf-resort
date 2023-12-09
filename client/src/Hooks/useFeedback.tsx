import { useState } from 'react';
import useRequest from './useRequest';

interface FeedbackData {
  reservationId: string;
  rating?: number;
  review?: string;
}

function useFeedback() {
  const { data, loading, error, makeRequest } = useRequest();

  const createFeedback = (content: FeedbackData) => {
    makeRequest({
      method: 'post',
      url: '/reservations/feedbacks',
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    createFeedback
  };
}

export default useFeedback;

import { useState } from 'react';
import useRequest from './useRequest';

interface ReservationData {
  faqId: number;
  question: string;
  answer: string;
}

function useReservation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getReservation = () => {
    makeRequest({
      method: 'get',
      url: `/reservations`,
    });
  };

  const createReservation = (content: ReservationData) => {
    makeRequest({
      method: 'post',
      url: '/reservations',
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getReservation,
    createReservation
  };
}

export default useReservation;

import { useState } from 'react';
import useRequest from './useRequest';

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  schedule: number;
  accommodations: {
    accommodationId: string;
    shift: string;
    guests: {
      adult: number;
      children: number;
      senior: number;
      pwd: number;
    },
    inclusions: {
        name: string;
        quantity: number;
    }[]
  }[]
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

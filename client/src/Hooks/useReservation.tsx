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

interface GetReservation{
  reservationId?: string | undefined;
}

interface PayReservation{
  reservationId: string;
  receipt: string;
}

interface UpdateReservation{
  reservationId: string;
  status: string;
  note: string;
}

function useReservation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getReservation = (content?: GetReservation) => {
    makeRequest({
      method: 'get',
      url: `/reservations`,
      params: content
    });
  };

  const createReservation = (content: ReservationData) => {
    makeRequest({
      method: 'post',
      url: '/reservations',
      data: content,
    });
  };

  const payReservation = (content: PayReservation) => {
    makeRequest({
      method: 'post',
      url: '/reservations/pay',
      data: content,
    });
  };

  const updateReservation = (content: UpdateReservation) => {
    makeRequest({
      method: 'patch',
      url: '/reservations/update',
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getReservation,
    createReservation,
    payReservation,
    updateReservation
  };
}

export default useReservation;

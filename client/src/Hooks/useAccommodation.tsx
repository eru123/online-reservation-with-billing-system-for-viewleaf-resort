import { useState } from 'react';
import useRequest from './useRequest';

interface AccommodationData {
  type: string;
  title: string;
  description: string;
  pax: string;
  image: string;
  fees: {
    shift: string;
    rate: number;
    adultFee: number;
    kidsFee: number;
  }[];
  inclusions: {
    name: string;
    price: number;
  }[];
}

interface GetAccommodationData {
  accommodationId?: string | null;
  schedule?: any | null;
  shift?: string | null;
  all?: boolean | null
}

interface ShiftData {

}

function useAccommodation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getAccommodation = (content?: GetAccommodationData) => {
    makeRequest({
      method: 'get',
      url: `/accommodations`,
      params: content || {},
    });
  };

  const createAccommodation = (content: AccommodationData) => {
    makeRequest({
      method: 'post',
      url: '/accommodations',
      data: content,
    });
  };

  const updateAccommodation = (content: AccommodationData) => {
    makeRequest({
      method: 'patch',
      url: `/accommodations`,
      data: content,
    });
  };

  const createShift = (content: ShiftData) => {
    makeRequest({
      method: 'post',
      url: '/accommodations/shifts',
      data: content,
    });
  };


  const updateShift = (content: ShiftData) => {
    makeRequest({
      method: 'patch',
      url: `/accommodations/shifts`,
      data: content,
    });
  };

  const updateInclusions = (content: any) => {
    makeRequest({
      method: 'patch',
      url: `/inclusions`,
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getAccommodation,
    createAccommodation,
    updateAccommodation,
    createShift,
    updateShift,
    updateInclusions
  };
}

export default useAccommodation;

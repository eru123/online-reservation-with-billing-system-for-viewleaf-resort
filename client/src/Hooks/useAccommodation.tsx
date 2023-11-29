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

interface ShiftData {

}

function useAccommodation() {
  const { data, loading, error, makeRequest } = useRequest();

  const getAccommodation = () => {
    makeRequest({
      method: 'get',
      url: `/accommodations`,
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

  return {
    data,
    loading,
    error,
    getAccommodation,
    createAccommodation,
    updateAccommodation,
    createShift,
    updateShift
  };
}

export default useAccommodation;

import { useState } from 'react';
import useRequest from './useRequest';

interface AccommodationData {

}

interface ShiftData {

}



function useAccommodation() {
  const { data, loading, error, makeRequest } = useRequest();

  // const getAccommodation = () => {
  //   makeRequest({
  //     method: 'get',
  //     url: `/faqs`,
  //   });
  // };

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
    createAccommodation,
    updateAccommodation,
    createShift,
    updateShift
  };
}

export default useAccommodation;

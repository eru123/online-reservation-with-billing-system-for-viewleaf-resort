import { useState } from 'react';
import useRequest from './useRequest';

export interface Duration {
  start: string;
  end: string; 
}
export interface Shift {
  day: Duration;
  night: Duration; 
  whole: Duration;
}

interface ContentData {
  about: string;
  phone: number;
  email: string,
  address: string,
  policy: string,
  payment: string,
  promo: string,
  shift: Shift,
}

interface UpdateContentData {
  about?: string;
  phone?: number;
  email?: string,
  address?: string,
  policy?: string,
  payment?: string,
  promo?: string,
}

interface UpdateShiftData {
  day?: Duration;
  night?: Duration; 
  whole?: Duration;
}


function useContent() {
  const { data, loading, error, makeRequest } = useRequest();

  const getContent = () => {
    makeRequest({
      method: 'get',
      url: `/contents`,
    });
  };

  const updateContent = (content: UpdateContentData) => {
    makeRequest({
      method: 'patch',
      url: `/contents`,
      data: content,
    });
  };

  const getShift = () => {
    makeRequest({
      method: 'get',
      url: `/contents/shifts`,
    });
  };

  const updateShift = (content: UpdateShiftData) => {
    makeRequest({
      method: 'patch',
      url: `/contents/shifts`,
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getContent,
    updateContent,
    getShift,
    updateShift
  };
}

export default useContent;

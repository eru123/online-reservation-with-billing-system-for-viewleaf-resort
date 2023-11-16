import { useState } from 'react';
import useRequest from './useRequest';

interface ContentData {
  about: string;
  phone: number;
  email: string,
  address: string,
  policy: string,
  payment: string,
  promo: string,
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

  return {
    data,
    loading,
    error,
    getContent,
    updateContent,
  };
}

export default useContent;

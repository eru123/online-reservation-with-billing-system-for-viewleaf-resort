import { useState } from 'react';
import useRequest from './useRequest';

interface FAQData {
  faqId: number;
  question: string;
  answer: string;
}

interface CreateFAQData {
  question: string;
  answer: string;
}

interface UpdateFAQData {
  faqId: number;
  question?: string;
  answer?: string;
}

interface DeleteFAQData {
  faqId: number;
}


function useFAQ() {
  const { data, loading, error, makeRequest } = useRequest();

  const getFAQ = () => {
    makeRequest({
      method: 'get',
      url: `/faqs`,
    });
  };

  const createFAQ = (content: CreateFAQData) => {
    makeRequest({
      method: 'post',
      url: '/faqs',
      data: content,
    });
  };

  const updateFAQ = (content: UpdateFAQData) => {
    makeRequest({
      method: 'patch',
      url: `/faqs`,
      data: content,
    });
  };

  const deleteFAQ = (content: DeleteFAQData) => {
    makeRequest({
      method: 'delete',
      url: `/faqs`,
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getFAQ,
    createFAQ,
    updateFAQ,
    deleteFAQ,
  };
}

export default useFAQ;

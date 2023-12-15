import { useState } from 'react';
import useRequest from './useRequest';

interface Staff {
  staffId?: string;
  username?: string;
  email?: string;
  contact?: string;
  password?: string;
}

function useStaff() {
  const { data, loading, error, makeRequest } = useRequest();

  const getStaff = (content?: Staff) => {
    makeRequest({
      method: 'get',
      url: `/staffs`,
      params: content || {}
    });
  };

  const registerStaff = (content: Staff) => {
    makeRequest({
      method: 'post',
      url: '/staffs/register',
      data: content,
    });
  };

  const updateStaff = (content: Staff) => {
    makeRequest({
      method: 'patch',
      url: `/staffs`,
      data: content,
    });
  };

  return {
    data,
    loading,
    error,
    getStaff,
    registerStaff,
    updateStaff,
  };
}

export default useStaff;

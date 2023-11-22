import { useState } from 'react';
import useRequest from './useRequest';

interface Staff {
  staffId?: number;
  username: string;
  email: string;
}

function useStaff() {
  const { data, loading, error, makeRequest } = useRequest();

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
    registerStaff,
    updateStaff,
  };
}

export default useStaff;

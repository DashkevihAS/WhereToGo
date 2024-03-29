import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  ({ login, password }, { rejectWithValue }) => {
    return axios({
      method: 'post',
      url: 'http://95.163.237.3:8179/wtg/login',
      data: { login, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

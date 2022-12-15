import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI_AUTH } from '../../assets/const';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  ({ login, password }, { rejectWithValue }) => {
    return axios({
      method: 'post',
      url: `${API_URI_AUTH}/login`,
      data: { login, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

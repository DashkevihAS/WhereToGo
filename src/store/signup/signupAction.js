import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI_AUTH } from '../../assets/const';
import { fetchAuthData } from '../auth/authAction';

export const fetchSignupData = createAsyncThunk(
  'signup/fetchSignupData',
  (values, { rejectWithValue, dispatch }) => {
    const data = {};
    Object.assign(data, values);
    return axios({
      method: 'post',
      url: `${API_URI_AUTH}/signup`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => {
        dispatch(
          fetchAuthData({ login: data.login, password: values.password }),
        );
        return data;
      })
      .catch((err) => rejectWithValue(err));
  },
);

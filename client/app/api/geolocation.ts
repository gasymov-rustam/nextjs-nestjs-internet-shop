/* eslint-disable max-len */
import { createEffect } from 'effector-next';
import { api } from '../axiosClient';

interface IGeolocation {
  latitude: number;
  longitude: number;
}

export const getGeolocationFx = createEffect(
  async ({ latitude, longitude }: IGeolocation) => {
    const data = await api.get(`https://api.geoapify.com/v1/geocode/reverse`, {
      withCredentials: false,
      params: {
        lang: 'en',
        apiKey: process.env.NEXT_PUBLIC_GEOAPI_KEY,
        lat: latitude,
        lon: longitude,
      },
    });

    return data;
  }
);

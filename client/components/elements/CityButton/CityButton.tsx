import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { LocationSvg } from '../LocationSvg';

import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { getGeolocationFx } from '../../../app';
import { $userCity, setUserCity } from '../../../context/user';
import { Spinner } from '../Spinner';
import cls from './CityButton.module.scss';

export const CityButton = memo(() => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const { city } = useStore($userCity);
  const spinner = useStore(getGeolocationFx.pending);

  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = async (pos: GeolocationPosition) => {
      try {
        const { latitude, longitude } = pos.coords;

        const { data } = await getGeolocationFx({ latitude, longitude });

        setUserCity({
          city: data.features[0].properties.city,
          street: data.features[0].properties.address_line1,
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    const error = (error: GeolocationPositionError) =>
      toast.error(`${error.code} ${error.message}`);

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <button className={cls.city} onClick={getCity}>
      <span className={clsx(cls.city__span, darkModeClass)}>
        <LocationSvg />
      </span>

      <span className={clsx(cls.city__text, darkModeClass)}>
        {spinner ? (
          <Spinner
            mode={mode}
            style={{ top: '-10px', left: 10, width: 20, height: 20 }}
          />
        ) : city.length ? (
          city
        ) : (
          'City'
        )}
      </span>
    </button>
  );
});

import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { checkUserAuthFx } from '../../app';
import { Paths, RequestsPath } from '../../constants';
import { setUser } from '../../context/user';

export const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false);
  const shouldCheckAuth = useRef(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    const user = await checkUserAuthFx(RequestsPath.LOGIN_CHECK);

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true);
        return;
      }

      router.push(Paths.DASHBOARD);
      return;
    }

    if (user) {
      setUser(user);
      setShouldLoadContent(true);
      return;
    }

    router.push(Paths.HOME);
  }, [isAuthPage, router]);

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
      checkUser();
    }
  }, [checkUser]);

  return shouldLoadContent;
};

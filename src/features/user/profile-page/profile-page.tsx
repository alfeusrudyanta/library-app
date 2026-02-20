import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Options } from './types';

export const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') as Options;

  useEffect(() => {
    if (tabParam === null) {
      tabParam = 'profile';
    }
  }, [tabParam]);

  return <div>ProfilePage</div>;
};

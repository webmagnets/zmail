import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useCategory = () => {
  const [category, setCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.category !== category) {
      setCategory(router.query.category);
    }
  }, [router.query.category, category])

  return category;
}

export default useCategory;
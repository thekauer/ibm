import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;

    const fetchUrl = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!unmounted) {
          setData(data);
        }
      } catch (error) {
        if (!unmounted) {
          setError(error);
        }
      } finally {
        if (!unmounted) {
          setLoading(false);
        }
      }
    };

    fetchUrl();

    return () => {
      unmounted = true;
    };
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook para realizar llamadas a la API.
 * @param {string} url - URL de la API a la que se hará la solicitud.
 * @param {object} options - Opciones adicionales para la solicitud (métodos, headers, etc.).
 * @returns {object} - Retorna el estado `data`, `loading` y `error`.
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback para memorizar la función de llamada a la API y evitar su recreación en cada renderizado.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;

import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");

  async function fetching(params) {
    try {
      setIsLoad(true);
      await callback();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoad(false);
    }
  }
  return [fetching, isLoad, error];
};

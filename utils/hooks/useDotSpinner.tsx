import { useState, useCallback } from "react";

const useDotSpinner = () => {
  const [isDotSpinnerLoading, setIsDotSpinnerLoading] = useState<boolean>(false);

  const startDotSpinnerLoading = useCallback(() => {
    setIsDotSpinnerLoading(true);
  }, []);

  const stopDotSpinnerLoading = useCallback(() => {
    setIsDotSpinnerLoading(false);
  }, []);

  return {
    isDotSpinnerLoading,
    startDotSpinnerLoading,
    stopDotSpinnerLoading,
  };
};

export default useDotSpinner;

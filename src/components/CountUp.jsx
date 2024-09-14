import React, { useState, useEffect } from "react";

const CountUp = ({ endValue, duration = 8000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(
        endValue,
        Math.round((progress / duration) * endValue)
      );
      setCount(increment);
      if (progress < duration) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [endValue, duration]);

  return (
    <h4 className="text-4xl font-bold text-gray-900">
      {count.toLocaleString()}
    </h4>
  );
};

export default CountUp;

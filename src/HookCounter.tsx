import { useCallback, useState } from "react";

export default function HookCounter() {
  const [num, setNum] = useState(0);
  const onIncrease = useCallback(() => {
    setNum((prev: number) => ++prev);
  }, []);
  const onDecrease = useCallback(() => {
    setNum((prev: number) => --prev);
  }, []);

  return (
    <div>
      <h2>{num}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

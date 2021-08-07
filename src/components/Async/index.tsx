import { useEffect } from 'react';
import { useState } from 'react';

export function Async() {
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);

    useEffect(() => {
      setTimeout(() => setIsButtonInvisible(true));
    }, []);

  return (
    <div>
      <div>Hello Ignite</div>

      {!isButtonInvisible && <button>Button</button>}
    </div>
  );
}

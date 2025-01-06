import { useMemo } from 'react';

function useRandomId(): string {
   const randomId = useMemo(() => {
      return Math.random().toString(36).substr(2, 9);
   }, []);

   return randomId;
}

export default useRandomId;

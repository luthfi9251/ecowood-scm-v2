import { useCallback } from 'react';

function useFindId<T extends Record<string, any>>(
   list: T[]
): (id: T[keyof T]) => T | undefined {
   const findById = useCallback(
      (id: T[keyof T]) => {
         return list.find((item) => Object.values(item).includes(id));
      },
      [list] // Dependency array memastikan fungsi di-cache selama `list` tidak berubah
   );

   return findById;
}

export default useFindId;

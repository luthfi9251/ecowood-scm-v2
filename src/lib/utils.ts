import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const parseAdditionalInputValue = (
   type: 'document' | 'text',
   data: Record<any, any>
) => {
   const result: { key: string; value: string }[] = [];
   const keys = Object.keys(data);
   for (let i = 0; i < keys.length; i += 2) {
      const keyKey = `${type}-key-${i / 2}`;
      const valueKey = `${type}-value-${i / 2}`;
      if (data[keyKey] && data[valueKey]) {
         result.push({ key: data[keyKey], value: data[valueKey] });
      }
   }
   return result;
};

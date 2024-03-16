import { format } from 'date-fns';

export const useFormatDate = (date: string) =>
  format(new Date(date), 'MMMM dd, yyyy');

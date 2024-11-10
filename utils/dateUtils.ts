// app/utils/dateUtils.ts

/**
 * Adjusts a date by a specified number of minutes.
 * @param date - The original date.
 * @param minutes - Minutes to adjust (can be negative).
 * @returns - New adjusted date.
 */
export const adjustMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

/**
 * Formats a date into DD/MM/YY format.
 * @param string - Date to format.
 * @returns - Formatted date string.
 */
export const formatDate = (dateString : string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};


export const format = (date: Date): string => {
  return date.toISOString().split('T')[0];
};


export const getNextYearFridaysAndSaturdays = () => {
  const fridays: Date[] = [];
  const saturdays: Date[] = [];
  const currentDate = new Date();

  // Set date to the upcoming Friday
  currentDate.setDate(currentDate.getDate() + ((5 - currentDate.getDay() + 7) % 7));
  // Loop for the next 52 Fridays and Saturdays
  for (let i = 0; i < 216; i++) {
    const friday = new Date(currentDate);
    const saturday = new Date(currentDate);
    saturday.setDate(saturday.getDate() + 1); // Saturday is the next day after Friday

    fridays.push(friday);
    saturdays.push(saturday);

    // Move to the next Friday
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return { fridays, saturdays };
};

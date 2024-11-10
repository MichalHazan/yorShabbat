import { format } from "./dateUtils";

type TorahPortion = {
  date: string;
  torah_hw: string;
  torah_en: string;
};

// Load Torah portions from the JSON file
const torahPortions: TorahPortion[] = require("@/assets/data/torahportions.json");

// Helper function to find the closest Torah portion based on the current date
export const getTorahPortion = (targetDate: Date): TorahPortion | null => {
  const formattedTargetDate = format(targetDate);
  return (
    torahPortions.find((portion) => portion.date === formattedTargetDate) ||
    null
  );
};

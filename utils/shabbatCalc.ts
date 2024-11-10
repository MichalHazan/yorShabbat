import { getTorahPortion } from '@/utils/torahUtils';
import { formatDate, adjustMinutes , getNextYearFridaysAndSaturdays, format} from './dateUtils';
import SunCalc from "suncalc";

export const calculateShabbatTimes = async (latitude: number, longitude: number, locationName: string) => {
  const { fridays, saturdays } = getNextYearFridaysAndSaturdays();

  const shabbatTimes = fridays.map((friday, index) => {
    const saturday = saturdays[index];
    const candleLightingTime = adjustMinutes(SunCalc.getTimes(friday, latitude, longitude).sunset, -24);
    const havdalahTime = adjustMinutes(SunCalc.getTimes(saturday, latitude, longitude).sunset, 37);
    
    const torahPortion = getTorahPortion(saturday);

    return {
      date: format(saturday),
      candle_lighting: candleLightingTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      havdalah: havdalahTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      torah_hw: torahPortion ? torahPortion.torah_hw : '',
      torah_en: torahPortion ? torahPortion.torah_en : '',
    };
  });

  // Optionally store in AsyncStorage for persistence
  return shabbatTimes;
};

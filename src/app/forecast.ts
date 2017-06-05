export enum Instant {
  MORNING
  , LUNCH
  , EVENING
  , TOMORROW_MORNING
  , TOMORROW_LUNCH
  , TOMORROW_EVENING
};

export class Forecast {
  public static NOT_AVAILABLE = Number.MAX_SAFE_INTEGER;
  constructor(
              public morningTemp: number
              ,public lunchTemp: number
              ,public endDayTemp: number
              ,public tomorrowMorningTemp: number
              ,public tomorrowLunchTemp: number
              ,public tomorrowEndDayTemp: number
            ){}


}

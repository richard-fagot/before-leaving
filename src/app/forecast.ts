export enum Instant {
  MORNING
  , LUNCH
  , EVENING
  , TOMORROW_MORNING
  , TOMORROW_LUNCH
  , TOMORROW_EVENING 
};

export class Forecast {

  constructor(
              public morningTemp: string
              ,public lunchTemp: string
              ,public endDayTemp: string
            ){}


}

export class ChartData{
  entity: String;
  year: number;
  death: number;

  constructor(entity: String, year: number, death: number){
    this.entity = entity;
    this.year = year;
    this.death = death;
  }
}

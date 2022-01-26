import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ChartData } from '../../razredi/chart-data';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public chartType: ChartType = 'line';

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins:
      {
        title: {
          text: ['Death rate from obesity, 1990 to 2017',
            'Premature deaths attributed to obesity per 100,000 individuals.'],
          font: {
            size: 23
          },
          display: true}
      },
  };

  public barChartLabels: string[] = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998',
    '1999', '2000', '2001', '2002', '2003', '2004', '2005','2006', '2007', '2008', '2009', '2010',
    '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartLegend: boolean = true;

  public barChartData: Array<any> = [
    { data: [], label: ''}
  ];

  public data: ChartData[] = [];

  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  private preberiCSV() {
    this.data.length = 0
    return this.http.get('assets/death-rate-from-obesity.csv', {responseType: 'text'})
      .subscribe( data =>{
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length-1; index+=28) {
          let oneCountryDeaths = 0;
          for (let j = 0; j < 28; j++) {
            let rowCountry = csvToRowArray[index + j].split(",");
            oneCountryDeaths += parseInt(rowCountry[3], 10);
          }
          if (oneCountryDeaths > 5000) {
            for (let k = 0; k < 28; k++) {
              let rowAdd = csvToRowArray[index + k].split(",");
              this.data.push(new ChartData(rowAdd[0], parseInt(rowAdd[2], 10), parseInt(rowAdd[3], 10)));
            }
          }
        }
        this.createChart();
      })
  }

  private createChart() {
    let addPosition = 0;
    for(let i = 0; i < this.data.length; i++){
      if(i > 0 && this.data && this.data[i].entity != this.data[i-1].entity){
        this.barChartData.push({data: [], label: ''})
        addPosition++;
      }
      this.barChartData[addPosition].data.push(this.data[i].death)
      this.barChartData[addPosition].label = this.data[i].entity
    }
    this.chart.chart.update()
  }

  ngOnInit(): void {
    this.loadScript("../../../assets/javascripts/calculator.js");
    this.preberiCSV();
  }
}



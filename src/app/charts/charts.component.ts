import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { filter, find, map } from 'rxjs';
import { GetAssetDataService } from '../assets/get-asset-data.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  assetSelected : any;
  @Input('selectedAsset') asset : Object | undefined;

   chartLabels : any;
   chartData : any;
   chartOptions = {
    responsive : true
  }
  dates : any[] = [];
  measurements : any[] = []

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  constructor(
    private httpService : GetAssetDataService,
    private datePipe : DatePipe
  ) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes : SimpleChanges){
    for(let property in changes){
      console.log("asset selected : "+ changes[property].currentValue);
      this.assetSelected = changes[property].currentValue
      if (changes[property].currentValue === undefined){
        console.log("no asset selected")
      }
      else{
        
        this.getChartData(this.assetSelected)
      }
    }
  }


  getChartData(selected:any){
    
    this.dates = []
    this.measurements = []
    var values : Array<number>;
   
    this.httpService.getDataById(selected).subscribe(res=>{
      console.log(res)
      Object.entries(res.measurements).forEach(([dates,value])=>{
        
         this.dates.push(this.datePipe.transform(dates, 'MMM yy'));
         this.measurements.push(value)
         
        
      })  

      console.log(this.dates)
      console.log(this.measurements)
        this.chartLabels = this.dates
        
        this.chartData = [
          {
                  data : this.measurements,// measurement values
                  label : 'Asset '+selected, //selected asset 
                  fill : false,
                  tension: 0,
                  borderColor: '#4588d4'
                
          }
        ]
     })
  
  
    }

}

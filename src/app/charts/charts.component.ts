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

   chartLabels :any [] = [];
   chartData : any;
   chartOptions :any;
  dates : any[] = [];
  measurements : any[] = []

  dates2 : any[] = [];
  measurements2 : any[] =[];

  dates3 : any[] = [];
  measurements3 : any[] =[];

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
        
        this.setChartData(this.assetSelected)
      }
    }
  }


  setChartData(selected:any){
    
    this.dates = []
    this.measurements = []
   
    this.httpService.getDataById(selected).subscribe(res=>{
     
      Object.entries(res.measurements).forEach(([dates,value])=>{
         this.dates.push(this.datePipe.transform(dates, 'MMM yy'));
         this.measurements.push(value)
      })  

      this.getChartData(this.dates, this.measurements,selected)
     },(error)=>{
           
              this.httpService.getData().subscribe(res=>{

               Object.entries(res[1].measurements).forEach(([dates,value])=>{
                this.dates.push(this.datePipe.transform(dates, 'MMM yy'));
                this.measurements.push(value)
               })

                if(selected == 3){
                    Object.entries(res[2].measurements).forEach(([dates,value])=>{
                        this.dates3.push(this.datePipe.transform(dates, 'MMM yy'));
                        this.measurements3.push(value)
                        this.getChartData(this.dates3, this.measurements3, selected)
                      })
                  }

                  Object.entries(res[2].measurements).forEach(([dates,value])=>{
                    this.dates2.push(this.datePipe.transform(dates, 'MMM yy'));
                    this.measurements3.push(value)
                    this.measurements2.push(value)
           
                  
                    if(selected == 1){
                      var sum : any [] = []
                       this.measurements.map((num, idx) => {
                         sum.push (num + this.measurements2[idx]);
                      });
                      this.getChartData(this.dates,sum,selected)
                    }
                   
                 })  
                }) 
         }) 

    }


    getChartData(labels:any, dataset:any,selected :any){
      this.chartLabels = labels
        
      this.chartData = [
        {
                data :dataset,// measurement values
                label : 'Asset '+selected, //selected asset 
                fill : false,
                tension: 0,
                borderColor: '#4588d4' 
        }
      ]

      this.chartOptions = {
        responsive : true
      }
    }

}

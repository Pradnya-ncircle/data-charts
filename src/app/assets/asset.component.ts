import { AnimateTimings } from '@angular/animations';
import { CdkTreeNode, NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { emptyProps, Store } from '@ngrx/store';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';

import { BaseChartDirective } from 'ng2-charts';
import { TreeviewItem } from 'ngx-treeview';
import { map } from 'rxjs/operators';

// import { loadAssetData, loadAssetDataSuccess, loadSelectedAsset } from '../app-state/asset-state/asset-state.actions';
// import { selectedAssetData } from '../app-state/asset-state/asset-state.selectors';

import { GetAssetDataService } from './get-asset-data.service';
import { Measurement } from './measurement.model';

// import { Color, Label } from 'ng2-charts';

interface assetNode{
  name: string;
  id: number,
  parentId : any,
  children? : assetNode[]
}

const treeData : assetNode[] = [
  {
    name : 'Asset 0',
    id: 0,
    parentId : null,
    children : []
  },
  {
    name : 'Asset 1',
    id: 1,
    parentId : null,
    children : [
      {
        name : 'Asset 2',
        id:2 ,
        parentId : 1,
        children: [
          
        ]
      },
      {
        name:'Asset 3',
        id:3,
        parentId : 1,
        children : [
        {
          name : 'Asset 4', 
          id: 4,
          parentId : 3,
          children : []
        }
      ]
      }
    ]
  }

]

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  treeData :any;
  showFiller = true;
  selectedAssetId = 5;
  selectedAsset! : Object
  activeNode = '';
  title = 'Front End Assignment';
  assets : any;

  results : any;
  dates : any[] = [];
  dataSet : any;

  chartData: any;
  chartLabels : any;
  chartOptions : any;

  datesVal: any[] = []
  measurements1 : any []= []
 
    
  mesData : Measurement [] = [];
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  treeControl = new NestedTreeControl<assetNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<assetNode>();
  measurements: any[] =[];

  constructor(private dataService : GetAssetDataService,
    private datePipe : DatePipe){
      this.dataSource.data = treeData

    // this.dataService.getAsstes().subscribe(res=>{
    //   this.assets = res
    //   this.assets.map((asset:any)=>{ return asset['children'] = [] })
    //   const children = this.assets.filter((asset:any)=> asset.parentId != null)
    //   const parent = this.assets.filter((asset:any)=> asset.parentId === null)
      
    //   this.assets.forEach((parent:any)=>{
       
    //         children.map((child: any)=>{
    //           if(child.parentId == parent.id){
    //             parent.children.push(child)
             
    //           }
             
    //         })
 
        
    //     })
   
  
    //   this.treeData = this.assets
    //   this.dataSource.data = this.treeData
  
    //   console.log(treeData)
    //   console.log(this.treeData)
    // })
  
  }


  ngOnInit(): void { 

    this.dataService.getData().subscribe(res=>{
      this.mesData = res;
    })
  
   }



  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
 


  iterateTree(treeNode:any, selectedNode : any) {
           if(treeNode.children.length === 0){
      
              const results = this.mesData.find((ele:any)=> ele.id == treeNode.id)
          
             let tempDts :any [] = []
             let tempMs: any [] = []
            
                 Object.entries(results?.measurements).forEach(([keys,values])=>{
                   if(this.dates.length === 0){
                     tempDts.push(this.datePipe.transform(keys, 'MMM yy'))
                   }
                     tempMs.push(values)
                 });
                 if (tempDts.length != 0) {
                   this.dates = tempDts;
                 }
               
                 return tempMs;   
              }
              else{
                  let sum : any []= []
                  treeNode.children.forEach((elem:any)=>{
                    const measurements :any = this.iterateTree(elem,selectedNode)
                    if(sum.length === 0){
                      sum = measurements
                    }
                    else{
                      measurements.map((val:any, idx:number)=>{
                        sum[idx] = sum[idx] + val
                      })
                    }
                  })

                  return sum;
              }
         

  }

  getChartData(labels:any, dataset:any, selected :any){
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
                   console.log(this.chartLabels)

    this.chartOptions = {
      responsive : true
    }
  }

  selectedNode(node: any){

  
    this.selectedAssetId = node.id;
    // this.iterateData(this.selectedAssetId)
   
    let data = this.iterateTree(node,this.selectedAssetId)
    let labels = this.dates
    this.getChartData(labels, data, this.selectedAssetId)
   
    }
  }
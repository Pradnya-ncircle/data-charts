import { AnimateTimings } from '@angular/animations';
import { CdkTreeNode, NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';

import { BaseChartDirective } from 'ng2-charts';
import { TreeviewItem } from 'ngx-treeview';
import { map } from 'rxjs/operators';

// import { loadAssetData, loadAssetDataSuccess, loadSelectedAsset } from '../app-state/asset-state/asset-state.actions';
// import { selectedAssetData } from '../app-state/asset-state/asset-state.selectors';

import { GetAssetDataService } from './get-asset-data.service';

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
        children: []
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
  sum : any [] = []
    

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  treeControl = new NestedTreeControl<assetNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<assetNode>();
  measurements: any[] =[];

  constructor(private dataService : GetAssetDataService,
    private store : Store,
    private datePipe : DatePipe){
    this.dataSource.data = treeData
  }


  ngOnInit(): void { 

    this.dataService.getAsstes().subscribe(res=>{
      this.assets = res
    
    //   this.assets.forEach((asset:any)=>{
    //     if(asset.parentId !=null){
        // attach children
    //     }
    //   })
    })



   }

  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
 
 childrens:any[] = []
 tempDts :any [] = []
 tempMs: any [] = []
  
  iterateTree(treeNode:any, selectedNode : any) {
            if(treeNode.children.length > 0){
              treeNode.children.forEach((elem : any)=>{
                this.childrens.push(elem);
                this.iterateTree(elem, selectedNode) 
              })
            }
            else if(treeNode.children.length === 0){
           
              this.dataService.getDataById(treeNode.id).subscribe(res=>{
                this.dates = []
                this.measurements = []
                this.tempDts = []
                this.tempMs = []
                  Object.entries(res.measurements).forEach(([keys,values])=>{
                    if(treeNode.parentId !=null){
                    
                      this.tempDts.push(this.datePipe.transform(keys, 'MMM yy'))
                      this.tempMs.push(values)   
                      this.getChartData(this.tempDts, this.tempMs, selectedNode)
                    }
                    else{              
                      this.dates.push(this.datePipe.transform(keys, 'MMM yy'))
                      this.measurements.push(values)
                      this.getChartData(this.dates, this.measurements, selectedNode)
                    
                    }
                   
                  })

                  console.log(this.tempDts)
                  console.log(this.tempMs)
                  console.log(this.dates)
                  console.log(this.measurements)

                  console.log(this.sum)
               })
              }
  }

  getKeyValues(obj : any){
    var tempDts :any [] = []
    var tempMs: any [] = []
    Object.entries(obj).forEach(([keys,values])=>{
      tempDts.push(this.datePipe.transform(keys, 'MMM yy'))
      tempMs.push(values)
      return {
       tempDts, tempMs
      }
    })
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

    this.chartOptions = {
      responsive : true
    }
  }
  selectedNode(node: any){
    console.log(node)
    this.selectedAsset = node.id
    this.selectedAssetId = node.id;

    this.iterateTree(node, this.selectedAssetId); //recursive 

    }

  }
  



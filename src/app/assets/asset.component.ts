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
 
  
  iterateTree(treeNodes:any, selectedNode : any) {
    
    for(let treeNode of treeNodes) {
        if(treeNode.id == selectedNode){
            if(treeNode.children.length > 0){
              this.iterateTree(treeNode.children, selectedNode)                
            }
            else{
              this.dataService.getDataById(treeNode.id).subscribe(res=>{
                console.log(res)
               })
            }
            
        }
 
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

  selectedNode(node: any){
    console.log(node)
    this.selectedAsset = node.id
    this.selectedAssetId = node.id;

    this.iterateTree(treeData, this.selectedAssetId); //recursive 

    
  //   treeData.forEach((node:any)=>{
  //     if(this.selectedAssetId === node.id){
  //       if(node.children.length>0){
  //         node.children?.map((child:any)=>{
  //           if(child.parentId === this.selectedAssetId){
  //             //getting 2 & 3
  //               if(child.children.length > 0){ // asset 3
  //                   child.children.map((lowestChild : any)=>{
  //                     this.dataService.getDataById(lowestChild.id).subscribe(res=>{
  //                         console.log(res)
  //                         Object.entries(res.measurements).forEach(([dates,value])=>{
  //                           this.datesVal.push(this.datePipe.transform(dates, 'MMM yy'));
  //                           this.measurements1.push(value) // stored asset 4 values
  //                          })
  //                     })
              
  //                   })
  //               }else if(child.children.length === 0){ // asset 2
  //                 console.log(child.id)
  //                 this.dataService.getDataById(child.id).subscribe(res=>{
  //                   var temp : any[] = []
  //                   Object.entries(res.measurements).forEach(([dates,value])=>{
  //                     temp.push(value);
  //                     this.measurements1.map((num, idx) => {
  //                       this.sum.push(num + temp[idx]); //added asset 2 values to asset 4 values
  //                    });
  //                    })
  //                    console.log(temp)
                   
  //                  console.log(this.sum)
  //                 })
  //               }
        
  //             }
            
  //           })
  //       }
  //       else if(node.children.length === 0){
  //        this.dataService.getDataById(node.id).subscribe(res=>{
  //         console.log(res);
  //        })
  //       }
  //     }
  // })
    }

  }
  



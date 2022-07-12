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


  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  treeControl = new NestedTreeControl<assetNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<assetNode>();

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

    //     }
    //   })
    })



   }

  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
 
  
  iterateTree(treeNodes:any, selectedNode : any) {
    for(let treeNode of treeNodes) {
        if(treeNode.id == selectedNode){
          console.log(treeNode)
        }
      if(treeNode.children != null) this.iterateTree(treeNode.children, selectedNode);
    }
  }


  selectedNode(node: any){
    console.log(node)
    this.selectedAsset = node.id
    this.selectedAssetId = node.id;


    // const iterateTree = (treeNodes: any[]) => treeNodes.forEach(treeNode=>{

    //   if(treeNode.children !=null ) iterateTree(treeNode.children)

    // })

    // iterateTree(treeNodes)

    this.iterateTree(treeData, this.selectedAssetId);

        // treeData.forEach((node:any)=>{
        //     if(this.selectedAssetId === node.id){
        //       node.children?.map((child:any)=>{
        //       if(child.parentId === this.selectedAssetId){
        //           if(child.children.length > 0){
        //               child.children.map((lowestChild : any)=>{
                       
        //                 if(lowestChild.parentId === this.selectedAssetId){

        //                   console.log(lowestChild.id)
                          
        //                 }
        //               })
        //           }
        //         }
        //         else {
        //           console.log("has no child")
        //           //fetch data by id
        //         }
        //       })
        //     }
        // })
    }

  }
  



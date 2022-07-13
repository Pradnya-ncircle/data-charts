
// import { Action, createReducer,on } from "@ngrx/store"

// import { chartData } from "src/app/charts/chart-data.model"
// // import  { loadAssetData, loadAssetDataSuccess, loadSelectedAsset, loadSelectedAssetChartData } from './asset-state.actions'
// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import * as AssetActions from '../asset-state/asset-state.actions';

// export interface Asset {
//     assetId : string,
//     measurements : Object
// }

// export interface State extends EntityState<Asset>{
//     selectedAssetId : string | null;
// }

// export const adapter: EntityAdapter<Asset> = createEntityAdapter<Asset>()

// export const initialState: State = adapter.getInitialState({
//     // additional entity state properties
//     selectedAssetId: null,
//   });


// export const assetReducer = createReducer(
//     initialState,
//     on(AssetActions.selectAsset, (state, { assetId }) => {
//       return { ...state, selectedAssetId: assetId };
//     }),
//     on(AssetActions.loadAssets, (state, { assets }) => {
//       return adapter.addMany( assets , { ...state, selectedAssetId: null });
//     })
//   );

//   export const getSelectAssetId = (state: State) => state.selectedAssetId;

//   const {
//     selectIds,
//     selectEntities,
//     selectAll,

//   } = adapter.getSelectors();
   
//   export const selectAssetIds = selectIds;
   
//   export const selectAssetEntities = selectEntities;
   
//   export const selectAllAsstes = selectAll;
   

//   export function reducer(state: State | undefined, action: Action) {
//     return assetReducer(state, action);
//   }

// // export const assetReducer = createReducer(
// //     initialState,
// //     on(loadAssetData, ((state, action)=>{
// //         console.log("called")
// //         return {
// //             ...state
// //         }
// //     })),

// //     on(loadAssetDataSuccess, state=>({
// //             ...state,
// //             assets :state.assets        
// //     })),

// //     on(loadSelectedAsset, ((state, action)=>{
// //         return {
// //             ...state,
// //             assets : state.assets.filter((asset)=> { asset.assetId === action._p.selectedAsset }),
// //             selectedAsset : action._p.selectedAsset
// //         }
// //     })),

// //     on( loadSelectedAssetChartData, ((state, action)=>{
// //         return {
// //             ...state,
// //             chartsData : action._p.selectectedAssetChartData
// //         }
// //     }))
// // )
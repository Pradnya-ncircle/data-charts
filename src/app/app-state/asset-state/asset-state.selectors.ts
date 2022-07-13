// import { createSelector, createFeatureSelector, ActionReducerMap, } from "@ngrx/store";
// import * as fromAsset from './asset-state.reducer'

// export interface State {
//     assets : fromAsset.State;
//   }
   
//   export const reducers: ActionReducerMap<State> = {
//     assets: fromAsset.reducer,
//   };

//   export const selectAssetState = createFeatureSelector<fromAsset.State>('assets');

//   export const selectCurrentAssetId = createSelector(
//     selectAssetState,
//     fromAsset.getSelectAssetId
//   )

//   export const selectAssetEntities = createSelector(
//     selectAssetState,
//     fromAsset.selectAssetEntities
//   );
//   export const selectAllAssets = createSelector(
//     selectAssetState,
//     fromAsset.selectAllAsstes
//   );

//   export const selectCurrentAsset = createSelector(
//     selectAssetEntities,
//     selectCurrentAssetId,
//     (assetEntities, assetId) => assetId && assetEntities[assetId]
//   );



// import { AppState } from "../app.state";
// import { myState } from "./asset-state.reducer";

// export interface selectedAsset {
//     assetId : number;
// }

// export interface allAssetsData {
//     assetId : selectedAsset,
//     measurement : object
// }

// export interface AppState {
//     selectedAsset : selectedAsset,
//     allAssetsData : allAssetsData[]
// }

// export const selectedAsset = (state: AppState) => state.selectedAsset;
// export const selectAllAssetData = (state: AppState) => state.allAssetsData;

// export const selectedAssetData = createSelector(
//     selectedAsset,
//     selectAllAssetData,
//     (selectedAsset: selectedAsset, selectAllAssetData: allAssetsData[]) => {
//       if (selectedAsset && selectAllAssetData) {
//         return selectAllAssetData.filter((asset: allAssetsData) => {
//             console.log(asset.assetId)
//             console.log(selectedAsset.assetId)
//             // asset.assetId == selectedAsset.assetId
//         });
//       } else {
//         return selectAllAssetData;
//       }
//     }
//   );

// export const loadAssetData = (state : AppState) => state.myState.assets
// export const selectAssetData = createSelector(
//     loadAssetData,
//     (state :  myState) => state.assets
// )

// export const loadChartData = (state : AppState) => state.myState.chartsData
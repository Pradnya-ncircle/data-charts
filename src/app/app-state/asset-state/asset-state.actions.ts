
import { Asset } from "src/app/asset-data-charts/asset-data.model";
import { chartData } from "src/app/asset-data-charts/chart-data.model";


import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const selectAsset = createAction('[Assets Page] Select Asset', props<{ assetId: string }>());
export const loadAssets = createAction('[Asset/API] Load Assets', props<{ assets: Asset[] }>());

export const loadAsstesSuccess = createAction(
    '[asset page] load asset success',
    props<{ assets: Asset[] }>()
  );

export const loadSelectedAssetChartData = createAction('[Asset/API] Load chart data', props<{ chartData : chartData[] }>)


// export const loadAssetData = createAction(
//     '[asset data] Load asset data'
//   );

// export const loadAssetDataSuccess = createAction(
//     '[asset data] Load asset data success',
//      props<{  assets : assetData[]}>
//   );

// export const  loadSelectedAsset = createAction(
//     '[asset data] load selected asset data',
//     props<{ selectedAsset : String, assetValues : assetData[]}>
// )

// export const loadSelectedAssetChartData = createAction (
//     '[chart data] load selected asset chart data',
//     props<{ selectectedAssetChartData : chartData[] }>
// )
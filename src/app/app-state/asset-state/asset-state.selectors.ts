import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChartData } from "chart.js";
import { Asset } from "src/app/assets/asset-data.model";
import { AppState, selectAllAssets } from "./asset-state.reducer";
import * as reducer from './asset-state.reducer';

 const featureSelector = createFeatureSelector<reducer.AppState>('appState')
 const assetFeatureSelector = createFeatureSelector<reducer.AssetState>('assetState')
 const measurementFeatureSelector = createFeatureSelector<reducer.MeasurementState>('measurementState')
 const chartFeatureSelector = createFeatureSelector<ChartData>('charts');

 export const getAllAssets = createSelector(
    assetFeatureSelector,
    reducer.selectAllAssets
 )

 export const areAssetsLoaded = createSelector(
    assetFeatureSelector,
    state => state.assetsLoaded
  );
  

 export const getAllMeasurements = createSelector(
    measurementFeatureSelector,
    reducer.selectAllMeasurements
 )

 export const areMeasurementsLoaded = createSelector(
    measurementFeatureSelector,
    state => state.measurementsLoaded
  );

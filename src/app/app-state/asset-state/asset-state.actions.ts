import { Action, createAction, props } from "@ngrx/store";
import { Asset, ChartData } from "src/app/assets/asset-data.model";
import { Measurement } from "src/app/assets/measurement.model";


export enum appActionTypes {
    loadAllAssets = '[Assets] Load all assets via service',
    assetsLoaded = '[Assets Effect] Assets loaded successfully',
    loadAllMeasurements = '[Measurements] Load all measurements via service',
    measurementsLoaded = '[Measurements Effect] Measurements loaded successfully',
    currentAsset =  '[Assets] Get currently selected asset',
    setChartData =  '[charts] Get chart data for current asset',
}

export const loadAllAssets = createAction(
    '[Assets] Load all assets via service',
);

export const assetsLoaded = createAction(
    '[Assets Effect] Assets loaded successfully',
    props<{assets : Asset[]}>()
)

export const loadAllMeasurements = createAction(
    '[Measurements] Load all measurements via service',
)

export const measurementsLoaded = createAction(
    '[Measurements Effect] Measurements loaded successfully',
    props<{measurements : Measurement[]}>()
)

export const currentAsset = createAction(
    '[Assets] Get currently selected asset',
    props<{assetId : number}>()
)

export const setChartData = createAction(
    '[charts] Get chart data for current asset',
    props<{chartData : ChartData[]}>()
)

export const DataActionTypes = {
    loadAllAssets,
    assetsLoaded,
    loadAllMeasurements,
    measurementsLoaded,
    currentAsset,
    setChartData
}


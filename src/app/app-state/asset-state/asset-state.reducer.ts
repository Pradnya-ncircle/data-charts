import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { combineReducers, createReducer, on, State } from "@ngrx/store";
import { addParameters } from "@storybook/angular";
import { Asset, ChartData } from "src/app/assets/asset-data.model";
import { Measurement } from "src/app/assets/measurement.model";
import { DataActionTypes } from "./asset-state.actions";

export interface AssetState extends EntityState<Asset>{
    assetsLoaded : boolean;
    selectedAssetId : number
}

export interface MeasurementState extends EntityState<Measurement>{
   measurementsLoaded : boolean;
}

export interface ChartState extends EntityAdapter<ChartData>{
    chartDataLoaded : boolean;
}

export interface AppState {
    asstes : AssetState,
    measurements : MeasurementState,
    chart : ChartState
}


export const assetAdapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();
export const measurementAdapter: EntityAdapter<Measurement> = createEntityAdapter<Measurement>();
export const chartAdapter: EntityAdapter<ChartData> = createEntityAdapter<ChartData>();


export const assetInitialState = assetAdapter.getInitialState({ assetsLoaded : false}) 
export const measurementInitialState = measurementAdapter.getInitialState({ measurementsLoaded : false}) 
export const chartInitialState = chartAdapter.getInitialState({ chartDataLoaded : false}) 

export const initialState = {
    assets : assetInitialState,
    measurements : measurementInitialState,
    chartData : chartInitialState
}

export const Reducer = createReducer(
    initialState,

    on(DataActionTypes.assetsLoaded, (state, action)=>({
        ...state,
        assetsLoaded : true,
        assets : assetAdapter.setAll(action.assets, state.assets)
    })),
     
    on(DataActionTypes.measurementsLoaded, (state, action)=>({
        ...state,
        measurementsLoaded : true,
        measurements : measurementAdapter.setAll(action.measurements, state.measurements)
    })),

    on(DataActionTypes.currentAsset, (state, action)=>({
        ...state,
        selectedAssetId : action.assetId, 
    })),

    on(DataActionTypes.setChartData, (state,action)=>({
        ...state,
        chartData : chartAdapter.setAll(action.chartData, state.chartData)
    }))

)

export const measurementReducer = createReducer(
    initialState,
    on(DataActionTypes.measurementsLoaded, (state, action)=>({
        ...state,
        measurementsLoaded : true,
        // measurements : measurementAdapter.setAll(action.measurements, state.measurements)
    })),

)

export const chartsReducer = createReducer(
    initialState,
      on(DataActionTypes.setChartData, (state,action)=>({
        ...state,
        chartDataLoaded : true,
        // chartData : chartAdapter.setAll(action.chartData, state.chartData)
    }))
)


export const selectAssetState = (state : AppState) => state.asstes;
export const selectChartsState = (state : AppState) => state.chart;
export const selectMeasurementsState = (state : AppState) => state.measurements;


export const {selectAll : selectAllAssets, selectIds : selectIds} = assetAdapter.getSelectors();
export const {selectAll : selectAllMeasurements} = measurementAdapter.getSelectors();


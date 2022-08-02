import {
    ActionReducer,
    ActionReducerMap,
    combineReducers,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAppState from './asset-state/asset-state.reducer';

  export interface AppState {
    state : fromAppState.AppState
  }
    
export const selectExampleModule = createFeatureSelector<fromAppState.AppState>('example');

export const selectAssetState = createSelector(selectExampleModule, fromAppState.selectAssetState);
export const selectMeasurementState = createSelector(selectExampleModule, fromAppState.selectMeasurementsState);

export const selectAllAssets = createSelector(selectAssetState, fromAppState.selectAllAssets);
export const selectAllMeasurements = createSelector(selectMeasurementState, fromAppState.selectAllMeasurements);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
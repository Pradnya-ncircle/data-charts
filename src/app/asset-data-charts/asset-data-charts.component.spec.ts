import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDataChartsComponent } from './asset-data-charts.component';

describe('AssetDataChartsComponent', () => {
  let component: AssetDataChartsComponent;
  let fixture: ComponentFixture<AssetDataChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetDataChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDataChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

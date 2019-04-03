import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    LayoutModule,
    StartRoutingModule
  ]
})
export class StartModule { }

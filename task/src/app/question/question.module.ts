import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MapToIterable } from './map-to-iterable.pipe';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [QuestionComponent, MapToIterable],
  imports: [
    CommonModule,
    CustomMaterialModule,
    HttpClientModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }

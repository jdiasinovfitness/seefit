import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { ReportMenuComponent } from './report-menu/report-menu.component';
import { ReportViewComponent } from './report-view/report-view.component';


@NgModule({
  declarations: [
    ReportComponent,
    ReportMenuComponent,
    ReportViewComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ReportModule { }

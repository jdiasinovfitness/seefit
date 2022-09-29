import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		TranslocoRootModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

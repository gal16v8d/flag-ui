import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDbCrud } from './components/appdb/appdb.crud';
import { FlagCrud } from './components/flag/flag.crud';
import { HomeComponent } from './components/home/home';

@NgModule({
  declarations: [AppComponent, AppDbCrud, FlagCrud, HomeComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // primeng modules
    AccordionModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ProgressBarModule,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

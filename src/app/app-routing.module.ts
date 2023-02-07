import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDbCrud } from './components/appdb/appdb.crud';
import { FlagCrud } from './components/flag/flag.crud';
import { HomeComponent } from './components/home/home';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apps', component: AppDbCrud },
  { path: 'flags', component: FlagCrud },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/main'},
    { path: '**', pathMatch: 'full', redirectTo: '/main' },
    // { path: 'main', component: MainComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

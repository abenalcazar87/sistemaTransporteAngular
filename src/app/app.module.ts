import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoService } from './services/vehiculo.service';
import { FormComponent } from './components/vehiculos/form/form.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/vehiculos/form/modal.component'

const routes: Routes = [
  {path: '', redirectTo: '/vehiculos', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'vehiculos', component: VehiculosComponent},
  {path: 'vehiculos/form', component: FormComponent},
  {path: 'vehiculos/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VehiculosComponent,
    DirectivaComponent,
    FormComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VehiculoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

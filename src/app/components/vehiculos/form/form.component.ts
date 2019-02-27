import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../models/vehiculo'
import { VehiculoService } from '../../../services/vehiculo.service';
import { TipoService } from '../../../services/tipo.service';
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private vehiculo: Vehiculo = new Vehiculo()
  private titulo:string = "Crear Vehiculo"
  listaTipos = new Array();
  tipo: any = "Seleccione Tipo";

  constructor(private tipoService: TipoService,private vehiculoService: VehiculoService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarVehiculo()
    this.tipoService.listar().subscribe(resp => {
    this.listaTipos = resp;
    });
  }

  cargarVehiculo(): void{
    debugger;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']  
      if(id){
        this.vehiculoService.getVehiculo(id).subscribe( (vehiculo) => this.vehiculo = vehiculo)
      }
    })
  }

  create(): void {
    this.vehiculoService.create(this.vehiculo)
      .subscribe(vehiculo => {
        this.router.navigate(['/vehiculos'])
        //Swal('Nuevo vehiculo', 'Vehiculo ${vehiculo.marca} creado con éxito!', 'success')
        Swal.fire(
        'Nuevo vehiculo!',
        'Creado con éxito!',
        'success'
        )

      }
      );
  }

  update():void{
    this.vehiculoService.update(this.vehiculo)
    .subscribe( vehiculo => {
      this.router.navigate(['/vehiculos'])
      //Swal('Vehiculo Actualizado', 'Vehiculo ${vehiculo.marca} actualizado con éxito!', 'success')
      Swal.fire(
        'Vehiculo',
        'Actualizado con éxito!',
        'success'
        )
    }

    )
  }

}

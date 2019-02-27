import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
})
export class VehiculosComponent implements OnInit {
  listaTipos = new Array();
  tipo: any = "Seleccione Tipo";
  galones: any = "0"
  vehiculos: Vehiculo[];
  listaVehiculos:Vehiculo[] = new Array();
  constructor(private vehiculoService: VehiculoService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe(
      vehiculos => this.vehiculos = vehiculos
    );
    this.calcularTotal();    
  }

  calcularTotal(){
    this.tipo = 0;
    this.galones =0;
    console.log("vehiculos=================>")
    this.vehiculoService.getVehiculos().subscribe(
      resp => {
        this.listaVehiculos = resp; 
        for (const prop in this.listaVehiculos) {
          this.tipo = this.tipo + this.listaVehiculos[prop].capacidadTanque;
        }
        console.log("total=================>")
        console.log(this.tipo);
        //calcular galones
        this.galones = (this.tipo * 0.26417205)/ 1;

        this.router.navigate(['/vehiculos'])
        
      });
    
  }
   

   delete(vehiculo: Vehiculo): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al vehiculo ${vehiculo.marca} ${vehiculo.modelo}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.vehiculoService.delete(vehiculo.id_vehiculo).subscribe(
          response => {
            this.vehiculos = this.vehiculos.filter(cli => cli !== vehiculo)
            Swal.fire(
              'Vehiculo Eliminado!',
              'Vehiculo ${vehiculo.marca} eliminado con éxito.',
              'success'
            )
          }
        )

      }
    });

    this.router.navigate(['/vehiculos']);
  }

}

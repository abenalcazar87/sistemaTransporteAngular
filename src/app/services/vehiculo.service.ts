import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Observable , of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VehiculoService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/vehiculos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Vehiculo[])
    );
  }

  getVehiculo(id): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(`${this.urlEndPoint}/${id}`)
  }

  create(vehiculo: Vehiculo) : Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.urlEndPoint, vehiculo, {headers: this.httpHeaders})
  }

  update(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(`${this.urlEndPoint}/${vehiculo.id_vehiculo}`, vehiculo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Vehiculo>{
    return this.http.delete<Vehiculo>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}

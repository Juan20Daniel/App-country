import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.intarfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, tap, delay, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCachePais = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query:string): Observable<Country[]> {
    query = query.toLowerCase();
    if(this.queryCacheCapital.has(query)) {
      //el ! para indicar que pase lo que pase this.queryCacheCapital.get(query) retornara un valor
      return of(this.queryCacheCapital.get(query)!);
    }
    console.log(`Llegando al servidor ${query}`);
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      //para almacenar en memoria el resultado y evitar tener que hacer la consulta de nuevo.
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log(error);

        return throwError(() => new Error('Nu se poye'))
      })
    )
  }

  //Tarea implementar el manejo de memoria en este servicio
  searchByPais(query:string): Observable<Country[]> {
    query = query.toLowerCase();
    if(this.queryCachePais.has(query)) {
      return of(this.queryCachePais.get(query)!);
    }
    console.log('Llecango al servidor');
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      tap(countries => this.queryCachePais.set(query, countries)),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Nu se poye'))
      })
    )
  }

  searchByAlphaCode(code:string): Observable<Country|undefined> {
    code = code.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      map(countries => countries.at(0)),
      tap(data => {
        console.log(data)
      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('No se pudo obtener paises con ese código.'))
      })
    )
  }

  searchByRegion(region:Region): Observable<Country[]> {
    if(this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);
    }
    console.log('Consultando al servidor.')
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('No se pudo obtener la region.'))
      })
    )
  }
}

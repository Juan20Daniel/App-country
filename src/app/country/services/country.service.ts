import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.intarfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, tap, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query:string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      delay(3000),
      catchError(error => {
        console.log(error);

        return throwError(() => new Error('Nu se poye'))
      })
    )
  }

  searchByPais(query:string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(resp => CountryMapper.RestCountryArray(resp)),
      tap(data => {
        console.log(data)
      }),
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
}

import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchComponent } from "../../components/country-search/country-search.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-city',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-city.component.html',
  styleUrl: './by-city.component.css'
})
export class ByCityComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({query:this.query()}),
    loader: ({request}) =>  {
      if(!request.query) return of([]);
      return this.countryService.searchByPais(request.query)
    }
  })

  // paisResource = resource({
  //   request:() => ({query:this.query()}),
  //   loader: async ({request}) => {
  //     if(!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByPais(request.query)
  //     )
  //   }
  // })
}

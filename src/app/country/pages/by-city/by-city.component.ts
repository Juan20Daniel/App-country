import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchComponent } from "../../components/country-search/country-search.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-city',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-city.component.html',
  styleUrl: './by-city.component.css'
})
export class ByCityComponent {
  countryService = inject(CountryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activeRoute.snapshot.queryParamMap.get('query')??'';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({query:this.query()}),
    loader: ({request}) =>  {
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-city'],{
        queryParams:{
          query:this.query()
        }
      })
      return this.countryService.searchByPais(request.query)
    }
  });
}

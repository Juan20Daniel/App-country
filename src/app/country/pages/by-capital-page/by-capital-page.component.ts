import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchComponent } from "../../components/country-search/country-search.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')??'';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request:() => ({query:this.query()}),
    loader: ({request}) => {
      console.log({query:request.query})
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams:{
          query:request.query
        }
      })
      return this.countryService.searchByCapital(request.query)
    }
  });
}

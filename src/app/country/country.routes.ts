import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';
import { ByCityComponent } from './pages/by-city/by-city.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { ByCountryComponent } from './pages/country-page/country-page.component';
export const countryRoutes: Routes = [
  {
    path:'',
    component:CountryLayoutComponent,
    children: [
      {
        path:'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path:'by-city',
        component: ByCityComponent
      },
      {
        path:'by-region',
        component:ByRegionComponent
      },
      {
        path:'by/:code',
        component:ByCountryComponent
      },
      {
        path:'**',
        redirectTo:'by-capital'
      }
    ]
  }
];

export default countryRoutes;

import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.intarfaces";

export class CountryMapper {
  static RestCountry(country:RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common??'No aplica',
      capital: country.capital,
      population: country.population,
    }
  }
  static RestCountryArray(items:RESTCountry[]): Country[] {
    return items.map(this.RestCountry);
  }
}

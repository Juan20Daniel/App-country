import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.component.html'
})
export class CountrySearchComponent {
  placeholder = input<string>('Buscar');
  search = output<string>();
  debounceTime = input<number>(300);
  initialValue = input<string>('');
  //linkedSignal es para inicializar una señal con otra
  inputValue = linkedSignal<string>(() => this.initialValue()?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceTime());
    //Se ejecuta cada ves que cambia el estado o se monta o destruye el componente
    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jeZunajni'
})
export class JeZunajniPipe implements PipeTransform {

  transform(value: string): boolean {
    return value != "zunajni"
  }

}

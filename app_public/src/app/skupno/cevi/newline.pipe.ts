import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline'
})
export class NewlinePipe implements PipeTransform {

  transform(besedilo: string): string {
    return besedilo.replace(/\n/g, '<br>');
  }

}

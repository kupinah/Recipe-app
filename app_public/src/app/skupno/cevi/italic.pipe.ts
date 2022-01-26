import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'italic'
})
export class ItalicPipe implements PipeTransform {

  transform(besedilo: string): string {
    besedilo = " <i>" + besedilo + "</i>";
    return besedilo;
  }

}

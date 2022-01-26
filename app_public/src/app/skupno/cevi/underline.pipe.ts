import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underline'
})
export class UnderlinePipe implements PipeTransform {

  transform(besedilo: string): string {
    return "<u>" + besedilo + "</u>";
  }

}

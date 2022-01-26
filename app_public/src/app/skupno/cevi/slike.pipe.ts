import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slike'
})
export class SlikePipe implements PipeTransform {

  private contentType: any;

  transform(obj: any): any {
    var s = "";
    this.contentType = obj.contentType;
    var obj1 = this.contentType;
    var obj2 = obj.data;
    s += obj1;
    
    s += ";base64,";
    
    s += obj2;
    return s;
  }

}

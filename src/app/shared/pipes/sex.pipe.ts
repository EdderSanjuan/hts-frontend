import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexValue'
})
export class SexPipe implements PipeTransform {

  transform(sex:  number): string {
    let sexRes !: string;
    switch(sex){
      case 0 : sexRes = "ND"; break;
      case 1 : sexRes = "M"; break;
      case 2 : sexRes = "H"; break;
      case 3 : sexRes = "NE"; break;
      case 4 : sexRes = "M"; break;
    }

    return sexRes;
  }

}

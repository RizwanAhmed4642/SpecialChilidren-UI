import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'texttransform'})
export class TextTransformPipe implements PipeTransform {
  transform(value: string): string {
    // debugger
   if(value!=null){
    const splittedText = value?.split(' ');
    return `${ splittedText[0] } <br> <b>${ splittedText[1] }</b>`;
   } else {
    return "";
   }
  }
}
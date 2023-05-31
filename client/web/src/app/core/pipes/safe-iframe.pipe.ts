import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeIFrame'
})
export class SafeIFramePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }

}

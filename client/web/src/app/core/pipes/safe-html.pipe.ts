import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  // TODO: This should be moved to a new Library
  constructor(private sanitized: DomSanitizer) {}

  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

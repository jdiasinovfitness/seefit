import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private transloco: TranslocoService) {}

  ngOnInit(): void {}


  public setActiveLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }
}

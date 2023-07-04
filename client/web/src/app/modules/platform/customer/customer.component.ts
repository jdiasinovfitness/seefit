import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    const a = this.activeRoute.snapshot.params['id'];
    console.log('AAA', a); // TODO: Remove on PR!
    this.activeRoute.queryParams.subscribe(el => {
      console.log('OAOA', el); // TODO: Remove on PR!
    });
    // this.router.
  }

  ngOnInit() { }

}

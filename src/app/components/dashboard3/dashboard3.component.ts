import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component implements OnInit {
  date = new Date();  
  startDate = new Date();


  constructor() { 
    this.date = new Date();  
    this.date = new Date(this.date.getFullYear(),this.date.getMonth())

    console.log(this.date)
    console.log(this.date.constructor.name)
  }

  ngOnInit() {
  }

}

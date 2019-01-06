import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {
  date = new Date();  
  startDate = new Date();


  constructor() { 
    this.date = new Date();  
    this.date = new Date(this.date.getFullYear(),this.date.getMonth() , this.date.getDate())

    console.log(this.date)
    console.log(this.date.constructor.name)

  }

  ngOnInit() {
  }

}

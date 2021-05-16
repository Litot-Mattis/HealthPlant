import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

const fs = require('fs')

@Component({
  selector: 'app-product-gauge-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ProductGaugeComponent implements OnInit {
  
  gaugeType = "arch";
  gaugeValue: number;
  gaugeLabel = "Humidity";
  gaugeAppendText = "%";
  
  thresholdConfig = {
    '0': {color: 'red'},
    '40': {color: 'orange'},
    '75.5': {color: 'geen'}
  }
  
  items: Observable<any[]>;
  
  constructor(firestore: AngularFireDatabase) {
    this.getGaugeValue(firestore)
  }

  getGaugeValue(firestore: AngularFireDatabase) {
    this.items = firestore.list('Sensor').valueChanges();
    this.items.forEach(element => {
      element.forEach(elem => {
        this.gaugeValue = elem;
        return (this.gaugeValue)
      })
    })
  }
  
    
  ngOnInit() {
  }
}

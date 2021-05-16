import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model';
import { ProductGaugeComponent } from 'src/app/charts/product-gauge/product-sales-chart.component'
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Component({
  selector: 'policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css'],
})

export class PolicyListComponent implements OnInit {

  policies: Policy[];
  valueArray: Array<number> = []
  cloneArray: Array<number> = []

  public chartDatasets: Array<any> = [
    { data: []},
  ];

  public chartType: string = 'line';


  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  
  constructor(private policyService: PolicyService,
    private productGaugeComponent: ProductGaugeComponent) { }
    
    test = {
      gaugeValue: this.productGaugeComponent.gaugeValue,
    } as Policy;
    
    
    ngOnInit() {
      this.getPolicies()
    }
    
    getPolicies() {
      this.policies = []
      if (this.test.gaugeValue !== undefined) {
        this.create(this.test)
      }
      this.chartDatasets = []
      this.policyService.getPolicies().forEach(data => {
        this.valueArray = []
        this.policies = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as Policy;
        })
        this.policies.forEach(element => {
          this.valueArray.push(element.gaugeValue)
          this.chartDatasets.forEach(elem => {
            elem.data = this.valueArray
            // console.log(elem.data)
          })
        });
      });
    }
    
    create(policy: Policy){
    this.policyService.createPolicy(policy);
  }

  update(policy: Policy) {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string) {
    this.policyService.deletePolicy(id);
  }

}
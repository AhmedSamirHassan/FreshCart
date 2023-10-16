import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartId: string = ''
  constructor(private _PaymentService:PaymentService, private _ActivatedRoute:ActivatedRoute){
    _ActivatedRoute.params.subscribe((params) =>{
      this.cartId = params['cartId']
    })
  }

  shippingAddress: FormGroup = new FormGroup ({
    details : new FormControl('',[Validators.required]),

    phone : new FormControl('',
    [Validators.required,
    Validators.pattern(/^01[0125][0-9]{8}$/)]),

    city : new FormControl('',[Validators.required])
  })


  checkOut(shippingAddress:any){
    console.log(shippingAddress.value)

    this._PaymentService.creatCashOrders(this.cartId,shippingAddress.value).subscribe((res)=>{
      console.log(res)
      location.href= res.session.url
    })
  }
}

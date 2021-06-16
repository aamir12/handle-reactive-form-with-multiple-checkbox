import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-form-controls',
  templateUrl: './reactive-form-controls.component.html',
  styleUrls: ['./reactive-form-controls.component.scss']
})
export class ReactiveFormControlsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  empForm: FormGroup;
  isSubmit: boolean = false;
  states: string[] = ['AR', 'AL', 'CA', 'DC'];
  editMode: boolean = false;
  id: number = null;
  fetchSub: Subscription = null;
  loader: boolean = false;
  submitClick: boolean = false;

  masterHobbies: Array<any> = [{
    name:'Cricket',
    id:1,
    selected:false
  },
  {
    name:'Football',
    id:2,
    selected:false
  },
  {
    name:'Carrom',
    id:3,
    selected:false
  }]

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          //this.initForm(); steps start from here
        }
    );


    this.editMode = false;

    let dbHobbies = ['1','2'];
    let hobbies = new FormArray([]);
    for (let hobby of this.masterHobbies) {
      let selected = this.editMode ? dbHobbies.includes(hobby.id+""):false;
      hobbies.push(
        new FormGroup({
          'name': new FormControl(hobby.name, Validators.required),
          'id': new FormControl(hobby.id, 
            Validators.required,
          ),
          'selected' : new FormControl(selected,Validators.required)
        })
      );
    }

      this.empForm = this.fb.group({
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, Validators.required],
        addressDetails: this.fb.array([this.addAddressGroup()]),
        hobbies: hobbies
      })
      // this.route.params.subscribe((params: Params) => {
      //   if (params['id']) {
      //     this.editMode = true;
      //     this.id = +params['id'];
      //     this.initForm();
      //     this.loader = true;
      //   }
      // });
    }

  

  initForm(){

    //forkjoin : fetch data from individual api;
    //inside forkjoin subscribe check editmode is true or false 

    
    let hobbies = new FormArray([]);
    for (let hobby of this.masterHobbies) {
      hobbies.push(
        new FormGroup({
          'name': new FormControl(hobby.name, Validators.required),
          'id': new FormControl(hobby.id, 
            Validators.required,
          ),
          'selected' : new FormControl(false)
        })
      );
    }



    if(this.editMode){
      //fetch product that include dbHobbies;
      let dbHobbies = ['1','2'];
      let hobbies = new FormArray([]);
      for (let hobby of this.masterHobbies) {
        let selected = dbHobbies.includes(hobby.id+"");
        hobbies.push(
          new FormGroup({
            'name': new FormControl(hobby.name, Validators.required),
            'id': new FormControl(hobby.id, 
              Validators.required,
            ),
            'selected' : new FormControl(selected)
          })
        );
      }

      //edit
      this.empForm = this.fb.group({
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, Validators.required],
        addressDetails: this.fb.array([this.addAddressGroup()]),
        hobbies: hobbies
      })

    }else{

      //add
      this.empForm = this.fb.group({
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, Validators.required],
        addressDetails: this.fb.array([this.addAddressGroup()]),
        hobbies: hobbies
      })
    }
  }



  /*
    this.fb.control(false);
     this.fb.array(arr);
     this.fb.group({})
  */

  //initForm() {
    // this.fetchSub =
    //   (res) => {
    //     const empData = res.data;
    //     let addressDetailsArr = new FormArray([]);
    //     if (empData.addressDetails) {
    //       for (let addressD of empData.addressDetails) {
    //         addressDetailsArr.push(
    //           new FormGroup({
    //             address: new FormControl(addressD.address, Validators.required),
    //             city: new FormControl(addressD.city, Validators.required),
    //             state: new FormControl(addressD.state, Validators.required),
    //           })
    //         );
    //       }
    //     } else {
    //       addressDetailsArr = new FormArray([this.addAddressGroup()]);
    //     }

    //     const itemData = ['javascript', 'nodejs'];
    //     this.empForm = this.fb.group({
    //       fname: [empData.fname, Validators.required],
    //       lname: [empData.lname, Validators.required],
    //       email: [empData.email, [Validators.required, Validators.email]],
    //       mobile: [empData.mobile, Validators.required],
    //       addressDetails: addressDetailsArr,
    //       items: [itemData],
    //     });
    //     this.loader = false;
    //   },
    //   (error) => {
    //     this.router.navigate(['/crud']);
    //   }
    
  //}

  onCheckboxChange(e) {
    const checkArray: FormArray = this.empForm.get('hobbies') as FormArray;
    console.log('test');
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item:FormControl) => {
        
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addAddressGroup() {
    return this.fb.group({
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }
  removeAddress(index) {
    this.addressArray.removeAt(index);
  }

  get addressArray() {
    return <FormArray>this.empForm.get('addressDetails');
  }

  get hobbiesArray() {
    return <FormArray>this.empForm.get('hobbies');
  }


  onSubmit() {
    this.isSubmit = true;
    console.log(this.empForm.value);
    return;
    
  }
  get f() {
    return this.empForm.controls;
  }

  ngOnDestroy() {
    // if (this.fetchSub) {
    //   this.fetchSub.unsubscribe();
    // }
  }


  atLeastOne() {
    const hobbies = this.empForm.get('hobbies').value;
    const hh =  hobbies.every((h)=>{
     return h.selected == false
    });
    
    return hh;
   
  }
}

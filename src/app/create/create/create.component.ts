import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    slide: ['', [Validators.required, Validators.pattern(/1|2|3|4|5/)]],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get descControl() {
    return this.form.get('description') as FormControl;
  }

  get name() {
    return this.form.get('name');
  }

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);

    const formData = this.form.value;
    this.storeService.createStore({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      slide: formData.slide,
      ownerId: this.authService.uid,
    });
  }
}

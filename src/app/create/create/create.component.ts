import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError, debounceTime, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@interfaces/store';
import { ReservedNameValidator } from 'src/app/validators/reserved-name.validator';
import { UniqueNameValidator } from 'src/app/validators/unique-name.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isComplete: boolean;

  form = this.fb.group({
    storename: [
      '',
      Validators.required,
      UniqueNameValidator.storename(this.db),
    ],
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

  get storenameControl() {
    return this.form.get('storename') as FormControl;
  }

  get name() {
    return this.form.get('name');
  }

  get storename() {
    return this.form.get('storename');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
    this.isComplete = true;

    const formData = this.form.value;
    this.storeService.createStore({
      storename: formData.storename,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      slide: formData.slide,
      ownerId: this.authService.uid,
    });
  }

  update() {
    const formData = this.form.value;
    this.storeService
      .updateStore({
        storename: formData.storename,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        slide: formData.slide,
      })
      .then(() => {
        this.isComplete = true;
        this.router.navigateByUrl(`/}`);
        this.snackBar.open('ストア情報を編集しました', null, {
          duration: 2000,
        });
      });
  }
}

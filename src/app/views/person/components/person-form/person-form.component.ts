import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  gender: Array<String> = ['Masculino', 'Femenino', 'Otro'];
  loading: boolean = false;
  id: string = '';

  @ViewChild(SnackbarComponent, {static: true}) snack!: SnackbarComponent;

  constructor(
    private formBuilder: FormBuilder,
    private _personService: PersonService,
    public dialogRef: MatDialogRef<PersonFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {person: Person, title: string, button: string}) {
    this.personForm = this.formBuilder.group({
      name: [data.person.name, Validators.required],
      lastname: [data.person.lastname, Validators.required],
      gender: [data.person.gender, Validators.required],
      email: [data.person.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: [data.person.address, Validators.required]
    });
    this.id = (data.person?.idPerson) ? data.person.idPerson : '';
  }

  ngOnInit(): void {
  }

  submit(value: Person){
    this.loading = true;
    if(this.id === ''){
      this.addPerson(value);
    }else{
      this.updatePerson(this.id, value);
    }
  }

  addPerson(value: Person){
    this._personService.addPerson(value).then(() => {
      this.snack.openSnackBar('La persona se ha registrado con exito!', 'Cerrar', 2000, 'snackbar__success');
      this.loading = false;
      this.dialogRef.close({ event: 'success', data: value });
    }).catch(error =>{
      this.snack.openSnackBar('Error al registrar persona', 'Cerrar', 2000, 'snackbar__error');
      this.loading = false;
      this.dialogRef.close({ event: 'error'});
    })
  }

  updatePerson(id: string, value: Person){
    this._personService.updatePerson(id, value).then(() =>{
      this.snack.openSnackBar('El registro se ha actualizado con exito!', 'Cerrar', 2000, 'snackbar__success');
      this.loading = false;
      this.dialogRef.close({ event: 'success', data: value });
    }).catch(error =>{
      this.snack.openSnackBar('Error al actualizar persona', 'Cerrar', 2000, 'snackbar__error');
      this.loading = false;
      this.dialogRef.close({ event: 'error'});
    })
  }

}

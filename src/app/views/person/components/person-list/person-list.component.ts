import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/core/models/person';
import { PersonFormComponent } from '../person-form/person-form.component';
import { Subject, takeUntil } from 'rxjs';
import { PersonService } from 'src/app/core/services/person.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'lastname', 'gender', 'email', 'address', 'options'];
  dataSource!: MatTableDataSource<Person>;
  loading: boolean = false;
  destroy$:Subject<void> = new Subject();
  people: Person[] = [];

  @ViewChild(SnackbarComponent, {static: true}) snack!: SnackbarComponent;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(public matDialog: MatDialog, private _personService: PersonService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataSource = new MatTableDataSource();
    this._personService.getPerson().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.people = [];
        data.forEach((element: any) => {
          this.people.push({
            idPerson: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        this.dataSource.data = this.people;
        this.loading = false;
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addPerson(){
    const jsn : Person = {
      name: '',
      lastname: '',
      gender: '',
      email: '',
      address: ''
    }
    this.matDialog.open( PersonFormComponent,
      {
        data: {person: jsn, title: 'Registro de personas', button:'Agregar'},
        panelClass: 'modal-fullscreen',
        height: '80vh',
        width: '90%'
      }
    );
  }

  deletePerson(id: string){
    this.loading = true;
    this._personService.deletePerson(id).then(() => {
      this.snack.openSnackBar('El registro se ha eliminado con exito!', 'Cerrar', 2000, 'snackbar__success');
      this.loading = false;
    }).catch(error => {
      this.snack.openSnackBar('Error al eliminar el registro', 'Cerrar', 2000, 'snackbar__error');
      this.loading = false;
    })
  }

  editPerson(element: Person){
    this.matDialog.open( PersonFormComponent,
      {
        data: {person: element, title: 'Editado de personas', button:'Editar'},
        panelClass: 'modal-fullscreen',
        height: '80vh',
        width: '90%'
      }
    );
  }

}


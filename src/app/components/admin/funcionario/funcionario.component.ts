import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Component, ElementRef, ViewChild } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// models
import { Departamento } from './../../../models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';

// services
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from './../../../services/funcionario.service';

// forms
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// swal
import Swal from 'sweetalert2';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent {
  funcionarios$: Observable<Funcionario[]> = new Observable();
  departamentos$: Observable<Departamento[]> = new Observable();
  departamentoFiltro: string = '';
  edit: boolean = false;
  displayDialogFuncionario: boolean = false;
  form!: FormGroup;

  // upload da foto
  @ViewChild('inputFile', { static: false }) inputFile!: ElementRef;
  uploadPercent: Observable<number> = new Observable();
  downloadURL!: Promise<string>;
  complete: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private angularFireStorage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.funcionarios$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
    this.departamentoFiltro = 'TODOS';
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      funcao: new FormControl(),
      departamento: new FormControl('', Validators.required),
      foto: new FormControl(),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

  selecionaFuncionario(funcionario: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(funcionario);
  }

  save() {
    console.log(this.form.value);

    this.funcionarioService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Funcionário ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogFuncionario = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Funcionário`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delet(funcionario: Funcionario) {
    Swal.fire({
      title: 'Confirma a exclusão do Funcionário?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(funcionario.id).then(() => {
          Swal.fire('Funcinário excluído com sucesso!', '', 'success');
        });
      }
    });
  }

  async upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const filePath = `funcionarios/${new Date().getTime().toString()}`;
      const fileRef = this.angularFireStorage.ref(filePath);
      const task = this.angularFireStorage.upload(filePath, file);

      task.then(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.complete = true;
          this.form.patchValue({
            foto: url,
          });
        });
      });

      this.uploadPercent = task.percentageChanges() as Observable<number>;
      this.inputFile.nativeElement.value = '';
    }
  }
}

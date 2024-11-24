import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import { response } from 'express';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss',
})
export class ModalFormUserComponent {
  planosSaude = [
    {
      id: 1,
      descricao: 'Plano 300 Enfermaria',
    },
    {
      id: 2,
      descricao: 'Plano 400 Enfermaria',
    },

    {
      id: 3,
      descricao: 'Plano 500 Plus',
    },
  ];

  planosOdonto = [
    {
      id: 1,
      descricao: 'Plano Basic',
    },
    {
      id: 2,
      descricao: 'Plano Medium',
    },
    {
      id: 3,
      descricao: 'Plano Plus',
    },
  ];

  formUser: FormGroup;

  constructor(
    public diaLogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  saveUser() {
    const objUserForm: User = this.formUser.getRawValue();

    this.userService.addUser(objUserForm).then((response: any) => {
      window.alert('Usuário Salvo com Sucesso');
      this.closeModal();
    })
    .catch(
      err => {
        window.alert('Ocorreu um erro ao salvar o usuário')
        console.error(err)
      })
  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    });
  }

  closeModal() {
    this.diaLogRef.close();
  }
}

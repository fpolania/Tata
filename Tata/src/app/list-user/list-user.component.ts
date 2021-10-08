import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericMessage } from '../app-core/core/message/genericmessage';
import { GeneralService } from '../app-core/core/services/general.service';
import { DefaultConfig } from '../utilities/defaultconfig';
import { CreateUser, Usuarios } from './entities/user.object';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  listUser: Array<Usuarios>;
  pageStart: number;
  recordForm: FormGroup;
  submit: boolean;
  message: GenericMessage;
  showModal: boolean;
  constructor(private readonly generalService: GeneralService,
    private readonly formBuilder: FormBuilder) {
    this.listUser = new Array<Usuarios>();
    this.submit = false;
    this.message = new GenericMessage();
    this.showModal = false;
  }

  ngOnInit(): void {
    this.getInformationUser();
  }

  /**
   *Obtiene información.
   *
   * @memberof ListUserComponent
   */
   getInformationUser(): void {
    this.generalService.getListUser(this.pageStart).subscribe((rs: any) => {
      this.listUser = rs.data;
    });
    this.inciarFormulario();
  }
  /**
   * Inica la instancia del formulario.
   *
   * @memberof RecordComponent
   */
  inciarFormulario(): any {
    this.recordForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      trabajo: ['', [Validators.required]],
    });
  }
  get genericControl(): any {
    return this.recordForm.controls;
  }

  /**
   * Registra usuarios.
   *
   * @memberof ListUserComponent
   */
  saveUser() {
    if (this.recordForm.invalid) {
      this.submit = true;
    } else {
      const items = new CreateUser();
      items.nombre = this.recordForm.controls.nombre.value;
      items.trabajo = this.recordForm.controls.trabajo.value;
      this.generalService.insertUser(items).subscribe((rs: any) => {
        if (rs) {
          this.recordForm.reset();
          this.message.showMessage('success', DefaultConfig.DEFAULT_TEXT_APP.mensajeSave, 3000, 'Guardo');
          this.closeModal();
        }
      });
    }
  }

  /**
   * Elimina datos.
   *
   * @param {number} Id
   * @memberof ListUserComponent
   */
  deleteUser(Id: number) {
    this.generalService.deleteUser(Id).subscribe((rs: any) => {
      if (rs) {
        this.message.showMessage('success', DefaultConfig.DEFAULT_TEXT_APP.mensajeDelete, 3000, 'Elimino');
      }
    });
  }

  /**
   *Abre la modal y mapea la información al actualizar.
   *
   * @param {*} [item]
   * @param {boolean} [isUpdate]
   * @memberof ListUserComponent
   */
  openModal(item?: any, isUpdate?: boolean) {
    this.showModal = true;
    if (isUpdate) {
      this.recordForm.patchValue({
        nombre: item.first_name,
        trabajo: item.last_name
      });
    } else {
      this.recordForm.reset();
    }
  }

  /**
   * Cierra la modal.
   *
   * @memberof ListUserComponent
   */
  closeModal() {
    const modal = document.getElementById('closeModal') as HTMLButtonElement;
    modal.click();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericMessage } from '../app-core/core/message/genericmessage';
import { GeneralService } from '../app-core/core/services/general.service';
import { DefaultConfig } from '../utilities/defaultconfig';
import { Cliente, Usuarios } from './entities/user.object';

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
  modalTitle: string;
  idUser: number;
  viewDatail: boolean;
  constructor(private readonly generalService: GeneralService,
    private readonly formBuilder: FormBuilder) {
    this.listUser = new Array<Usuarios>();
    this.submit = false;
    this.message = new GenericMessage();
    this.modalTitle = DefaultConfig.DEFAULT_TEXT_APP.titleCreate;
    this.viewDatail = false;
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
  saveUser(modalTitle?: string) {
    switch (modalTitle) {
      case DefaultConfig.DEFAULT_TEXT_APP.titleCreate: {
        this.createUser();
        break;
      }
      case DefaultConfig.DEFAULT_TEXT_APP.titleUpdate: {
        this.updateUser();
        break;
      }
      default: {
        break;
      }
    }

  }
  updateUser() {
    if (this.recordForm.invalid) {
      this.submit = true;
    } else {
      let items = new Cliente();
      items = this.prepareInformation();
      this.generalService.updateuser(this.idUser, items).subscribe((rs: any) => {
        if (rs) {
          this.message.showMessage('success', DefaultConfig.DEFAULT_TEXT_APP.mensajeUpdate, 3000, 'Actualizo');
          this.closeModal();
        }
      });
    }
  }
  createUser() {
    if (this.recordForm.invalid) {
      this.submit = true;
    } else {
      let items = new Cliente();
      items = this.prepareInformation();
      this.generalService.insertUser(items).subscribe((rs: any) => {
        if (rs) {
          this.recordForm.reset();
          this.message.showMessage('success', DefaultConfig.DEFAULT_TEXT_APP.mensajeSave, 3000, 'Guardo');
          this.closeModal();
        }
      });
    }
  }
  prepareInformation(): Cliente {
    const elemento = new Cliente();
    elemento.nombre = this.recordForm.controls.nombre.value;
    elemento.trabajo = this.recordForm.controls.trabajo.value;
    return elemento;
  }
  /**
   * Elimina datos.
   *
   * @param {number} Id
   * @memberof ListUserComponent
   */
  deleteUser(Id: number) {
    this.generalService.deleteUser(Id).subscribe((rs: any) => {
      if (rs === null) {
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
    if (isUpdate) {
      this.recordForm.patchValue({
        nombre: item.first_name,
        trabajo: item.last_name
      });
      this.idUser = item.id;
      this.modalTitle = DefaultConfig.DEFAULT_TEXT_APP.titleUpdate;
    } else {
      this.modalTitle = DefaultConfig.DEFAULT_TEXT_APP.titleCreate;
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
  viewDetail(item: any) {
    this.message.showDetail(item);
  }
}

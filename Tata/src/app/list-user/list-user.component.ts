import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../app-core/core/services/general.service';
import { Usuarios } from './entities/user.object';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  listaUsuarios: Array<Usuarios>;
  pageStart: number = 1;
  recordForm: FormGroup;
  submit: boolean;
  constructor(private readonly generalService: GeneralService,
    private readonly formBuilder: FormBuilder) {
      this.listaUsuarios = new Array<Usuarios>();
      this.submit = false;
  }

  ngOnInit(): void {
    this.obtenerListaUsuario();
  }
  obtenerListaUsuario(): void {
    this.generalService.getListUser().subscribe((rs: any) => {
      this.listaUsuarios = rs.data;
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
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9]*)'),
          Validators.maxLength(10),
        ],
      ],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]*)'),
          Validators.minLength(6),
        ],
      ],
      dobleContrasenia: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]*)'),
          Validators.minLength(6),
        ],
      ],
      terminos: ['', Validators.required],
    });
  }
  get genericControl(): any {
    return this.recordForm.controls;
  }

}

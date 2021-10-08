import Swal from 'sweetalert2';

export class GenericMessage {

  /**
   * Renderiza el mensaje segun su tipo.
   *
   * @param {string} icon
   * @param {*} mensaje
   * @param {number} [timer]
   * @param {string} [titulo]
   * @memberof GenericMessage
   */
  public showMessage(icon: string, mensaje: string, timer?: number, titulo?: string) {
    Swal.fire({
      icon: `${icon}` as any,
      text: mensaje,
      title: titulo === undefined ? '' : titulo,
      showConfirmButton: false,
      timer: timer,
    });
  }

  /**
   * Muestra el detalle del registro seleccionado
   *
   * @param {*} item
   * @memberof GenericMessage
   */
  public showDetail(item: any) {
    debugger;
    Swal.fire({
      title: `${item.first_name} ${item.last_name}`,
      text: item.email,
      imageUrl: item.avatar,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
}

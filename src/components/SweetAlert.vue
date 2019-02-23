<script>
import Swal from 'sweetalert2'

async function showSuccessModal(
  message = 'Operção realizada com sucesso.',
  title = 'Sucesso!'
) {
  return Swal.fire({
    title,
    text: message,
    type: 'success',
    confirmButtonClass: 'button button-principal',
    buttonsStyling: false,
  })
}

async function showFailModal(
  message = 'Essa operação não pode ser concluída.',
  title = 'Erro!'
) {
  return Swal.fire({
    title,
    text: message,
    type: 'error',
    confirmButtonClass: 'button sweet-btn button-principal',
    buttonsStyling: false,
  })
}

async function showConfirmationModal(
  message = 'Você tem certeza que deseja fazer isso?',
  title = 'Atenção!'
) {
  return Swal.fire({
    title,
    text: message,
    type: 'warning',
    buttonsStyling: false,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonClass: 'button sweet-btn button-principal',
    cancelButtonClass: 'button sweet-btn button-cancel',
  })
}
export default {
  showSuccessModal,
  showFailModal,
  showConfirmationModal,
}
</script>

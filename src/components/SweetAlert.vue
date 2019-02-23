<script>
import Swal from 'sweetalert2'

async function showSuccessModal(
  message = 'Operção realizada com sucesso.',
  title = 'Sucesso!'
) {
  return Swal({
    title,
    text: message,
    type: 'success',
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
    animation: false,
  })
}

async function showFailModal(
  message = 'Essa operação não pode ser concluída.',
  title = 'Erro!'
) {
  return Swal({
    title,
    text: message,
    type: 'error',
    confirmButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    animation: false,
  })
}

async function showConfirmationModal(
  message = 'Você tem certeza?.',
  title = 'Atenção!'
) {
  return Swal({
    title,
    text: message,
    type: 'warning',
    confirmButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    animation: false,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
  })
}
export default {
  showSuccessModal,
  showFailModal,
  showConfirmationModal,
}
</script>

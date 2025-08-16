const onClickGenerateQR = (text, id) => {
  const container = document.getElementById(id)
  if (!container) return console.error(`No se encontró el elemento con id: ${id}`)
  container.innerHTML = ''
  new QRCode(container, {
    text,
    width: 184,
    height: 184,
    render: 'image',
    colorDark: '#111629',
    correctLevel: QRCode.CorrectLevel.H,
  })
  document.getElementById('input-container').classList.add('hidden')
  document.getElementById('qr-code-container').classList.remove('hidden')
}

const onClickDownloadBtn = (downloadBtnId, qrContainerId) => {
  const btn = document.getElementById(downloadBtnId)
  if (!btn) return

  btn.addEventListener('click', () => {
    const container = document.getElementById(qrContainerId)
    if (!container) return

    const img = container.querySelector('img')

    const link = document.createElement('a')
    link.href = img.src
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

const onClickShareButton = (shareBtnId, qrContainerId) => {
  const btn = document.getElementById(shareBtnId)
  if (!btn) return

  btn.addEventListener('click', async () => {
    const container = document.getElementById(qrContainerId)
    if (!container) return

    try {
      const value = document.getElementById('qr-input').value
      if (!value) {
        return
      }

      await navigator.clipboard.writeText(value)
    } catch (err) {
      alert('Failed to copy text')
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('generate-qr-btn')
  const input = document.getElementById('qr-input')
  if (!button || !input) return
  button.addEventListener('click', () => {
    if (!input.value) {
      alert('Please enter a value to generate the QR code.')
      return
    } else {
      onClickGenerateQR(input.value, 'qr-code')
    }
  })
  onClickDownloadBtn('download-qr-btn', 'qr-code')
  onClickShareButton('share-qr-btn', 'qr-code')
})

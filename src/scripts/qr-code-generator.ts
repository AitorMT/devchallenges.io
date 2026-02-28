declare const QRCode: {
  new (element: HTMLElement, options: Record<string, unknown>): unknown
  CorrectLevel: { H: number; L: number; M: number; Q: number }
}

function onClickGenerateQR(text: string, id: string): void {
  const container = document.getElementById(id)
  if (!container) return

  container.innerHTML = ''
  new QRCode(container, {
    text,
    width: 184,
    height: 184,
    render: 'image',
    colorDark: '#111629',
    correctLevel: QRCode.CorrectLevel.H,
  })

  document.getElementById('input-container')?.classList.add('hidden')
  const qrContainer = document.getElementById('qr-code-container')
  if (qrContainer) {
    qrContainer.classList.remove('hidden')
    qrContainer.classList.add('flex')
  }
}

function initDownloadButton(downloadBtnId: string, qrContainerId: string): void {
  const btn = document.getElementById(downloadBtnId)
  if (!btn) return

  btn.addEventListener('click', () => {
    const container = document.getElementById(qrContainerId)
    if (!container) return

    const img = container.querySelector('img')
    if (!img) return

    const link = document.createElement('a')
    link.href = img.src
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

function initShareButton(shareBtnId: string, qrContainerId: string): void {
  const btn = document.getElementById(shareBtnId)
  if (!btn) return

  btn.addEventListener('click', async () => {
    const input = document.getElementById('qr-input') as HTMLInputElement | null
    if (!input?.value) return

    try {
      await navigator.clipboard.writeText(input.value)
    } catch {
      alert('Failed to copy text')
    }
  })
}

// Astro scripts are deferred by default — no DOMContentLoaded needed
const button = document.getElementById('generate-qr-btn')
const input = document.getElementById('qr-input') as HTMLInputElement | null

if (button && input) {
  button.addEventListener('click', () => {
    if (!input.value) {
      alert('Please enter a value to generate the QR code.')
      return
    }
    onClickGenerateQR(input.value, 'qr-code')
  })
}

initDownloadButton('download-qr-btn', 'qr-code')
initShareButton('share-qr-btn', 'qr-code')

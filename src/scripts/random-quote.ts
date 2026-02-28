interface Quote {
  author: string
  quote: string
  tags: string[]
}

const API_URL =
  'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json'

async function getRandomQuote(): Promise<Quote | null> {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Error en la solicitud a la API: ${response.status}`)
    }
    const data: Quote[] = await response.json()
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  } catch (error) {
    console.error('Failed to fetch quote:', error)
    return null
  }
}

async function setRandomQuote(): Promise<void> {
  const quote = await getRandomQuote()
  if (!quote) return

  const authorEl = document.getElementById('author')
  const quoteEl = document.getElementById('quote')
  const tagsContainer = document.getElementById('tags')

  if (authorEl) authorEl.textContent = quote.author
  if (quoteEl) quoteEl.textContent = `\u201C${quote.quote}\u201D`
  if (tagsContainer) {
    tagsContainer.innerHTML = ''
    quote.tags.forEach((tag) => {
      const tagElement = document.createElement('div')
      tagElement.className = 'tag'
      tagElement.style.color = 'var(--colorLabel)'
      tagElement.style.fontSize = 'var(--smallText)'
      tagElement.style.border = '1px solid var(--colorLabel)'
      tagElement.style.borderRadius = '9999px'
      tagElement.style.padding = '0.15rem 0.75rem'
      tagElement.style.textTransform = 'capitalize'
      tagElement.textContent = tag
      tagsContainer.appendChild(tagElement)
    })
  }
}

function shareQuote(): void {
  const quoteEl = document.getElementById('quote')
  if (!quoteEl) return
  const quoteText = quoteEl.textContent ?? ''
  const textClipBoard = quoteText.replace(/\u201C|\u201D/g, '').trim()
  navigator.clipboard.writeText(textClipBoard)
}

// Astro scripts are deferred by default — no DOMContentLoaded needed
setRandomQuote()
document.getElementById('random-quote-button')?.addEventListener('click', setRandomQuote)
document.getElementById('share-quote-button')?.addEventListener('click', shareQuote)

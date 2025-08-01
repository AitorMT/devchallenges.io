const API_URL =
  'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json'

const getRandomQuote = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error en la solicitud a la API')
    }
    const data = await response.json()
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  } catch (error) {
    return error.message
  }
}

const setRandomQuote = async () => {
  const quote = await getRandomQuote()
  if (quote) {
    document.getElementById('author').textContent = quote.author
    document.getElementById('quote').textContent = `“${quote.quote}”`
    const tagsContainer = document.getElementById('tags')
    tagsContainer.innerHTML = ''
    quote.tags.forEach((tag) => {
      const tagElement = document.createElement('div')
      tagElement.classList.add('tag')
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

const shareQuote = () => {
  const quoteText = document.getElementById('quote').textContent
  const textClipBoard = quoteText.replace(/“|”/g, '').trim()
  navigator.clipboard.writeText(textClipBoard)
}

document.addEventListener('DOMContentLoaded', () => {
  setRandomQuote()
  const randomButton = document.getElementById('random-quote-button')
  randomButton.addEventListener('click', setRandomQuote)
  const shareButton = document.getElementById('share-quote-button')
  shareButton.addEventListener('click', shareQuote)
})

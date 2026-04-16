// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', () => {
  const stateInput = document.getElementById('state-input')
  const fetchButton = document.getElementById('fetch-alerts')
  const alertsDisplay = document.getElementById('alerts-display')
  const errorMessage = document.getElementById('error-message')

  fetchButton.addEventListener('click', async () => {
    const state = stateInput.value.trim()
    if (!state) return

    errorMessage.classList.add('hidden')
    errorMessage.textContent = ''

    try {
      const response = await fetch(weatherApi + state)
      
      if (!response.ok) {
        throw new Error('Fetch failed')
      }

      const data = await response.json()
      
      alertsDisplay.textContent = `Weather Alerts: ${data.features.length}`
      data.features.forEach(alert => {
        alertsDisplay.textContent += `\n${alert.properties.headline}`
      })

      stateInput.value = ''
    } catch (error) {
      errorMessage.textContent = error.message
      errorMessage.classList.remove('hidden')
    }
  })
})
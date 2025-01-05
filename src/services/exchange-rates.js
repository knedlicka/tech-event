export const getExchangeRates = async () => {
  const OPEN_EXCHANGE_RATES_APP_ID = 'b323d6dd22ab4ffd9bc3df17302e0fd6' // TODO load from environment instead
  try {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_RATES_APP_ID}`,
      {
        method: 'GET',
      },
    )
    const data = await response.json()
    if (data.error) {
      alert(`Error getting exchange rates: ${data.message}`)
    }
    return data.rates
  } catch (err) {
    alert(`Unexpected error while getting exchange rates: ${JSON.stringify(err, null, 2)}`)
  }
}

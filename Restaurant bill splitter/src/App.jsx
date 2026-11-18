import { useState } from 'react'
import './App.css'

function App() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('0')
  const [people, setPeople] = useState('1')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const billNum = parseFloat(bill)
    const tipPercent = parseFloat(tip)
    const peopleNum = parseInt(people)

    // Validation: bill empty or not above 0, or people less than 1
    if (isNaN(billNum) || billNum <= 0 || isNaN(peopleNum) || peopleNum < 1) {
      setResult(null)
      setError('Please enter a valid bill and number of people.')
      return
    }

    const tipAmount = (billNum * tipPercent) / 100
    const total = billNum + tipAmount
    const perPerson = total / peopleNum

    setError('')
    setResult({
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
    })
  }

  return (
    <div className="card">
      <h2>Bill Splitter</h2>

      <label htmlFor="bill">Bill amount (Rs.)</label>
      <input
        type="text"
        id="bill"
        placeholder="e.g. 1200"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label htmlFor="tip">Tip</label>
      <select id="tip" value={tip} onChange={(e) => setTip(e.target.value)}>
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="10">10%</option>
        <option value="15">15%</option>
      </select>

      <label htmlFor="people">Number of people</label>
      <input
        type="text"
        id="people"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
      />

      <button onClick={handleCalculate}>Calculate</button>

      <div className="result">
        {error && <span className="error">{error}</span>}
        {result && (
          <>
            Tip amount: Rs. {result.tipAmount}
            <br />
            Total bill: Rs. {result.total}
            <br />
            Each person pays: Rs. {result.perPerson}
          </>
        )}
      </div>
    </div>
  )
}

export default App
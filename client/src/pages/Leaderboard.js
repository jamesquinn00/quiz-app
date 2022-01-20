import { useState, useEffect } from 'react'
import axios from 'axios'
import NavigateButton from '../components/NavigateButton'

function Leaderboard() {
   const [info, setInfo] = useState('')
   const [scoresList, setScoresList] = useState([])
   const [filter, setFilter] = useState('')

   useEffect(() => {
      async function getScores() {
         try {
            setInfo('Loading scores')
            const { data } = await axios.get('https://quiz-app-lap3.herokuapp.com/users')
            data.entries.sort((a, b) => getTotalScore(b) - getTotalScore(a))
            setScoresList(data.entries)
            setInfo('')
         } catch(err) {
            setInfo(`There has been an issue ${err.message}`)
         }
      }

      getScores()
   }, [])

   function getTotalScore(entry) {
      delete entry._id
      let total = 0
      for(const key in entry)
         if(key !== 'name')
            total += entry[key]

      return total
   }

   const handleInput = e => {
      setFilter(e.target.value)
   }

   function ScoresList(props) {
      let list
      if(filter) {
         list = [...scoresList]
         list = list.filter(e => filter in e)
         list.sort((a, b) => b[filter] - a[filter])
      } else {
         list = scoresList
      }
      list = list.slice(0, 10)
      return list.map((e, i) => <p key={`player${i}`}>{e.name}: {filter ? e[filter] : getTotalScore(e)}</p>)
   }

   return (
      <div className="LeaderBoard">
         <h1>LEADERBOARD</h1>
         <label>Filter by difficulty</label>
         <select role="leaderboard-difficulty" onChange={handleInput} name="difficulty">
            <option value=''>All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
         </select>
         <div role='scorelist' className='table'>
            <ScoresList difficultyFilter={filter}/>
         </div>
         <h2>{info}</h2>
         <NavigateButton navigatePath={'/'} buttonText="Home" />
      </div>
   )
}

export default Leaderboard
import { useEffect } from 'react'
import { connect } from 'react-redux'

import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'

import { setSearchField, requestRobots } from '../actions.js'

import './App.css'

const mapStateToProps = ({ searchRobots, requestRobots }) => {
  return {
    searchField: searchRobots.searchField,
    robots: requestRobots.robots,
    isPending: requestRobots.isPending,
    error: requestRobots.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (e) => dispatch(setSearchField(e.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  }
}

const App = ({
  robots,
  searchField,
  onSearchChange,
  onRequestRobots,
  isPending,
}) => {
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  useEffect(() => {
    onRequestRobots()
  }, [])

  return (
    <div className='tc'>
      <header className='App-header'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox onSearchChange={onSearchChange} />
      </header>
      <Scroll>
        {isPending ? (
          <h1>Loading...</h1>
        ) : (
          <article>
            <CardList robots={filteredRobots} />
          </article>
        )}
      </Scroll>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

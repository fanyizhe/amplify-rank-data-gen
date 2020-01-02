// src/App.js
import React from 'react';

import { API, graphqlOperation } from 'aws-amplify'
// import uuid to create a unique client ID
import uuid from 'uuid/v4'

import { listRanks as ListRanks } from './graphql/queries'
// import the mutation
import { createRank as CreateRank } from './graphql/mutations'

import awsmobile from './aws-exports'

API.configure(awsmobile)

const CLIENT_ID = uuid()

class App extends React.Component {
  // define some state to hold the data returned from the API
  state = {
    name: '', score: 0, ranks: []
  }

  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      const rankData = await API.graphql(graphqlOperation(ListRanks))
      console.log('rankData:', rankData)
      this.setState({
        ranks: rankData.data.listRanks.items
      })
    } catch (err) {
      console.log('error fetching ranks...', err)
    }
  }
  createRank = async() => {
    const { name, score } = this.state
    if (name === '' || score === '') return

    const rank = { name, score, id: CLIENT_ID }
    const ranks = [...this.state.ranks, rank]
    this.setState({
      ranks, name: '', score: 0
    })

    try {
      await API.graphql(graphqlOperation(CreateRank, { input: rank }))
      console.log('item created!')
    } catch (err) {
      console.log('error creating rank...', err)
    }
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <>
        <input
          name='name'
          onChange={this.onChange}
          value={this.state.name}
          placeholder='name'
        />
        <input
          name='score'
          onChange={this.onChange}
          value={this.state.score}
        />

        <button onClick={this.createRank}>Create Rank</button>
        {
          this.state.ranks.map((rank, index) => (
            <div key={index}>
              <h3>{rank.name}</h3>
              <h5>{rank.score}</h5>
            </div>
          ))
        }
      </>
    )
  }
}

export default App
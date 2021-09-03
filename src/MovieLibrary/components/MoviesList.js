import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TMDBImage from './TMDBImage'
import './MoviesList.css'

export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null
  }

  handleSelectMovie = item => this.setState({selectedMovie: item})

  handleSortingChange = sortingType => console.log(sortingType)

  render() {

    const {movies} = this.props
    const {selectedMovie} = this.state

    return (
      <div className="movies-list">
        <div className="items">
          <div className="movies-sort">
            <SortingOptions onChange={this.handleSortingChange}/>
          </div>
          <div className="movies-grid">
          {movies.map(movie =>
            <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={this.handleSelectMovie}/>
          )}
          </div>
        </div>
        {
          selectedMovie && (
            <ExpandedMovieItem movie={selectedMovie} close={this.handleSelectMovie} />
          )
        }
      </div>
    )
  }
}

class ExpandedMovieItem extends Component {
  
  handleClick = e => {
    console.log("click close")
    const {close} = this.props
    close(null)
  }

  render() {
    const {movie} = this.props
    const {close} = this.props

    return (
      <div className="expanded-movie-item">
        {console.log(close)}
        <div className="expanded-movie-content">
          <button className="close-movie" onClick={this.handleClick}>X</button>
          <TMDBImage src={movie.poster_path} className="poster" />
          <div className="description">
            <h2>{movie.title}({movie.original_title})</h2>
            <div className="rank"><h4>Rank (votes count)</h4>: <span>{movie.vote_average} ({movie.vote_count})</span></div>
            <span className="overview">{movie.overview}</span>
          </div>
        </div>
      </div>
    )
  }
}

class MovieListItem extends Component {

  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }

  render() {
    const {movie: {title, poster_path, vote_average}, isSelected} = this.props
    return (
      <div className={classNames('movie-list-item', {'selected': isSelected})} onClick={this.handleClick}>
        <TMDBImage src={poster_path} className="poster" />
        <p className="title">{title}({vote_average})</p>
      </div>
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    onChange(selectedValue)
  }

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="" disabled selected hidden>Sort by</option>
        <option value=""></option>
        <option value="name_asc">A -> Z</option>
        <option value="name_desc">Z -> A</option>
        <option value="rating">Rating</option>
      </select>
    )
  }
}


import React, { useContext, useEffect, Fragment } from "react"
import { Store } from "./Store"
import { IAction, IEpisode } from "./interfaces"

export default function App(): JSX.Element {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
    // eslint-disable-next-line
  })

  const fetchDataAction = async () => {
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    })
  }

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode)
    let dispatchObj = { type: "ADD_FAV", payload: episode }
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      )
      dispatchObj = { type: "REMOVE_FAV", payload: favWithoutEpisode }
    }
    return dispatch(dispatchObj)
  }
  console.log(state)
  return (
    <Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode!!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section className="episode-box" key={episode.id}>
              <img
                src={episode.image.medium}
                alt={`Rick and Mort ${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Number: {episode.number}
                <button type="button" onClick={() => toggleFavAction(episode)}>
                  {state.favourites.some(
                    (fav: IEpisode) => fav.id === episode.id
                  )
                    ? "Unfav"
                    : "Fav"}
                </button>
              </section>
            </section>
          )
        })}
      </section>
    </Fragment>
  )
}

import React from "react"
import { IEpisode } from "./interfaces"

export default function EpisodesList(props: any): Array<JSX.Element> {
  const { episodes, toggleFavAction, favorites, state, dispatch } = props
  return episodes.map((episode: IEpisode) => {
    return (
      <section className="episode-box" key={episode.id}>
        <img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
        <div>{episode.name}</div>
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          Season: {episode.season} Number: {episode.number}
          <button type="button" onClick={() => toggleFavAction(state, dispatch, episode)}>
            {favorites.some((fav: IEpisode) => fav.id === episode.id)
              ? "Unfav"
              : "Fav"}
          </button>
        </section>
      </section>
    )
  })
}

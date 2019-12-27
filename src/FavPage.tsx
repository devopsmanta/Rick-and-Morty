import React, { useContext } from "react"
import { Store } from "./Store"
import { IEpisodeProps } from "./interfaces"
import { toggleFavAction } from "./actions"

const EpisodesList = React.lazy<any>(() => import("./EpisodesList"))

export default function Favpage(): JSX.Element {
  const { state, dispatch } = useContext(Store)

  const props: IEpisodeProps = {
    episodes: state.favorites,
    state,
    dispatch,
    favorites: state.favorites,
    toggleFavAction: toggleFavAction
  }

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <section className="episode-layout">
        <EpisodesList {...props} />
      </section>
    </React.Suspense>
  )
}

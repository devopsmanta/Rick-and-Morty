import React, { useContext, useEffect, Fragment } from "react"
import { Store } from "./Store"
import { IEpisodeProps } from "./interfaces"
import { fetchDataAction, toggleFavAction } from "./actions"

const EpisodesList = React.lazy<any>(() => import("./EpisodesList"))

export default function HomePage(): JSX.Element {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch)
    // eslint-disable-next-line
  })

  const props: IEpisodeProps = {
    episodes: state.episodes,
    state,
    dispatch,
    favorites: state.favorites,
    toggleFavAction: toggleFavAction
  }

  return (
    <Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </React.Suspense>
    </Fragment>
  )
}

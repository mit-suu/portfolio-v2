/** Projector texture laid over everything: grain, dust, a wandering scratch and a vignette. */
export function FilmGrain() {
  return (
    <div className="film-fx" aria-hidden="true">
      <div className="film-fx__grain" />
      <div className="film-fx__scratch" />
      <div className="film-fx__flicker" />
      <div className="film-fx__vignette" />
    </div>
  );
}

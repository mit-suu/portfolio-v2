import { CinemaProvider } from "@/components/cinema/CinemaProvider";
import { Cursor } from "@/components/cinema/Cursor";
import { FilmGrain } from "@/components/cinema/FilmGrain";
import { FilmLeader } from "@/components/cinema/FilmLeader";
import { Hud } from "@/components/cinema/Hud";
import { Acts } from "@/components/scenes/Acts";
import { BoxOffice } from "@/components/scenes/BoxOffice";
import { Cast } from "@/components/scenes/Cast";
import { EndCredits } from "@/components/scenes/EndCredits";
import { FeaturePresentation } from "@/components/scenes/FeaturePresentation";
import { Laurels } from "@/components/scenes/Laurels";
import { OpeningTitles } from "@/components/scenes/OpeningTitles";
import { Protagonist } from "@/components/scenes/Protagonist";

export default function Home() {
  return (
    <CinemaProvider>
      <FilmLeader />
      <main>
        <OpeningTitles />
        <Protagonist />
        <Acts />
        <FeaturePresentation />
        <BoxOffice />
        <Cast />
        <Laurels />
        <EndCredits />
      </main>
      {/* After <main> so its scroll triggers are created after the scenes' pins. */}
      <Hud />
      <FilmGrain />
      <Cursor />
    </CinemaProvider>
  );
}

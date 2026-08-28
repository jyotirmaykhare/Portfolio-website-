import Landing from "./Landing";
import Scene from "./Scene";

/**
 * The akash-style interactive hero: the big name reveal + the live 3D
 * character. The Scene renders inside its own `.character-stage` wrapper,
 * which is position: fixed on desktop — so the character stays on screen
 * from the hero all the way down to the Technical Ecosystem section,
 * orbiting/turning with scroll and tracking the pointer throughout.
 */
const LandingHero = () => {
  return (
    <>
      <Scene />
      <Landing />
      <div className="landing-circle1" />
      <div className="landing-circle2" />
    </>
  );
};

export { LandingHero };
export default LandingHero;
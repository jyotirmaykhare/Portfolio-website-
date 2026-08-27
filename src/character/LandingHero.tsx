import Landing from "./Landing";
import Scene from "./Scene";

/**
 * The akash-style interactive hero: the big name reveal + the live 3D
 * character that tracks the pointer. Mounted as the first home hero.
 */
const LandingHero = () => {
  return (
    <>
      <Landing>
        <Scene />
      </Landing>
      <div className="landing-circle1" />
      <div className="landing-circle2" />
    </>
  );
};

export { LandingHero };
export default LandingHero;
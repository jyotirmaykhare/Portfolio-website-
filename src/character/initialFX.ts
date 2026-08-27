import { gsap, SplitText } from "./gsapSetup";

let ran = false;

/**
 * Runs once the loading screen completes — reveals the landing text with
 * GSAP SplitText character reveals (the signature akash 3D-portfolio intro).
 * Guarded so it can never fire twice (prevents duplicate text animations).
 */
export function initialFX() {
  if (ran) return;
  ran = true;

  document.body.style.overflowY = "auto";

  const main = document.getElementsByTagName("main");
  if (main[0]) main[0].classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  /* ---------- Main headline reveal (Hello! I'm / JYOTIRMAY KHARE / Full Stack) ---------- */
  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  /* ---------- Split all swap-text divs into chars ---------- */
  const landingText2 = new SplitText(".landing-h2-info", TextProps);       // "Engineering" (2nd h2, primary)
  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);   // "Developer" (2nd h2, secondary)
  const landingText4 = new SplitText(".landing-h2-1", TextProps);         // "Developer" (1st h2, primary)
  const landingText5 = new SplitText(".landing-h2-2", TextProps);        // "Engineering" (1st h2, secondary)

  // Set initial hidden state for secondary chars so they don't flash visible
  // before the first swap. `visibility: "visible"` overrides the CSS
  // `visibility: hidden` on the parent div (visibility is inherited, but a
  // child with `visibility: visible` always wins).
  gsap.set(landingText3.chars, { visibility: "visible", opacity: 0, y: 80 });
  gsap.set(landingText5.chars, { visibility: "visible", opacity: 0, y: 80 });

  // Reveal primary swap-text (2nd h2 — char-by-char)
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Reveal primary swap-text (1st h2 — wrapper fade)
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  // Release the `main-active` gate (main starts at opacity: 0 in index.css).
  // The old version faded ".header" / ".icons-section" / ".nav-fade" —
  // selectors that no longer exist in the JSX (they produced GSAP
  // "target not found" warnings every load). The nav is always-visible
  // markup now, so a timed gate release is all that's needed.
  gsap.delayedCall(1.3, () => {
    document.getElementsByTagName("main")[0]?.classList.remove("main-active");
  });

  /* ---------- Start the word-swap loops ---------- */
  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

/**
 * Smooth infinite swap between two sets of SplitText chars.
 *
 *   - The "incoming" word is positioned below (y: +80) at opacity 0, then
 *     slides up and fades in.
 *   - The "outgoing" word slides up and fades out (to y: -80, opacity 0).
 *
 * `.set` before each swap repositions the incoming chars to y: +80 (they may
 * be at y: -80 from the previous swap). Because opacity is 0 during the
 * reposition, the jump is invisible (and `.split-h2`'s `overflow: hidden`
 * clips it regardless). This eliminates the "cutting / floating" artefact.
 */
function LoopText(Text1: SplitText, Text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const duration = 1.2;
  const ease = "power3.inOut";
  const stagger = 0.1;
  const startDelay = 3;   // wait before first swap
  const hold = 3;         // hold between swaps

  const pos1 = startDelay;
  const pos2 = startDelay + duration + hold;

  // Swap 1 — Text2 (secondary) enters from below; Text1 (primary) exits upward
  tl.set(Text2.chars, { visibility: "visible", y: 80, opacity: 0 }, pos1)
    .to(Text2.chars, { y: 0, opacity: 1, duration, ease, stagger }, pos1)
    .to(Text1.chars, { y: -80, opacity: 0, duration, ease, stagger }, pos1);

  // Swap 2 — Text1 enters from below; Text2 exits upward
  tl.set(Text1.chars, { y: 80, opacity: 0 }, pos2)
    .to(Text1.chars, { y: 0, opacity: 1, duration, ease, stagger }, pos2)
    .to(Text2.chars, { y: -80, opacity: 0, duration, ease, stagger }, pos2);
}
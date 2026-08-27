import { ArrowUpRight, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ConfidenceDot } from "@/components/linkedin/shared";
import { LINKEDIN_PROFILE_URL, profile } from "@/data/linkedin";

/**
 * Follow CTA — the only numbers shown are the confirmed follower figure
 * (labelled as an indexed snapshot) and the connection display cap.
 */
export function FollowCta() {
  const followers = profile.followers?.value;
  const connections = profile.connections;

  return (
    <section id="follow" className="section-band">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="overline-label justify-center">Building in public</p>
            <h2 className="type-h2 mt-6 text-[var(--text)]">
              Follow the work <span className="text-gradient">on LinkedIn</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[length:var(--font-body-lg)] leading-relaxed text-[var(--text-muted)]">
              The archived posts above are the public surface of an ongoing build-in-public
              practice — shipping, debugging and documenting in the open.
            </p>

            {(followers !== undefined || connections) && (
              <div className="mx-auto mt-10 flex max-w-lg flex-col gap-4">
                {(followers !== undefined || connections) && (
                  <div className="mx-auto flex items-center justify-center gap-8 text-left">
                    {followers !== undefined && (
                      <div>
                        <p className="stat-value">{followers.toLocaleString("en-US")}</p>
                        <p className="stat-label">Followers</p>
                      </div>
                    )}
                    {connections && (
                      <div>
                        <p className="stat-value">{connections.display}</p>
                        <p className="stat-label">Connections</p>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-center font-mono-tag text-[11px] text-[var(--text-faint)]">
                  <ConfidenceDot confidence={profile.followers?.source.confidence ?? "publicly_discovered"} label="Follower count is an indexed snapshot — may be stale" />
                </p>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <MagneticButton as="a" href={LINKEDIN_PROFILE_URL} size="lg">
                <Users className="h-4 w-4" aria-hidden="true" /> Follow on LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
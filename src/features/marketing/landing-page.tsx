import { MarketingShell } from "./marketing-shell";
import { AgentFirstHero } from "./agent-first-landing";
import { SearchContrast } from "./search-contrast";
import { MatchDeepDive } from "./match-deep-dive";
import { WaslaFinal } from "./stage-four";
import { ApplicationPackShowcase } from "./application-pack-showcase";
export function LandingPage() {
  return <MarketingShell home><AgentFirstHero /><div className="wa-home-discovery"><SearchContrast /><MatchDeepDive /></div><ApplicationPackShowcase /><WaslaFinal /></MarketingShell>;
}

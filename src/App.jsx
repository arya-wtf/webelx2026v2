import Marquee from './components/Marquee.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

import Hero from './sections/01_Hero.jsx'
import TrustStrip from './sections/02_TrustStrip.jsx'
import PortfolioHighlight from './sections/03_PortfolioHighlight.jsx'
import HowAINativeSolvesIt from './sections/04_HowAINativeSolvesIt.jsx'
import ProblemSolution from './sections/05_ProblemSolution.jsx'
import Numbers from './sections/06_Numbers.jsx'
import ServicesByStage from './sections/07_ServicesByStage.jsx'
import Industries from './sections/08_Industries.jsx'
import HowWeWork from './sections/09_HowWeWork.jsx'
import HowWeWorkV2 from './sections/12_HowWeWorkV2.jsx'
import Testimonials from './sections/10_Testimonials.jsx'
import WhoWereNotFor from './sections/11_WhoWereNotFor.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Marquee />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <PortfolioHighlight />
        <HowAINativeSolvesIt />
        <ProblemSolution />
        <Numbers />
        <ServicesByStage />
        <Industries />
        {/* <HowWeWork /> */}
        <HowWeWorkV2 />
        <Testimonials />
        <WhoWereNotFor />
      </main>
      <Footer />
    </div>
  )
}

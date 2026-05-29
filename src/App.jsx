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
import StillReading from './sections/13_StillReading.jsx'

export default function App() {
  return (
    <div className="min-h-screen text-ink overflow-x-hidden">
      
      {/* Layer 1: Background (Fixed Footer) */}
      <div className="fixed bottom-0 left-0 w-full z-0">
        <Footer />
      </div>

      {/* Layer 2: Foreground (Main Content) */}
      <div className="relative z-10 w-full min-w-0">
        
        {/* Solid background covering the footer */}
        <div className="bg-cream">
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
            <HowWeWorkV2 />
            <Testimonials />
            <WhoWereNotFor />
            <StillReading />
          </main>
        </div>

        {/* 
          Transparent Spacer: Exactly the height of the Footer. 
          When scrolled into view, it reveals the fixed footer in Layer 1 behind it.
          We use bg-transparent here so we can see through to the fixed footer.
        */}
        <div className="opacity-0 pointer-events-none w-full" aria-hidden="true">
          <Footer />
        </div>

      </div>
    </div>
  )
}

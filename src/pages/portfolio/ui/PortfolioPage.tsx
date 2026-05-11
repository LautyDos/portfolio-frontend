import { DesktopBackground } from "@/shared/ui/desktop-background/DesktopBackground"
import { PresentationSection } from "@/widgets/presentation/ui/PresentationSection"

export default function PortfolioPage() {
  return (
    <DesktopBackground>
      <main className="max-w-7xl mx-auto px-8 py-12 flex flex-col gap-6">
        <PresentationSection />
      </main>
    </DesktopBackground>
  )
}

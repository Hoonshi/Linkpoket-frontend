import { Footer } from '@/widgets/footer/Footer';
import { FooterLanding } from '@/widgets/footer/FooterLanding';
import { Header } from '@/widgets/header/Header';

export default function TEST() {
  return (
    <div>
      <Header isLoggedIn={false} hasSidebar={false} showDepth={true} />
      <Footer />
      <FooterLanding />
    </div>
  );
}

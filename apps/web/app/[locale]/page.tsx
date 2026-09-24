import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WhySection from '@/components/sections/WhySection';
import HybridLearningSection from '@/components/sections/HybridLearningSection';
import CoursesSection from '@/components/sections/CoursesSection';
import ActivitiesSection from '@/components/sections/ActivitiesSection';
import TeamSection from '@/components/sections/TeamSection';
import MentorsSection from '@/components/sections/MentorsSection';
import StudentsSection from '@/components/sections/StudentsSection';
import GrantSection from '@/components/sections/GrantSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import LaptopsSection from '@/components/sections/LaptopsSection';
import ContactsSection from '@/components/sections/ContactsSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhySection />
      <HybridLearningSection />
      <CoursesSection />
      <ActivitiesSection />
      <TeamSection />
      <MentorsSection />
      <StudentsSection />
      <GrantSection />
      <ReviewsSection />
      <LaptopsSection />
      <ContactsSection />
      <Footer />
    </main>
  );
}

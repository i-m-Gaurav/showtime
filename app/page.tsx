
// import AllShows from "@/components/AllShows";
// import Link from 'next/link';
// import {Button} from '@/components/ui/button'
import BannerCarousel from '@/components/BannerCarousel';
import FeaturedShows from '@/components/FeaturedShows';
import ComedyShows from '@/components/ComedyShows';
import PoetryShows from '@/components/PoetryShows';
import ListYourShow from '@/components/ListYourShow';
import MoviesComingSoon from '@/components/MoviesComingSoon';
import Footer from '@/components/Footer';
export default function Home() {

  return (
    <div className='flex flex-col items-center mt-10'>

      <FeaturedShows/>
      <BannerCarousel/>
      <ComedyShows/>
      <PoetryShows/>
      <ListYourShow/>
      <MoviesComingSoon/>
      <Footer/>
    
      
    </div>
  );
}



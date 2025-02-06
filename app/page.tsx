
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

  const bannerImages = [
    'https://static.vecteezy.com/system/resources/previews/017/351/717/non_2x/awesome-show-banner-sign-for-festival-events-design-circus-style-vintage-style-illuminated-light-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/017/351/717/non_2x/awesome-show-banner-sign-for-festival-events-design-circus-style-vintage-style-illuminated-light-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/017/351/717/non_2x/awesome-show-banner-sign-for-festival-events-design-circus-style-vintage-style-illuminated-light-vector.jpg',
  ];

  return (
    <div className='flex flex-col items-center mt-10'>

      <FeaturedShows/>
      <BannerCarousel images={bannerImages}/>
      <ComedyShows/>
      <PoetryShows/>
      <ListYourShow/>
      <MoviesComingSoon/>
      <Footer/>
    
      
    </div>
  );
}



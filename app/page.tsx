
// import AllShows from "@/components/AllShows";
import Link from 'next/link';
import {Button} from '@/components/ui/button'
export default function Home() {
  return (
    <div className='flex justify-center text-center items-center mt-10'>
      {/* <AllShows/> */}
      <Button className='bg-red-500 hover:bg-red-600'>
         <Link href = '/shows'>Browse shows</Link>
      </Button>
      
    </div>
  );
}



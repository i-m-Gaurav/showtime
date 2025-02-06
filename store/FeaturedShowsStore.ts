import { create } from "zustand";
import axios from 'axios'

interface Show {
    id : number;
    name : string;
    date : string;
    location : string;
    imageUrl : string;
}

interface FeaturedShowState {
    shows : Show[];
    isLoading : boolean;
    fetchShows : () => Promise<void>;
 
}



const useFeaturedShowsStore = create<FeaturedShowState>((set) => ({

    shows : [],
    isLoading : true,
    fetchShows : async () => {
        try {
            const response = await axios.get('/api/shows/')
            set({shows : response.data.data, isLoading : false}) 
        } catch (error) {
            console.error("Error fetching shwos", error);
            set({isLoading : false});
            
        }
    }





}));

export default useFeaturedShowsStore;

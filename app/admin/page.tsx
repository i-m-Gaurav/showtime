import {isAdmin} from "@/lib/authUtils";
import {redirect} from "next/navigation";

export default async function AdminPage() {
    const isUserAdmin = await isAdmin();

    if(!isUserAdmin){
        redirect("/");
    }

    return(
        <>
            <h1>Admin Page</h1>
            <p>Admins can do anything they want!</p>    
        </>
    )
}
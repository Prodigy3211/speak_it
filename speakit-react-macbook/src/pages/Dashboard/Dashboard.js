//This component should be a list of trending arguments and argument categories.


import TopNavigation from "../../components/TopNavigation";
import { categoryImages } from "./ImageData";

function Dashboard () {
    let category = categoryImages
    return(
        <>
        <TopNavigation />
        <img src={category[1].url} alt={category[1].alt} />
        </>
    )
}

export default Dashboard;
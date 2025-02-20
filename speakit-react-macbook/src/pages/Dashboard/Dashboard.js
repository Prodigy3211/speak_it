//This component should be a list of trending arguments and argument categories.


import { categoryImages } from "./ImageData";

function Dashboard () {
    let category = categoryImages
    return(
        <>
        <img src={category[1].url} alt={category[1].alt} />
        </>
    )
}

export default Dashboard;
//This component should be a list of trending arguments and argument categories.


import TopNavigation from "../../components/TopNavigation";
import Categories from "../../components/Categories/Categories";
import Trending from "../../components/Trending/Trending";


function Dashboard () {

    

    return(
        <>
        <TopNavigation />
        <p className="text-center text-md mt-2">Lurk in the trends or create your own Hot Take.</p>
        <Trending />
        <Categories />
        </>
    )
}

export default Dashboard;
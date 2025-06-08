//This component should be a list of trending arguments and argument categories.


import TopNavigation from "../../components/TopNavigation";
import Categories from "../../components/Categories/Categories";
import Trending from "../../components/Trending/Trending";
import BottomNavigation from "../../components/BottomNavigation";

function Dashboard () {
    return(
        <>
        <div className="p-4 pb-20">
            <TopNavigation />
            <p className="text-center text-md my-2 bg-blue-900 text-white rounded-md p-2 text-lg border-b-2 border-gray-300">"I went straight to the comment section and didn't regret it" - Ancient American Proverb</p>
            <div className="flex flex-col h-full overflow-y-auto">
            <Trending />
            <Categories />
            </div>
        </div>
        <BottomNavigation />
        </>
    )
}

export default Dashboard;
import '../App.css';
import '../components/navigation';

function Pmw () {
    return(
        <div className="categoryHomepageContainer">
            <div className="headerContainer">
                <h1>Welcome to Prove Me Wrong</h1>
                <a>Politics</a>
                <a>Entertainment</a>
                <a>Philosophy</a>
                <a>Relationships</a>
                <a>War</a>
                <a>Back Home</a>

                
            </div>
            <div className="bodyContainer">
                <div className="popularThreads">
                <a>Lot's Wife was right the whole time</a>
                <a>A burrito is just a sandwich</a>
                <a>Toddlers should know better</a>
                <a>Stealing isn't a crime</a>
                <a>You don't have to wash your meat before cooking</a>
                    
                </div>
                <div className="allThreads">
                <a>Shoe heads are insane</a>
                <a>Macbooks do not get viruses</a>
                <a>Windows Phone was always superior to iPhone</a>
                <a>Lot's wife was right the whole time</a>
                <a>A burrito is just a sandwich</a>
                <a>You don't have to wash your meat before cooking</a>
                <a>Stealing isn't a crime</a>
                <a>Toddlers should know better</a>

                </div>
            </div>
        </div>
    )
}

export default Pmw;
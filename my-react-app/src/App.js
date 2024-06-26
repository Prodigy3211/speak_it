import './App.css';
import { Route, Routes } from 'react-router-dom';
import Pmw from './pages/Pmw';
import Politics from './pages/Politics';
import Philosophy from './pages/Philosophy';
import Relationships from './pages/Relationships';
import War from './pages/War';
import Entertainment from './pages/Entertainment';
import GetNavigation from './components/navigation';

function App() {
  return (
    <div className="fullPage">
      <div className="homepage-container">
        
    <div className="login-container">
            <div className="login-links"><a href="login.html">Login to my account</a>
            <a href="signup.html">Create New Account</a>
            <a href="my-profile.html">My Profile</a>
            </div>
    </div>
    <div className='getNavigation'>
    
      <Routes>
          <Route path = "/" element = {<GetNavigation />}>
          <Route exact path = "/pmw" element={<Pmw />} />
          <Route exact path = "/philosophy" element={<Philosophy />} />
          <Route exact path = "/relationships" element={<Relationships />} />
          <Route exact path = "/politics" element={<Politics />} />
          <Route exact path = "/war" element={<War />} />
          <Route exact path = "/entertainment" element={<Entertainment />} />
          </Route>
      </Routes>
    
  

    </div>
   
        <h1>Speak Now Or Forever Hold Your Peace</h1>
       {/* Flexbox for static links on each page */}
        <div className="linktree"><p>Categories:</p>
        <a href="category/pmw/pmw.html">Prove Me Wrong</a>
        <a href="category/philosophy/philosophy.html">Philosophy</a>
        <a href="category/politics/politics.html">Politics</a>
        <a href="category/entertainment/entertainment.html">Entertainment</a>
        <a href="category/relationships/relationships.html">Relationships</a>
        <a href="category/war/war.html">War</a>
        </div>
        {/* Login/MyProfile Section */}
        
        <div className="welcome-message">
            <p>Welcome to Speak-it. A website dedicated to arguing with people on the internet. Create a profile, find your favorite argument and vote for the posts that make the most sense!</p>
        </div>
        {/* flex box section */}
        <h1>Categories</h1>
        <div className="flex-container">
            <div className="list"><p>Welcome to the first day of the rest of your life.</p>
                <ol>           
                <div className="One"> <li>Read the Rules</li></div>
                <div className="Two"> <li>Don't be cruel</li></div>
                <div className="Three"> <li>Lurk At Your Own Risk</li></div>
                </ol></div>
        <div className="image-container">
            <div className="images"><a href="pmw-home.html"><img src="images/provemewrong.jpg" alt="Prove-Me-Wrong"/><p >Prove Me Wrong</p></a></div>
            <div className="images"><a href="philosophy-home.html"><img src="images/Douglass.jpg" alt="Philosophy"/><p>Philosophy</p></a></div>
            <div className="images"><a href="entertainment-home.html"><img src="images/kwestTswift.JPG" alt="Entertainment"/><p>Entertainment</p></a></div>
            <div className="images"><a href="relationships-home.html"><img src="images/relationships.JPG" alt="Relationships"/><p>Relationships</p></a></div>
            <div className="images"> <a href="war-home.html"><img src="images/war.JPG" alt="War"/><p>War</p></a></div>
            <div className="images"><a href="philosophy-home.html"><img src="images/ehmsX.jpg" alt="Politics"/><p>Politics</p></a></div>
        </div>

        <div className="trending-threads">
            <h2>Trending Arguments</h2>
            <p>Burritos Are Just sandwichs</p>
            <p>Lot's Wife Made The Right Decision</p>

        </div>
        </div>
        {/*  footer section */}
        <div className="footer"> <h1>Speak it</h1></div>
      </div>
    </div>
  );
}

export default App;

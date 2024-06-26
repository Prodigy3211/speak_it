import '../../src/App.css'
import { Outlet,Link } from 'react-router-dom';

function GetNavigation() {
    return(
                <><div className='navContainer'>
                
                 <nav>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to= "/pmw">Prove Me Wrong</Link>
                    </li>
                    <li>
                        <Link to= "/relationships">Relationships</Link>
                    </li>
                    <li>
                    <Link to="/politics">Politics</Link>
                    </li>  
                    <li>
                    <Link to="/war">War</Link>
                    </li>
                    <li>
                    <Link to="/philosophy">Philosophy</Link>
                    </li>
                    <li>
                    <Link to="/entertainment">Entertainment</Link>
                    </li>
                </ul>
                </nav>
                
                <Outlet />
            
            </div>
        </>
    )
}

export default GetNavigation; 
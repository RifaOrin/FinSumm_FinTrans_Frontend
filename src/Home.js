import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            Welcome Home
            <p><Link to="/engSummary">English Summary</Link></p>
            <p><Link to="/banglaSummary">Bangla Summary</Link></p>
            <p><Link to="/e2bTranslation">English To Bangla Translation</Link></p>
            <p><Link to="/b2eTranslation">Bangla to English Translation</Link></p>
        </div>
    );
}
export default Home;
import { Link } from "react-router-dom";
import Finance from "./images/pexels.jpg"

function Home(){
    return(
        <body className="bg-gray-50 min-h-screen px-24">
        <div className="flex items-center justify-between pt-10 ">
        <h1 className="text-xl font-small text-gray-500">FinBriefs</h1>
            
        </div>
        <div className="flex pt-40 items-center justify-between px-40">
            <div className="w-3/5 relative pr-32">
                <h1 className="text-8xl font-medium text-gradient1">Fin<span className="text-8xl text-gradient2 font-medium">Briefs</span></h1>
                <p className="text-2xl text-black font-medium pt-3">Summarize and Translate Financial News Effortlessly</p>
                <p className="text-lg text-gray-500 font-normal pt-7">Bridging the gap in financial news with summaries and translations</p>
                <Link to="/all">
                <button className="bg-[#c417c4] hover:bg-[#a116a1] rounded-full mt-10 px-5 py-3 text-white text-xl font-medium">Get Started</button>
                </Link>
            </div>
            <img src={Finance} className="h-80 w-3/5 rounded-lg shadow-lg"/>
        </div>
        </body>
    );
}
export default Home;
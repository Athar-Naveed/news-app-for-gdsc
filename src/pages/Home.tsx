import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Marquee from "react-fast-marquee";
interface Article{
    title:string;
    slug_name:string;
    top_image:string;
    abstract:string
}
const Home = () => {
    const [articles,setArticles] = useState<Article[]>([]);
    
const api = import.meta.env.VITE_NYT_API_KEY;
const url = `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=${api}`
useEffect(()=>{
    const fetchData = async() =>{
            const response = await axios.get(url,{
                params:{
                    limit:10
                }
            });
            // const data = response.data.map((resp)=>resp.data);
            console.log(response.data.results);
            setArticles(response.data.results);
    }
fetchData();
},[])
console.log(articles)
    return (
        <>
      <div className="text-white">
        <h1 className="text-2xl font-semibold my-5 text-center">NEWS Updates</h1>
      </div>
      <Marquee className="bg-blue-700">
        {articles.map((article)=>(
            <span className="text-white">{article.abstract}; </span>
        ))}
      </Marquee>
      <div className="m-5 grid grid-cols-2 lg:grid-cols-4">
        {articles.map((article)=>(            
            <div key={article.title} className="max-w-sm w-full lg:max-w-full lg:flex">
                <Link to={`details/${article.slug_name}`}>
  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: article.top_image}} title={article.title}>
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
      <div className="text-gray-900 font-bold text-xl mb-2">{article.title.substring(0,30)}...</div>
      <p className="text-gray-700 text-base">{article.abstract.substring(0,50)}...</p>
    </div>
  </div>
        </Link>
</div>
))}
      </div>
      <Footer />
        </>
    );
};

export default Home;

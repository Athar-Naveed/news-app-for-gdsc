import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Marquee from "react-fast-marquee";
interface Article{
    title:string;
    slug_name:string;
    section:string;
    abstract:string;
}
const Details = () =>{
    const param = useParams();
    const [articles,setArticles] = useState<Article[]>([]);
    const api = import.meta.env.VITE_NYT_API_KEY;
const url = `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=${api}`
useEffect(()=>{
    const fetchData = async() =>{
            const response = await axios.get(url);
            setArticles(response.data.results.filter((resp:Article)=> resp.slug_name == param.newsURI));
    }
    fetchData();
},[])
    console.log(articles);
    return (
        <>
        <Link to={'/'} className="text-blue-500">Go back to home page</Link>
        <Marquee className="bg-blue-700">
        {articles.map((article)=>(
            <span className="text-white">{article.abstract}; </span>
        ))}
      </Marquee>
        <div className="m-5">

        {articles.map((article)=>(
            <>
            <div key={article.slug_name}>
            <h1 className="text-white text-2xl">{article.title}</h1>
            <br />
            <span className="text-white text-xl">{article.abstract}</span>
        </div>
        <div>
            <h1 className="text-slate-400">This Article is from section: {article.section}</h1>
        </div>
        </>
            ))}
            </div>
            <Footer />
        </>
    )
}
export default Details;
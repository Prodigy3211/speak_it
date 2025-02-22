import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../server/supabaseClient";


const ThreadList = () =>{
    const { categoryName } = useParams(); //get category from the URL

    //example threads Should replace with Supabase API calls
    const threads = [
        {id: "123", title: "First Debate"},
        {id: "456", title:"Another ONE!"}
    ];

    return (
        <div>
            {/* pull in category name */}
            <h1>Threads in {categoryName}</h1>
            <ul>
                {/* Map out the threads from the API call sorting by thread.id */}
                {threads.map(thread => (
                    <li key={thread.id}>
                        {/* Link to the Dynamic Route */}
                        <Link to = {`/category/${categoryName}/thread/${thread.id}`}> 
                            {thread.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThreadList;

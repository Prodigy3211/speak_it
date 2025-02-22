import { useParams } from "react-router-dom";

const Thread = () => {
    const { categoryName, threadId} = useParams(); //Get Thread ID from URL

    return (
        <div>
            <h1>Thread {threadId} in {categoryName}</h1>
            <p>Discussion content goes here...</p>
        </div>
    );
};

export default Thread;
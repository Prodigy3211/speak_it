import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../server/supabaseClient";

const Trending = () => {
    const [trendingClaims, setTrendingClaims] = useState([]);

    useEffect(() => {
        const fetchTrendingClaims = async () => {
            // Fetch all claims
            const { data: claims, error: claimsError } = await supabase
                .from('claims')
                .select('*');

            if (claimsError) {
                console.error('Error fetching claims:', claimsError);
                return;
            }

            // Fetch all comments
            const { data: comments, error: commentsError } = await supabase
                .from('comments')
                .select('*');

            if (commentsError) {
                console.error('Error fetching comments:', commentsError);
                return;
            }

            // Count comments per claim and separate by affirmative/negative
            const claimCommentCounts = comments.reduce((acc, comment) => {
                if (!acc[comment.claim_id]) {
                    acc[comment.claim_id] = {
                        total: 0,
                        affirmative: 0,
                        negative: 0
                    };
                }
                acc[comment.claim_id].total += 1;
                if (comment.affirmative) {
                    acc[comment.claim_id].affirmative += 1;
                } else {
                    acc[comment.claim_id].negative += 1;
                }
                return acc;
            }, {});

            // Combine claims with their comment counts and sort
            const claimsWithCommentCounts = claims.map(claim => ({
                ...claim,
                commentCount: claimCommentCounts[claim.id]?.total || 0,
                affirmativeCount: claimCommentCounts[claim.id]?.affirmative || 0,
                negativeCount: claimCommentCounts[claim.id]?.negative || 0
            }));

            // Sort by comment count and take top 3
            const topClaims = claimsWithCommentCounts
                .sort((a, b) => b.commentCount - a.commentCount)
                .slice(0, 3);

            setTrendingClaims(topClaims);
        };

        fetchTrendingClaims();
    }, []);

    return (
        <div className="border-2 border-gray-300 rounded-lg p-4 mt-4">
            <h1 className="text-2xl font-bold mb-4 text-white">The Hottest Takes🔥🔥</h1>
            <div className="flex justify-center mb-2 text-white"> Click on a claim below or select a category to Join the Conversation:</div>
            <div className="space-y-4">
                {trendingClaims.map((claim) => (
                    <div key={claim.id} className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-600 text-white">
                        <Link to={`/category/${claim.category}/thread/${claim.id}`}>
                            <h2 className="text-xl font-semibold">{claim.title}</h2>
                            <div className="flex my-2">
                            <span>Category: {claim.category}</span>
                            </div>
                            <div className="flex justify-end mb-2"> ➡️ </div>
                            <div className="flex items-center text-md text-white">
                                <div className="flex flex-col border-2 border-gray-500 rounded-lg p-2 justify-between w-full">
                                <div><span> Total Comments: {claim.commentCount}</span></div>
                                    <div className="flex flex-row justify-around mt-2">
                                        <div><span>🙌 For: {claim.affirmativeCount}</span></div>
                                        <div><span>🫠 Against: {claim.negativeCount}</span></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending;
import supabase from "../utils/supabase";

const VotesController = {
    getAllVotes: async (req, res) => {
        const { data, error } = await supabase.from("votes").select("*");
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(data);
    },

    getCommentVotes: async (req, res) => {
        try {
            const { commentId } = req.params;

            const { data, error } = await supabase
                .from('votes')
                .select('*')
                .eq('comment_id', commentId)
                .in('vote_type', ['upvote', 'downvote']);

            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getUserRecievedVotes: async (req, res) => {
        try {
            const { userId } = req.params;
            const {data: usercomments, error: commentsError} = await supabase
                .from('comments')
                .select('*')
                .eq('user_id', userId);

            if (commentsError) {
                return res.status(500).json({ error: commentsError.message });
        }
        
        const {data: upvotes, error: upvoteError} = await supabase
            .from('votes')
            .select('*', {count: 'exact'})
            .eq('comment_id', userComments.map( comment => comment.id))
            .eq('vote_type', 'upvote');
        const {data: downvotes, error: downvoteError} = await supabase
            .from('votes')
            .select('*', {count: 'exact'})
            .eq('comment_id', userComments.map( comment => comment.id))
            .eq('vote_type', 'downvote');
            
        if (upvoteError || downvoteError) {
            return res.status(500).json({ error: upvoteError || downvoteError.message });
        }
        return res.status(200).json({
            upvotes: upvotes?.length || 0,
            downvotes: downvotes?.length || 0,
        });
    }catch(error) {
        return res.status(500).json({ error: error.message });
    }
},


    getCommentVoteCounts: async (req, res) => {
        try {
            const { commentId } = req.params;

            const { data, error } = await supabase
                .from('votes')
                .select('vote_type')
                .eq('comment_id', commentId)
                .in('vote_type', ['upvote', 'downvote'])
                .count(); //Count all rows

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            //Get counts for upvotes and downvotes
            const {data: upvotes, error:upError} = await supabase
                .from('votes')
                .select('*', {count: 'exact'})
                .eq('comment_id', commentId)
                .eq('vote_type', 'upvote');
            const {data: downvotes, error:downError} = await supabase
                .from('votes')
                .select('*', {count: 'exact'})
                .eq('comment_id', commentId)
                .eq('vote_type', 'downvote');

            if (upError || downError) {
                return res.status(500).json({ error: upError || downError.message });
            }

            return res.status(200).json({
                upvotes: upvotes?.length || 0,
                downvotes: downvotes?.length || 0,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

export default VotesController;
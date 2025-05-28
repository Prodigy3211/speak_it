import {useRef, useEffect} from 'react';
import CommentItem from './CommentItem';
import React from 'react';

const CommentThread = ({comments}) => {
    const commentRefs = useRef({});

    //create a ref for each comment
    useEffect(() => {
        comments.forEach(comment => {
            commentRefs.current[comment.id] = commentRefs.current[comment.id] || React.createRef();
        });
    }, [comments]);

    //Function to Scroll up to Parent Comment
    const scrollToParentComment = (parentId) => {
        if (commentRefs.current[parentId]) {
            commentRefs.current[parentId].current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    //Group Comments by the Parent ID in an Array

    const commentGroups = comments.reduce((acc, comment) => {
        const parentId = comment.parent_comment_id || 'root';
        if (!acc[parentId]) {
            acc[parentId] = [];
        }
        acc[parentId].push(comment);
        return acc;
    }, {});

// render comments recursively

const renderCommentGroup = (parentId, level = 0) => {
    const groupComments = commentGroups[parentId] || [];

    return groupComments.map(comment => (
        <div 
        key={comment.id}
        ref = {commentRefs.current[comment.id]}
        className="mb-2"
        >
        <CommentItem
        comment={comment}
        onParentClick={() => comment.parent_comment_id && scrollToParentComment(comment.parent_comment_id)}
        />
        {commentGroups[comment.id] && (
            <div className="ml-16">
            {renderCommentGroup(comment.id, level +1)}
            </div>
        )}
        </div>
    ));
};

    return (
        <div>
            {renderCommentGroup('root')}
        </div>
    );
};

export default CommentThread;
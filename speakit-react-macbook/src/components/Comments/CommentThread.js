import {useRef, useEffect, useState} from 'react';
import CommentItem from './CommentItem';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const CommentThread = ({comments, onCommentAdded}) => {
    const commentRefs = useRef({});
    const[expandedThreads, setExpandedThreads] = useState({});

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

    //Function to toggle the thread expansion
    const toggleThread = (comment_id) => {
        setExpandedThreads(prev => ({
            ...prev,
            [comment_id]: !prev[comment_id]
        }));
    };

    // render comments recursively
    const renderCommentGroup = (parentId, level = 0) => {
        const groupComments = commentGroups[parentId] || [];
        const isExpanded = expandedThreads[parentId] || false;
        const shouldCollapse = groupComments.length >= 1 && !isExpanded;

        const visibleComments = shouldCollapse ? groupComments.slice(0, 3) : groupComments;

    console.log('Parent ID:', parentId);
    console.log('Number of comments:', groupComments.length);
    console.log('Is expanded:', isExpanded);
    console.log('Should collapse:', shouldCollapse);

        return (
        <>
        {visibleComments.map(comment => (
            <div 
                key={comment.id}
                ref={commentRefs.current[comment.id]}
                className="mb-2"
            >
                <CommentItem
                    comment={comment}
                    onParentClick={() => comment.parent_comment_id && scrollToParentComment(comment.parent_comment_id)}
                    onCommentAdded={onCommentAdded}
                />
                {commentGroups[comment.id] && (
                    <div className="ml-16">
                        {renderCommentGroup(comment.id, level + 1)}
                    </div>
                )}
            </div>
        ))}
        {shouldCollapse && (
            <button
                onClick={() => toggleThread(parentId)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-gray-700 border-2 border-solid border-red-500 rounded-md p-1"
            >
                <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="mr-2" />
                {isExpanded ? 'Hide' : 'Show'} {groupComments.length - 1} replies
            </button>
        )}
        </>
    );
};

    return (
        <div>
            {renderCommentGroup('root')}
        </div>
    );
};


export default CommentThread;
import {useRef, useEffect, useState} from 'react';
import AnimatedCommentItem from './AnimatedCommentItem';
import CommentAnimationController from './CommentAnimationController';
import React from 'react';

const CommentThread = ({comments, onCommentAdded}) => {
    const commentRefs = useRef({});
    const [isAnimationMode, setIsAnimationMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [highlightedCommentId, setHighlightedCommentId] = useState(null);

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

    const handleCommentHighlight = (commentId) => {
        setHighlightedCommentId(commentId);
    };

    // render comments recursively
    const renderCommentGroup = (parentId, level = 0) => {
        const groupComments = commentGroups[parentId] || [];

        return groupComments.map(comment => (
            <div 
                key={comment.id}
                ref={commentRefs.current[comment.id]}
                className="mb-2"
            >
                {isAnimationMode && (
                    <AnimatedCommentItem
                        comment={comment}
                        onParentClick={() => comment.parent_comment_id && scrollToParentComment(comment.parent_comment_id)}
                        onCommentAdded={onCommentAdded}
                        isHighlighted={highlightedCommentId === comment.id}
                        isAnimating={isPlaying && highlightedCommentId === comment.id}
                        animationDelay={0}
                        onAnimationComplete={() => {
                            // Move to next comment after animation
                            setTimeout(() => {
                                setCurrentIndex(prev => prev + 1);
                            }, 500);
                        }}
                    />
                )}
            
                {commentGroups[comment.id] && (
                    <div className="ml-8">
                        {renderCommentGroup(comment.id, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div>
            {/* Animation Toggle Button */}
            <div className="mb-4">
                <button
                    onClick={() => setIsAnimationMode(!isAnimationMode)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        isAnimationMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                >
                    {isAnimationMode ? '📜 Court Mode' : '🎬 Enable Court Mode'}
                </button>
            </div>

            {/* Animation Controller */}
            {isAnimationMode && (
                <CommentAnimationController
                    comments={comments}
                    onCommentHighlight={handleCommentHighlight}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            )}

            {/* Comments */}
            <div className={isAnimationMode ? 'opacity-75' : ''}>
                {renderCommentGroup('root')}
            </div>
        </div>
    );
}

export default CommentThread;
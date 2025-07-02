import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const CommentAnimationController = ({ comments, onCommentHighlight, isPlaying, setIsPlaying, currentIndex, setCurrentIndex }) => {
    const [speed, setSpeed] = useState(1); // 0.5x, 1x, 1.5x, 2x
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    
    const intervalRef = useRef(null);
    
    // Filter comments to get a linear sequence (flatten the tree)
    const getLinearCommentSequence = useCallback((comments) => {
        const sequence = [];
        
        const addCommentToSequence = (comment, level = 0) => {
            sequence.push({ ...comment, level });
            // Add replies after the parent
            const replies = comments.filter(c => c.parent_comment_id === comment.id);
            replies.forEach(reply => addCommentToSequence(reply, level + 1));
        };
        
        // Start with root comments (no parent)
        const rootComments = comments.filter(c => !c.parent_comment_id);
        rootComments.forEach(comment => addCommentToSequence(comment));
        
        return sequence;
    }, []);
    
    const commentSequence = getLinearCommentSequence(comments);
    
    // Playback controls
    const startPlayback = useCallback(() => {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= commentSequence.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 3000 / speed); // 3 seconds per comment, adjusted for speed
    }, [setIsPlaying, setCurrentIndex, commentSequence.length, speed]);
    
    const pausePlayback = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [setIsPlaying]);
    
    const nextComment = () => {
        if (currentIndex < commentSequence.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    
    const previousComment = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    
    // Handle speed changes
    useEffect(() => {
        if (isPlaying) {
            pausePlayback();
            startPlayback();
        }
    }, [speed, isPlaying, pausePlayback, startPlayback]);
    
    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    
    // Highlight current comment
    useEffect(() => {
        if (commentSequence[currentIndex]) {
            onCommentHighlight(commentSequence[currentIndex].id);
        }
    }, [currentIndex, commentSequence, onCommentHighlight]);
    
    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Court Case Playback</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-sm">
                        {currentIndex + 1} / {commentSequence.length}
                    </span>
                </div>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                    onClick={previousComment}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faStepBackward} />
                </button>
                
                <button
                    onClick={isPlaying ? pausePlayback : startPlayback}
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                
                <button
                    onClick={nextComment}
                    disabled={currentIndex === commentSequence.length - 1}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faStepForward} />
                </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / commentSequence.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            {/* Settings */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                    <div>
                        <label className="mr-2">Speed:</label>
                        <select 
                            value={speed} 
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="bg-gray-700 rounded px-2 py-1"
                        >
                            <option value={0.5}>0.5x</option>
                            <option value={1}>1x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-1 rounded hover:bg-gray-700"
                        >
                            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            disabled={isMuted}
                            className="w-20"
                        />
                    </div>
                </div>
                
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={autoScroll}
                        onChange={(e) => setAutoScroll(e.target.checked)}
                        className="mr-2"
                    />
                    Auto-scroll
                </label>
            </div>
        </div>
    );
};

export default CommentAnimationController;
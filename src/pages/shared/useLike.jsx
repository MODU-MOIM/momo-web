import { useState } from "react";
import { communityAPI } from "../../api";

const useLike = (crewId, feedId, initialLiked = false, initialCount = 0, onSuccess = null) => {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleLike = async () => {
        if(loading) return;

        setLoading(true);
        setError(null);

        try {
            if(isLiked) {
                await communityAPI.unlikeCommunity(crewId, feedId);
                setIsLiked(false);
                setLikeCount(prev => Math.max(prev - 1));
            }else{
                await communityAPI.likeCommunity(crewId, feedId);
                setIsLiked(true);
                setLikeCount(prev => prev + 1);
            }

            if(onSuccess) {
                onSuccess(!isLiked, isLiked ? likeCount - 1 : likeCount + 1);
            }
        }catch(error){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    const updateLikeState = (liked, count) => {
        setIsLiked(liked);
        setLikeCount(count);
    }

    return {
        isLiked,
        likeCount,
        loading,
        error,
        toggleLike,
        updateLikeState,
    };
};

export default useLike;
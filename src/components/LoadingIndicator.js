import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { ThreeDots } from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker({delay: 4000});

    return promiseInProgress &&
        <div
            className="spinner"
        >
            <ThreeDots 
                color="#2BAD60" 
                height={150} 
                width={150}  />
        </div>
};

export default LoadingIndicator;
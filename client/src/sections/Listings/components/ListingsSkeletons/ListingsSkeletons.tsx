import React from 'react';
import {Alert, Skeleton, Divider} from 'antd';
import './styles/ListingsSkeleton.css'

interface Prop {
    title: string;
    error?: boolean;
}

export const ListingsSkeleton = ({title, error = false}: Prop) => {
    const errorAlert = error ? <Alert type="error"
                                      message={<>Oh no! Something went wrong - please try again later
                                          <span role="img" aria-label="Sad face emoji">😞</span></>}
                                      className="listing-skeleton__alert"
    /> : null
    return <div className="listings-skeleton">
        {errorAlert}
        <h2>{title}

            <Skeleton active paragraph={{rows: 1}}/>
            <Divider/>
            <Skeleton active paragraph={{rows: 1}}/>
            <Divider/>
            <Skeleton active paragraph={{rows: 1}}/>
        </h2>
    </div>
}
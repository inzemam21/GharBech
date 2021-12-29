import React from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {Listings as ListingsData} from './__generated__/Listings'
import {DeleteListing as DeleteListingsData, DeleteListingVariables} from './__generated__/DeleteListing'
const LISTINGS = gql`
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    rating
  }
}`;

const DELETE_LISTING = gql`
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
    id
    title
    image
    address
    price
    numOfBeds
    numOfBaths
    numOfGuests
    rating
  }
}`;

interface Props {
    title: string
}
export const Listings = ({ title }: Props) => {
    const {data, loading, error, refetch} = useQuery<ListingsData>(LISTINGS);
    const [deleteListing, {loading: deleteLoading, error: deleteError}] = useMutation<DeleteListingsData, DeleteListingVariables>(DELETE_LISTING);
    const listings = data?.listings ?? null;

    const handleDeleteListing = async (id: string) => {
        await deleteListing({ variables: { id } });
        refetch();
    }

    const listingsList = listings?.map(listing =>
        <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
        </li>
    )

    if (loading) {
        return <h2>loading...</h2>
    }
    if (error) {
        return <h2>Oh no! Something went wrong - please try again later <span role="img" aria-label="Sad face emoji">😞</span></h2>
    }
    const deleteListingLoadingMessage = deleteLoading ? <h4>Deletion in progress...</h4> : null;
    const deleteListingError = deleteError ? <h4>Oh no! Something went wrong - could not delete item <span role="img" aria-label="Sad face emoji">😞</span></h4> : null
    return <div>
        <h2>{title}</h2>
        {deleteListingLoadingMessage}
        <ul>
            {listingsList}
        </ul>
        {deleteListingError}
    </div>
}


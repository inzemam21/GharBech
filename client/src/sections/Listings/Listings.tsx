import React, { useState, useEffect } from 'react'
import {server} from '../../lib/api'
import {DeleteListingsData, DeleteListingsVariables,ListingsData, Listing} from "./types";

const LISTINGS = `query Listings {
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

const DELETE_LISTING = `mutation DeleteListing($id: ID!) {
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
    const [ listings, setListings ] = useState<Listing[] | null>(null);

    useEffect(( ) => {
        fetchListing()
            .catch(reason => console.error(`fetch listing failed: ${reason}`));
    }, [])
    const fetchListing = async () => {
        const {data} = await server.fetch<ListingsData>({ query: LISTINGS })
        console.log(data)
        setListings(data.listings);
    }
    const listingsList = listings?.map(listing =>
        <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
        </li>
    )
    return <div>
        <h2>{title}</h2>
        {listingsList}
    </div>
}

const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
        query: DELETE_LISTING,
        variables: {id}
    })
}
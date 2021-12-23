import {
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} from "graphql";
import { listings } from "./listings";

const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
        numOfBeds: { type: new GraphQLNonNull(GraphQLInt) },
        numOfBaths: { type: new GraphQLNonNull(GraphQLInt) },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
    },
});

const query =  new GraphQLObjectType({
    name: 'Query',
    fields: {
        listings: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
            resolve: () => listings,
        },
    }
})

const mutation =  new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteListing: {
            type: new GraphQLNonNull(Listing),
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: (_root, { id }) => {
                const index = listings.findIndex((x) => x.id === id);
                if (index >= 0) {
                    return listings.splice(index, 1)[0];
                }
                throw new Error("Could not be found.");
            },
        },
    }
})

export const schema = new GraphQLSchema({query,mutation})
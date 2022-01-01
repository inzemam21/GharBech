

export const viewerResolvers = {
    Query: {
        authUrl: () =>{
            return "auth url"
        }
    },
    Mutation: {
        logIn: () =>{
            return "logIn url"
        },
        logOut: () =>{
            return 'logOut url'
        }
    }
}
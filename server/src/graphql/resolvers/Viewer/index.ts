import {Viewer,Database,User} from '../../../lib/types'
import crypto from 'crypto'
import {Google} from "../../../lib/api";
import {LogInArgs} from '../Viewer/types'

const logInViaGoogle = async (
    code: string,
    token: string,
    db: Database
): Promise<User | undefined> => {
    const { user } = await Google.logIn(code);

    if (!user) {
        throw new Error("Google login error");
    }

    // Name/Photo/Email Lists
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList = user.photos && user.photos.length ? user.photos : null;
    const userEmailsList =
        user.emailAddresses && user.emailAddresses.length
            ? user.emailAddresses
            : null;

    // User Display Name
    const userName = userNamesList ? userNamesList[0].displayName : null;

    // User Id
    const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source
            ? userNamesList[0].metadata.source.id
            : null;

    // User Avatar
    const userAvatar =
        userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

    // User Email
    const userEmail =
        userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google login error");
    }

    const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                name: userName,
                avatar: userAvatar,
                contact: userEmail,
                token
            }
        },
        //{ returnDocument: false }
    )
    let viewer = updateRes.value;

    if (!viewer) {
        const insertResult = await db.users.insertOne({
            _id: userId,
            token,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            income: 0,
            bookings: [],
            listings: []
        });

        viewer = insertResult.insertedId;
    }

    return viewer;
};

export const viewerResolvers = {
    Query: {
        authUrl: (): string =>{
            try {
             return  Google.authUrl
            }catch(error) {
                 throw  new Error(`failed  to query google auth api${error}`)
            }

        }
    },
    Mutation: {
        logIn: async (_root: undefined, {input}: LogInArgs, {db} : {db: Database}) =>{
            try {
                const code = input ? input.code : null
               const token =  crypto.randomBytes(16).toString('hex')

                const viewer: User | undefined = code ? await logInViaGoogle(code,token,db) : undefined

                if(!viewer) {
                    return {didRequest: true}
                }

                return  {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                }
            }catch(error){
                throw new Error(`failed to log in ${error}`)
            }
        },
        logOut: () =>{
            return 'logOut url'
        }
    },
    Viewer: {
        id: (viewer: Viewer): string | undefined => { return viewer._id},
        hasWallet: (viewer: Viewer): string | undefined => { return viewer.walletId},
    }
}
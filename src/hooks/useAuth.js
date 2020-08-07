import credentials from '../data'

const useAuth = () => {
    const { ACCESS_TOKEN, CLIENT_SECRET } = credentials;

    // build code url
    const tokenRequest = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${CLIENT_SECRET}&access_token=${ACCESS_TOKEN}`;

    return tokenRequest;
}

export default useAuth;
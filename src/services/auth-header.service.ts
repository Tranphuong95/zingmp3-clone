export default function authHeader(){
    const profile=JSON.parse(localStorage?.getItem("profile")||"");
    if(profile && profile.accessToken){
        const accessToken:string=profile.token;
        // return {Authorization: "Bearer"+ profile.accessToken};
        // for Nodejs backend
        return { 'x-access-token': accessToken };
    }
    else{
        return;
    }
}
import { GoogleOAuthProvider, useGoogleLogin, TokenResponse } from "@react-oauth/google";

import { LoginType, login } from "../../networking/loginUtils";
import { GoogleIcon } from "./icons";
import LoginButton from "./LoginButton";

export default function GoogleLoginButton() {
    return (
        <GoogleOAuthProvider clientId="448055612869-kmdi2qlbrnv9150aati08vq8ll4fk4c7.apps.googleusercontent.com">
            <GoogleLoginButtonDisplay/>
        </GoogleOAuthProvider>
    );
}

function GoogleLoginButtonDisplay() {
    const openGoogleLogin = useGoogleLogin({
        onSuccess: (response: TokenResponse) => login(LoginType.GOOGLE, response.access_token)
    })

    return (
        <LoginButton icon={<GoogleIcon />} text="Continue with Google" onClick={openGoogleLogin} backgroundColor="#fff" textColor="#000"/>
    );
}
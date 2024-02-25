import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

enum LoginType {
    GOOGLE = "GOOGLE",
}

type loginFunction = (loginType: LoginType, authToken: string) => void;

type LoginButtonProps = {
    onSuccess: loginFunction
};

export default function Login() {
    const onSuccess: loginFunction = (loginType: LoginType, authToken: string) => {
        console.log(loginType, authToken);
    };

    return (
        <CustomGoogleLoginButton onSuccess={onSuccess}/>
    );
}

function CustomGoogleLoginButton(props: Readonly<LoginButtonProps>) {
    const { onSuccess } = props;

    return (
        <GoogleOAuthProvider clientId="448055612869-kmdi2qlbrnv9150aati08vq8ll4fk4c7.apps.googleusercontent.com">
            <GoogleLoginButtonDisplay onSuccess={onSuccess}/>
        </GoogleOAuthProvider>
    );
}

function GoogleLoginButtonDisplay(props: Readonly<LoginButtonProps>) {
    const { onSuccess } = props;
    
    const login = useGoogleLogin({
        onSuccess: (respones) => onSuccess(LoginType.GOOGLE, respones.access_token)
    });

    return (
        <GoogleLoginButton onClick={login}/>
    );
}
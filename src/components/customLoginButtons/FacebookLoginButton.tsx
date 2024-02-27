import LoginButton from "./LoginButton";
import { FacebookIcon } from "./icons";

export default function FacebookLoginButton() {
    return (
        <LoginButton icon={<FacebookIcon />} text="Continue with Facebook" onClick={() => {}} backgroundColor="#3b5998" textColor="#fff"/>
    );
}
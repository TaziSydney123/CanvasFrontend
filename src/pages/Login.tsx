import FacebookLoginButton from "../components/customLoginButtons/FacebookLoginButton";
import GoogleLoginButton from "../components/customLoginButtons/GoogleLoginButton";
import { IonPage, IonText } from "@ionic/react";

export default function Login() {
    return (
        <IonPage>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }} >
                <IonText>
                    <h3>Log in to your account</h3>
                </IonText>
                <div style={{width: 300, height: "min-content"}}>
                    <GoogleLoginButton />
                    <FacebookLoginButton />
                </div>
            </div>
        </IonPage>
    );
}
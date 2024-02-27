import { IonButton, IonText } from "@ionic/react";
import { ReactNode } from "react";
import Spacer from "../Spacer";

type LoginButtonDisplayProps = {
    icon: ReactNode,
    text: string,
    backgroundColor: string,
    textColor: string,
    onClick: () => void
};

export default function LoginButton(props: Readonly<LoginButtonDisplayProps>) {
    const { icon, text, onClick, backgroundColor, textColor } = props;

    const buttonStyle = {
        '--background': backgroundColor,
        '--background-hover': backgroundColor,
        '--background-activated': backgroundColor,
        '--border-color': 'var(--ion-border-color, #dcdcdc)',
        '--border-style': 'solid',
        '--border-width': '1px',
        'color': textColor
    };
    
    return (
        <IonButton onClick={() => onClick()} expand="block" style={buttonStyle}>
            <span style={{display: "flex", alignItems: "center", justifyContent: "left", width: "100%", textTransform: "none"}}>
                {icon}
                <Spacer size={1} />
                <IonText slot="end">
                    {text}
                </IonText>
            </span>
        </IonButton>
    );
}
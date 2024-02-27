import { IonAvatar, IonImg, IonItem, IonLabel } from "@ionic/react";
import Contact from "../../types/Contact";
import Spacer from "../Spacer";

type ContactItemProps = {
    contact: Contact
};

export default function ContactItem(props: ContactItemProps) {
    const { contact } = props;

    return (
        <IonItem>
            <IonAvatar style={{ margin: 10, height: "fit-content", width: "fit-content"}} slot="start" >
                <IonImg style={{width: 48, height: "auto"}} src={"https://ui-avatars.com/api/?name=" + contact.name} />
            </IonAvatar>
            <IonLabel>{contact.name}</IonLabel>
        </IonItem>
    );
}
import { IonContent, IonText, IonToolbar, IonHeader, IonList, IonIcon } from "@ionic/react";
import { ReactNode, useMemo } from "react";
import { searchOutline } from "ionicons/icons";
import Contact from "../../types/Contact";
import ContactItem from "./ContactItem";

export default function Contacts(): ReactNode {

    const contacts = useMemo<Contact[]>(() => getContacts(), []);

    const getContactItems = () => {
        return contacts.map((contact: Contact, index) => (
            <ContactItem contact={contact} key={index} />
        ));
    }

    return (
        <>
            <IonHeader collapse="condense" className=".ion-no-border">
                <IonToolbar >
                    <IonText slot="primary">Add</IonText>
                    <IonIcon slot="secondary" icon={searchOutline} size="large" />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {getContactItems()}
                </IonList>
            </IonContent>
        </>
    );
}

function getContacts1() {
    const contacts: Contact[] = [
        {name: "Bob", handle: "bob"},
        {name: "Frank", handle: "frank_was_taken"},
        {name: "Liam", handle: "liambreeeeeuh"},
        {name: "Lincoln", handle: "youngermax"},
        {name: "Ilan", handle: "isb271"},
    ];
    return contacts;
};

function getContacts() {
    return getContacts1().concat(getContacts1().concat(getContacts1().concat(getContacts1())));
};
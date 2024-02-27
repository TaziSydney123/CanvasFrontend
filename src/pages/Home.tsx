import { IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonText, IonToolbar } from '@ionic/react';
import { personCircleOutline, gridOutline } from "ionicons/icons";
import { useState } from 'react';
import Contacts from '../components/homeViews/Contacts';
import Canvases from '../components/homeViews/Canvases';

enum Tab {
  CONTACTS="Contacts",
  CANVASES="Canvases",
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.CONTACTS);

  const getPageContent = () => {
    switch (selectedTab) {
      case Tab.CONTACTS:
        return <Contacts />;
      case Tab.CANVASES:
        return <Canvases />;
    }
  }

  return (
    <IonPage style={{boxSizing: "border-box"}}>
      {getPageContent()}
      <IonFooter>
        <IonTabBar>
          {createTabButton(Tab.CONTACTS, personCircleOutline, setSelectedTab, selectedTab)}
          {createTabButton(Tab.CANVASES, gridOutline, setSelectedTab, selectedTab)}
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

function createTabButton(tab: Tab, icon: string, setSelectedTab: (tab: Tab) => void, selectedTab: Tab) {
  return (
    <IonTabButton tab={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
      <IonIcon icon={icon} />
      <IonLabel>{tab}</IonLabel>
    </IonTabButton>
  );
}
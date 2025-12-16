import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useState } from 'react';
import { UserInfo } from '../interfaces/UserInfo';
import './Tab3.css';
import { getUserInfo } from '../services/GithubService';

const Tab3: React.FC = () => {

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Usuario no encontrado",
    login: "no-username",
    bio: "No se encuentra usuario",
    avatar_url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
  });

  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo(response);
    }
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img alt="Silhouette of mountains" src={userInfo.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Tab3.css';
import { useState } from 'react';
import { getUserInfo } from '../services/GithubService';
import AuthService from '../services/AuthService';

const Tab3: React.FC = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    name: 'No se puede cargar el usuario',
    username: 'no-username',
    bio: 'Sin biografía disponible',
    avatar_url: 'https://ionicframework.com/docs/img/demos/card-media.png'  
  });

  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo({
        name: response.name,
        username: response.login,
        bio: response.bio || 'Sin biografía disponible',
        avatar_url: response.avatar_url || 'https://ionicframework.com/docs/img/demos/card-media.png'
      });
    }
  }

  const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  }, []);

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
              <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
          
          <IonButton 
            expand="block" 
            color="danger" 
            onClick={handleLogout}
            className="logout-button"
          >
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar Sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

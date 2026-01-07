import { useState } from 'react';

import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import AuthService from '../services/AuthService';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !token) {
      setError('Por favor, ingresa usuario y token de GitHub');
      return;
    }

    const success = AuthService.login(username, token);
    if (success) {
      // Forzar recarga completa para actualizar el estado de autenticación
      window.location.href = '/tab1';
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="login-container">
          <IonIcon icon={logoGithub} className="login-logo" />
          <h1>GitHub Client</h1>
          
          <form onSubmit={handleLogin} className="login-form">
            <IonInput
              className="login-field"
              label="Usuario de GitHub"
              labelPlacement="floating"
              fill="outline"
              type="text"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
              placeholder="tu-usuario"
              required
            />

            <IonInput
              className="login-field"
              label="Token de GitHub"
              labelPlacement="floating"
              fill="outline"
              type="password"
              value={token}
              onIonInput={(e) => setToken(e.detail.value!)}
              placeholder="ghp_xxxxxxxxxxxx"
              required
            />

            {error && (
              <IonText color="danger" className="error-message">
                <p>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" className="login-button">
              Iniciar Sesión
            </IonButton>

            <IonText color="medium" className="login-hint">
              <p>Ingresa tu usuario y Personal Access Token de GitHub</p>
            </IonText>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

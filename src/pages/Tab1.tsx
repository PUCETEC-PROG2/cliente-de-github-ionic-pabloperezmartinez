import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { IonList } from "@ionic/react";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { fetchRepositories } from "../services/GithubService";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
  };

  useIonViewDidEnter(() => {
    console.log("******* Leyendo repositorios ... *******");
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo = {repo}
            />
          ))}
        </IonList>

        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

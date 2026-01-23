import { IonSpinner } from "@ionic/react";

interface LoadingSpinnerProps {
  isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <IonSpinner name="crescent" style={{ width: "50px", height: "50px" }} />
    </div>
  );
};

export default LoadingSpinner;

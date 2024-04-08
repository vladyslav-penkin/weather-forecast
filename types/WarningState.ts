export interface WarningState {
  isOpen: boolean;
  title: string;
  buttonTitle: string;
  onSubmit: () => void;
}
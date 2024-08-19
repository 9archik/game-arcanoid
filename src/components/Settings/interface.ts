export interface ISettingsProps {
  onChangeSpeedMoveP1: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSpeedMoveP2: React.ChangeEventHandler<HTMLInputElement>;
  onChangeShotSpeedP1: React.ChangeEventHandler<HTMLInputElement>;
  onChangeShotSpeedP2: React.ChangeEventHandler<HTMLInputElement>;
  shotSpeedP1: number;
  shotSpeedP2: number;
  speedP1: number;
  speedP2: number;
}

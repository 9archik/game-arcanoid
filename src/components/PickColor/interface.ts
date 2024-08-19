export interface IPickColor {
  curColor: string;
  onChangeColor: React.ChangeEventHandler<HTMLInputElement>;
  closeClick: React.MouseEventHandler<HTMLButtonElement>;
}

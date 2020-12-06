interface ProsteDialogTipsType{
  icon: any,
  iconBg: any,
  cls: string,
}

interface ProsteDialogElementOptions{
  show: boolean,
  isShowBtnGroup: boolean,
  isShowCancelBtn: boolean,
  cancelContent: string,
  confirmContent: string,
  typeImgBg: any,
  typeImg: any,
  animationClass: string[],
  title: string,
  content: string,
  callback: (result: boolean) => void,
}

interface ProsteDialogInitOptions{
  theme?: string,
  color?: string,
}

interface ProsteDialogOptions{
  duration?: number,
  type: number,
  title?: string,
  content: string,
  confirmText?: string,
  showCancel?: boolean,
  cancelText?: string,
  callback?: (result?: boolean) => void,
}

type prosteDialog = (options: ProsteDialogOptions) => void;
type initProvide = (options?: ProsteDialogInitOptions) => void;
type useDialogFunction = () => prosteDialog;


export {
  ProsteDialogTipsType,
  ProsteDialogElementOptions, 
  ProsteDialogInitOptions,
  prosteDialog,
  initProvide,
  useDialogFunction,
  ProsteDialogOptions,
};
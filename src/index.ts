import { reactive, createApp, h, provide, inject} from 'vue';
import '../assets/index.css';
import infoIcon from '../assets/img/info.png';
import infoBg from '../assets/img/infoBg.png';
import successIcon from '../assets/img/success.png';
import successBg from '../assets/img/successBg.png';
import errorIcon from '../assets/img/error.png';
import errorBg from '../assets/img/errorBg.png';

import {
  ProsteDialogTipsType, 
  ProsteDialogElementOptions, 
  ProsteDialogInitOptions, 
  prosteDialog,
  initProvide,
  useDialogFunction,
} from './types/type_interface';

const prosteDialogPlugin = Symbol('prosteDialogPlugin');

/** 类型数据 */
const typeArr: ProsteDialogTipsType[] = [{
  icon: successIcon,
  iconBg: successBg,
  cls: 'flipInY',
},
{
  icon: infoIcon,
  iconBg: infoBg,
  cls: 'swoopInTop',
},
{
  icon: errorIcon,
  iconBg: errorBg,
  cls: 'jumpInRight',
}];
/** 相应参数 */
const state = reactive<ProsteDialogElementOptions>({
  isShowToast: false,
  isShowBtnGroup: false,
  isShowCancelBtn: false,
  cancelContent: '取消',
  confirmContent: '确定',
  typeImgBg: infoIcon,
  typeImg: infoBg,
  animationClass: ['vivify'],
  title: '我是标题',
  content: '我是内容',
  callback: function() {},
});
/** 按钮点击触发 */
const clickFunction = (e: MouseEvent) => {
  const { state: result } = (e.target as HTMLElement)?.dataset;
  state.isShowToast = false;
  state.callback(result === 'true');
};
/** 初始化参数 */
const initOptions = reactive<ProsteDialogInitOptions>({
  theme: '#e53935',
  color: 'white',
})
/** 初始化弹窗元素 */
let el = document.querySelector('#xyhToast');
if (!el) {
  const toastElement = createApp({
    render() {
      return h('div', { id: 'xyhToast', style: state.isShowToast ? '' : 'display: none' }, [
        h('div', { id: 'xyhToastInfo' }, [
          h('div', { id: 'iconBg', style: 'background-image: url(' + state.typeImgBg + ')' }, [
            h('img', { id: 'stateIcon', class: state.animationClass, src: state.typeImg }),
          ]),
          h('div', { id: 'xyhToastTitle' }, state.title),
          h('div', { id: 'xyhToastMsg' }, state.content),
          h('div', { id: 'xyhToastInfoBtnGroup', style: state.isShowBtnGroup ? '' : 'display: none;' }, [
            h('div', {
              id: 'xyhToastInfoBtnClose',
              class: 'btnGroupItems',
              'data-state': false,
              style: state.isShowCancelBtn ? '' : 'display: none',
              cancel: true,
              onClick: clickFunction,
            }, state.cancelContent),
            h('div', {
              id: 'xyhToastInfoBtn',
              class: 'btnGroupItems',
              'data-state': true,
              style: `background-color: ${initOptions.theme}; color: ${initOptions.color}`,
              onClick: clickFunction,
            }, state.confirmContent),
          ]),
        ]),
      ]);
    },
  });
  if(document.querySelector('#xyhDialogPlugin')){
    const loadingParent = document.createElement('div');
    loadingParent.id = 'xyhToastPlugin';
    document.body.appendChild(loadingParent);
    toastElement.mount('#xyhToastPlugin');
  }
}
el = null;
/** 展示对话框 */
const showDialog:prosteDialog = ({
  duration = 0,
  type = 0,
  title = '',
  content = '',
  confirmText = '确定',
  showCancel = false,
  cancelText = '取消',
  callback = function() {},
}) => {
  state.cancelContent = cancelText;
  state.confirmContent = confirmText;
  state.title = title;
  state.content = content;
  showCancel && (state.isShowCancelBtn = true);
  state.callback = callback;
  if (typeof type !== 'number' || type > 2) type = 0;
  const { icon, iconBg, cls } = typeArr[type];
  state.typeImgBg = iconBg;
  state.typeImg = icon;
  state.animationClass = ['vivify', cls];
  if (duration > 0) {
    state.isShowBtnGroup = false;
    state.isShowToast = true;
    setTimeout(() => {
      state.isShowToast = false;
    }, duration);
  } else {
    state.isShowBtnGroup = true;
    state.isShowToast = true;
  }
};

/** 抛出初始化方法 */
export const provideDialog: initProvide = (options) => {
  if(options){
    for(const key in options){
      initOptions[key] = options[key];
    }
  }

  provide(prosteDialogPlugin, showDialog);
}

/** 抛出继承方法 */

export const useDialog: useDialogFunction = () => {
  const dialogPlugin:prosteDialog | undefined  = inject(prosteDialogPlugin);

  if(!dialogPlugin){
    throw new Error('Please use the [provideDialog] function on the App.vue before using this function');
  }

  return dialogPlugin;
}
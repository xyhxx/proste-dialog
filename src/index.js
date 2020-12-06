import { reactive, createApp, h } from 'vue';
import './index.css';
import infoIcon from './img/info.png';
import infoBg from './img/infoBg.png';
import successIcon from './img/success.png';
import successBg from './img/successBg.png';
import errorIcon from './img/error.png';
import errorBg from './img/errorBg.png';

const typeArr = [{
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

const plugin = {
  install(app, options) {
    const state = reactive({
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

    const clickFunction = e => {
      const { state: result } = e.target.dataset;
      state.isShowToast = false;
      state.callback(result === 'true');
    };

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
                  style: `background-color: ${options.theme}; color: ${options.color}`,
                  onClick: clickFunction,
                }, state.confirmContent),
              ]),
            ]),
          ]);
        },
      });
      const loadingParent = document.createElement('div');
      loadingParent.id = 'xyhToastPlugin';
      document.body.appendChild(loadingParent);
      toastElement.mount('#xyhToastPlugin');
    }
    el = null;

    const showToast = ({
      duration = 0,
      type = 0,
      title = '',
      content = '',
      confirmText = '确定',
      showCancel = false,
      cancelText = '取消',
      callback = function() {},
    } = {}) => {
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

    app.provide('xyhToast', showToast);
  },
};

export default plugin;
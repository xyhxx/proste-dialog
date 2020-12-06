import { reactive, createApp, h, provide, inject } from 'vue';
import '../assets/index.css';
import infoIcon from '../assets/img/info.png';
import infoBg from '../assets/img/infoBg.png';
import successIcon from '../assets/img/success.png';
import successBg from '../assets/img/successBg.png';
import errorIcon from '../assets/img/error.png';
import errorBg from '../assets/img/errorBg.png';
var prosteDialogPlugin = Symbol('prosteDialogPlugin');
/** 类型数据 */
var typeArr = [{
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
var state = reactive({
    show: false,
    isShowBtnGroup: false,
    isShowCancelBtn: false,
    cancelContent: '取消',
    confirmContent: '确定',
    typeImgBg: infoIcon,
    typeImg: infoBg,
    animationClass: ['vivify'],
    title: '我是标题',
    content: '我是内容',
    callback: function () { },
});
/** 按钮点击触发 */
var clickFunction = function (e) {
    var _a;
    var result = ((_a = e.target) === null || _a === void 0 ? void 0 : _a.dataset).state;
    state.show = false;
    state.callback(result === 'true');
};
/** 初始化参数 */
var initOptions = reactive({
    theme: '#234173',
    color: 'white',
});
/** 初始化弹窗元素 */
var el = document.querySelector('#xyhToast');
if (!el) {
    var toastElement = createApp({
        render: function () {
            return h('div', { id: 'xyhToast', style: state.show ? '' : 'display: none' }, [
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
                            style: "background-color: " + initOptions.theme + "; color: " + initOptions.color,
                            onClick: clickFunction,
                        }, state.confirmContent),
                    ]),
                ]),
            ]);
        },
    });
    if (!document.querySelector('#xyhDialogPlugin')) {
        var loadingParent = document.createElement('div');
        loadingParent.id = 'xyhToastPlugin';
        document.body.appendChild(loadingParent);
        toastElement.mount('#xyhToastPlugin');
    }
}
el = null;
/** 展示对话框 */
var showDialog = function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 0 : _b, _c = _a.type, type = _c === void 0 ? 0 : _c, _d = _a.title, title = _d === void 0 ? '' : _d, _e = _a.content, content = _e === void 0 ? '' : _e, _f = _a.confirmText, confirmText = _f === void 0 ? '确定' : _f, _g = _a.showCancel, showCancel = _g === void 0 ? false : _g, _h = _a.cancelText, cancelText = _h === void 0 ? '取消' : _h, _j = _a.callback, callback = _j === void 0 ? function () { } : _j;
    state.cancelContent = cancelText;
    state.confirmContent = confirmText;
    state.title = title;
    state.content = content;
    showCancel && (state.isShowCancelBtn = true);
    state.callback = callback;
    if (typeof type !== 'number' || type > 2)
        type = 0;
    var _k = typeArr[type], icon = _k.icon, iconBg = _k.iconBg, cls = _k.cls;
    state.typeImgBg = iconBg;
    state.typeImg = icon;
    state.animationClass = ['vivify', cls];
    if (duration > 0) {
        state.isShowBtnGroup = false;
        state.show = true;
        setTimeout(function () {
            state.show = false;
        }, duration);
    }
    else {
        state.isShowBtnGroup = true;
        state.show = true;
    }
};
/** 抛出初始化方法 */
export var provideDialog = function (options) {
    if (options) {
        for (var key in options) {
            initOptions[key] = options[key];
        }
    }
    provide(prosteDialogPlugin, showDialog);
};
/** 抛出继承方法 */
export var useDialog = function () {
    var dialogPlugin = inject(prosteDialogPlugin);
    if (!dialogPlugin) {
        throw new Error('Please use the [provideDialog] function on the App.vue before using this function');
    }
    return dialogPlugin;
};

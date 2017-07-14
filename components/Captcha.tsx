declare const grecaptcha: any;

import * as React from "react";

let queuedRecaptchaRenders: Array<() => void> = [];

function processRecaptchaRenders() {
    if (typeof grecaptcha !== "undefined") {
        queuedRecaptchaRenders.forEach((callback: typeof Function) => {
            callback();
        });
        queuedRecaptchaRenders = [];
    }
}

function queueRecaptchaRender(callback: typeof Function) {
    queuedRecaptchaRenders.push(callback);
    processRecaptchaRenders();
}

(window as any).onloadCallback = function handleRecaptchaLibraryLoad() {
    processRecaptchaRenders();
};

interface IProps {
    nonce?: any;
    onResult: (result: string) => void;
    onExpire?: () => void;

    recaptchaSize?: string;
    tabIndex?: string;
    recaptchaTheme?: string;
    recaptchaType?: string;
}

interface IState {
    recaptchaId?: string;

}

export default class Captcha extends React.Component<IProps, IState> {
    public static PROVIDER_RECAPTCHA = "google-recaptcha";

    public static provider: string = Captcha.PROVIDER_RECAPTCHA;
    public static apiKey: string = null;

    public shouldComponentUpdate() {
        return false;
    }
    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.nonce !== nextProps.nonce) {
            this.resetCaptcha();
        }
    }
    public resetCaptcha() {
        if (Captcha.provider === Captcha.PROVIDER_RECAPTCHA && grecaptcha) {
            grecaptcha.reset(this.state.recaptchaId);
        }
    }
    public componentDidMount() {
        if (Captcha.provider === Captcha.PROVIDER_RECAPTCHA) {
            queueRecaptchaRender((() => {
                if (!this.refs.container) {
                    return;
                }
                const recaptchaId = grecaptcha.render(this.refs.container, {
                    "callback": this.props.onResult,
                    "expired-callback": this.props.onExpire,
                    "sitekey" : Captcha.apiKey,
                    "size": this.props.recaptchaSize,
                    "tabindex": this.props.tabIndex,
                    "theme": this.props.recaptchaTheme,
                    "type": this.props.recaptchaType,
                });
                this.setState({
                    recaptchaId,
                });
            }).bind(this));
        }
    }
    public componentWillUnmount() {
        if (Captcha.provider === Captcha.PROVIDER_RECAPTCHA) {
            (this.refs.container as HTMLElement).remove();
        }
    }
    public render() {
        return (
            <div className="captcha" ref="container"></div>
        );
    }
}

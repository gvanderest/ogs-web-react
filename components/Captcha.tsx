import React from 'react';
import PropTypes from 'prop-types';
import { CAPTCHA_PROVIDER, CAPTCHA_API_KEY } from '../settings';


export const GOOGLE_RECAPTCHA = 'google-recaptcha';
let queuedRecaptchaRenders = [];


function processRecaptchaRenders() {
    if (window.grecaptcha) {
        queuedRecaptchaRenders.forEach((callback) => {
            callback();
        });
        queuedRecaptchaRenders = [];
    }
}


function queueRecaptchaRender(callback) {
    queuedRecaptchaRenders.push(callback);
    processRecaptchaRenders();
}


window.onloadCallback = function handleRecaptchaLibraryLoad() {
    processRecaptchaRenders();
}


export default class Captcha extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.nonce !== nextProps.nonce) {
            this.resetCaptcha();
        }
    }
    resetCaptcha() {
        if (CAPTCHA_PROVIDER === GOOGLE_RECAPTCHA && window.grecaptcha) {
            window.grecaptcha.reset(this.recaptchaId);
        }
    }
    componentDidMount() {
        if (CAPTCHA_PROVIDER === GOOGLE_RECAPTCHA) {
            queueRecaptchaRender(() => {
                this.recaptchaId = window.grecaptcha.render(this.refs.container, {
                    'sitekey' : CAPTCHA_API_KEY,

                    'callback': this.props.onResult,
                    'expired-callback': this.props.onExpire,
                    'tabindex': this.props.tabIndex,

                    'size': this.props.recaptchaSize,
                    'type': this.props.recaptchaType,
                    'theme': this.props.recaptchaTheme
                });
            });
        }
    }
    componentWillUnmount() {
        if (CAPTCHA_PROVIDER === GOOGLE_RECAPTCHA) {
            this.refs.container.remove();
        }
    }
    render() {
        return (
            <div className="captcha" ref="container"></div>
        );
    }
}

Captcha.propTypes = {
    nonce: PropTypes.string,
};

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../public/unity/css/unity.css';
import '../public/css/app.css';

import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';

if (process.env.SENTRY_DSN) {
    const replay = new Sentry.Replay({
        maskAllText: false,
        maxReplayDuration: 1000 * 60 * 5, // 5 minutes
    });

    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new Sentry.BrowserTracing(), replay],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: +process.env.TRACES_SAMPLE_RATE || 1.0,
        replaysSessionSampleRate:
            +process.env.REPLAYS_SESSION_SAMPLE_RATE || 0.3,
        replaysOnErrorSampleRate:
            +process.env.REPLAYS_ON_ERROR_SAMPLE_RATE || 1.0,
    });

    replay.start();
}

if (process.env.LOGROCKET_APP_ID) {
    LogRocket.init(process.env.LOGROCKET_APP_ID);

    LogRocket.identify('LOCAL_DEVELOPMENT', {
        host: process.env.HOST_BACKOFFICE,
        env: process.env.NODE_ENV,
    });

    LogRocket.getSessionURL((sessionURL) => {
        Sentry.configureScope((scope) => {
            scope.setExtra('sessionURL', sessionURL);
        });
    });
}

// After
ReactDOM.render(<App />, document.getElementById('app'));

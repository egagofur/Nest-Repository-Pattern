/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { AppProvider } from './Contexts/App';
import { ThemeProvider } from './Contexts/Theme';
import { CookiesProvider } from 'react-cookie';

//Ant Design
import 'antd/dist/reset.css';

const App = () => {
    // TEMP disabled
    // OneSignal.init({
    //     appId: process.env.ONE_SIGNAL_APP_ID,
    //     allowLocalhostAsSecureOrigin: true,
    // }).then(() => {
    //     OneSignal.isPushNotificationsEnabled((isEnabled) => {
    //         if (!isEnabled) {
    //             OneSignal.showSlidedownPrompt({
    //                 force: true,
    //                 forceSlidedownOverNative: true,
    //             });
    //         }
    //     });
    // });

    return (
        <>
            <CookiesProvider>
                <ThemeProvider>
                    <AppProvider>
                        <InertiaApp
                            initialPage={JSON.parse(app.dataset.page)}
                            resolveComponent={(pageString) =>
                                import(`./Pages/${pageString}`).then(
                                    (module) => module.default,
                                )
                            }
                        />
                    </AppProvider>
                </ThemeProvider>
            </CookiesProvider>
        </>
    );
};

export default App;

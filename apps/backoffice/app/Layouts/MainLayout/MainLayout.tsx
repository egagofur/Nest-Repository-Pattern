import {
    BarsOutlined,
    DashboardOutlined,
    HistoryOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Inertia, Page } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { MenuProps, Switch, ConfigProvider, Layout, Menu } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../../Components/molecules/Headers';
import { PageProgress } from '../../Components/molecules/Progress';
import { AppContext } from '../../Contexts/App';
import { Route } from '../../Common/Route/Route';
import { useNotification } from '../../Utils/notification';
import { TBreadcrumbsItem } from '../../Modules/Common/Entities';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import {
    darkThemeColors,
    sidebarThemeConfig,
    themeColors,
} from '../../Utils/theme';
import { isMobileScreen, debounce } from '../../Utils/utils';
import CompanyLogo from '../../Components/atoms/Logos/CompanyLogo';
import MainHeader from '../../Components/organisms/Layout/MainHeader';
import { UserAvatar } from '../../Components/atoms/Avatars';
import NotificationIcon from '../../Components/atoms/Icons/NotificationIcon';
import { Overlay } from '../../Components/atoms/Overlays';
import { ThemeContext } from '../../Contexts/Theme';

export type IProps = {
    children: React.ReactNode;
    headerRightMenu?: React.FC;
    title: string;
    topActions?: React.ReactNode;
    breadcrumbs?: TBreadcrumbsItem[];
};

const handleLogout = (
    event:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.KeyboardEvent<HTMLAnchorElement>,
): void => {
    event.preventDefault();
    const isOk = confirm('Are you sure to logout? ');

    if (isOk) {
        Inertia.get(Route.AuthLogout);
    }
};

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: Route.Dashboard,
        label: <Link href={Route.Dashboard}>Dashboard</Link>,
        icon: <DashboardOutlined />,
    },
    {
        key: '#IAM',
        label: 'IAM',
        icon: <ProfileOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.Users,
                label: <Link href={Route.Users}>Users</Link>,
            },
            {
                key: Route.Roles,
                label: <Link href={Route.Roles}>Roles</Link>,
            },
            {
                key: Route.Permissions,
                label: <Link href={Route.Permissions}>Permissions</Link>,
            },
        ],
    },
    {
        key: '#Sample-Form',
        label: 'Sample Form',
        icon: <BarsOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.SampleFormBasic,
                label: <Link href={Route.SampleFormBasic}>Form Basic</Link>,
            },
            {
                key: Route.SampleFormStep,
                label: <Link href={Route.SampleFormStep}>Form Step</Link>,
            },
            {
                key: Route.SampleFormAdvanced,
                label: (
                    <Link href={Route.SampleFormAdvanced}>Form Advanced</Link>
                ),
            },
        ],
    },
    {
        key: '#Sample-Detail',
        label: 'Sample Detail',
        icon: <BarsOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.SampleDetailBasic,
                label: <Link href={Route.SampleDetailBasic}>Detail Basic</Link>,
            },
            {
                key: Route.SampleDetailAdvanced,
                label: (
                    <Link href={Route.SampleDetailAdvanced}>
                        Detail Advanced
                    </Link>
                ),
            },
        ],
    },
    {
        key: Route.Movie,
        label: <Link href={Route.Movie}>Movie</Link>,
        icon: <HomeOutlined />,
    },
    {
        key: Route.MovieSchedule,
        label: <Link href={Route.MovieSchedule}>Schedule</Link>,
        icon: <HomeOutlined />,
    },
    {
        key: Route.LogActivity,
        label: <Link href={Route.LogActivity}>Log Activity</Link>,
        icon: <HistoryOutlined />,
    },
    {
        key: Route.Configs,
        label: <Link href="#">Configuration</Link>,
        icon: <SettingOutlined />,
    },
];

const { Sider, Content } = Layout;

export const MainLayout: React.FC<IProps> = ({
    children,
    title,
    topActions,
    breadcrumbs,
}: IProps) => {
    const { appState } = useContext(AppContext);
    const { props: pageProps } = usePage<Page<TInertiaProps>>();

    // dark theme mode
    const { isDarkMode, handleSwitchTheme } = useContext(ThemeContext);

    // additional style because not affected directly from antd theme before
    const bgSiderLayoutColor = isDarkMode
        ? darkThemeColors?.primary
        : themeColors?.primary;

    const [collapsed, setCollapsed] = useState(true);
    const isMobile = isMobileScreen();

    // active menu item key
    const activeMenuKey = useMemo(
        () => window.location.pathname,
        [window.location.pathname],
    );

    // key of parent's active menu item
    const defaultOpenedKey = useMemo(
        () =>
            menuItems.find((item) => {
                if ('children' in item) {
                    const openedMenuItem = item.children?.find((chil) => {
                        return chil.key === activeMenuKey;
                    });
                    return openedMenuItem !== undefined;
                }
            })?.key as string,
        [menuItems, activeMenuKey],
    );

    // success notification
    useEffect(() => {
        if (pageProps.success) {
            useNotification({
                type: 'success',
                message: pageProps.success.message,
            });
            // setNotification(data)
        }
    }, [pageProps.success]);

    // error notification
    useEffect(() => {
        if (pageProps?.error?.message?.length > 0) {
            'error' in pageProps.error
                ? useNotification({
                      type: 'error',
                      message: pageProps.error.message,
                  })
                : debounce(() => {
                      useNotification({
                          type: 'error',
                          message: pageProps.error.message,
                      });
                  }, 300);
        }
    }, [pageProps.error]);

    return (
        //  Fix height, so the scroll will be belongs to Content only
        <Layout style={{ height: '100vh' }}>
            <Head title={title} />

            {appState.isNavigating && <PageProgress />}
            <Sider
                trigger={null}
                collapsible
                collapsed={isMobile ? collapsed : false}
                style={{
                    backgroundColor: bgSiderLayoutColor,
                    minHeight: '100vh',
                    marginTop: isMobile ? '-60px' : 0,
                    overflow: isMobile && 'auto',
                    position: isMobile ? 'fixed' : 'relative',
                    left: isMobile && 0,
                    top: isMobile && 0,
                    bottom: isMobile && 0,
                    zIndex: isMobile && 10,
                    filter:
                        isMobile &&
                        'drop-shadow(16px 4px 52px rgba(0, 0, 0, 0.25))',
                }}
                width="222px"
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    {!isMobile && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '64px',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                                padding: '0rem 1rem',
                            }}
                        >
                            {/* Apps Logo or Title */}
                            <CompanyLogo />
                        </div>
                    )}

                    {!isMobile && pageProps.userDetail && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '58px',
                                padding: '8px 16px',
                                marginBottom: '14px',
                            }}
                        >
                            {/* User Icon */}
                            <UserAvatar userDetail={pageProps.userDetail} />

                            {/* Notification Icon */}
                            <NotificationIcon
                                notifications={pageProps.notifications}
                            />
                        </div>
                    )}

                    <ConfigProvider theme={sidebarThemeConfig}>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                marginTop: isMobile && '80px',
                            }}
                        >
                            <Menu
                                items={menuItems}
                                style={{
                                    backgroundColor: bgSiderLayoutColor,
                                }}
                                mode="inline"
                                defaultOpenKeys={[defaultOpenedKey]}
                                selectedKeys={[activeMenuKey]}
                            />

                            {/* Bottom Menu */}
                            <Menu
                                style={{
                                    backgroundColor: bgSiderLayoutColor,
                                }}
                                mode="inline"
                            >
                                {/* Toggle switch theme */}
                                <Menu.Item key="switchTheme">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Dark Mode
                                        <Switch
                                            checked={isDarkMode}
                                            onChange={handleSwitchTheme}
                                        />
                                    </div>
                                </Menu.Item>

                                <Menu.Divider />

                                {/* Logout Button */}
                                <Menu.Item
                                    key="logout"
                                    icon={<LogoutOutlined />}
                                >
                                    <Link href="#" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </ConfigProvider>
                </div>
            </Sider>
            <Layout>
                {isMobile && (
                    <MainHeader
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        userDetail={pageProps.userDetail}
                        notifications={pageProps.notifications}
                    />
                )}

                {isMobile && !collapsed && (
                    <Overlay onClick={() => setCollapsed(true)} />
                )}

                <Content
                    style={{
                        padding: isMobile ? '18px 16px' : '28px 24px',
                        overflow: 'auto',
                    }}
                >
                    <PageHeader
                        title={title}
                        topActions={topActions}
                        breadcrumbs={breadcrumbs}
                    />

                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

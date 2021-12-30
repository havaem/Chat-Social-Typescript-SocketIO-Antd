import Header from "components/Header";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { translateMessage } from "constant/messageLanguage";
import CollapsedMenu from "components/CollapsedMenu";
import { useAppDispatch, useAppSelector } from "app/hook";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import { closeMenu, openMenu } from "reducers/menuSlice";
import { pathConstants } from "constant/pathConstant";
import { APP_SOCKET_URL } from "constant";
import { io } from "socket.io-client";
export default function UserLayout(): ReactElement {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isCollapsable = useAppSelector((state) => state.menu.isCollapsed);
	const [isMobile, setIsMobile] = useState(false);
	const userData = useAppSelector((state) => state.user.data);
	const menuItems = [
		{
			key: "public-chat",
			icon: <UserOutlined />,
			title: translateMessage(userData.language, "Public Chat"),
			link: pathConstants.publicChat,
		},
		{
			key: "profile",
			icon: <UserOutlined />,
			title: translateMessage(userData.language, "Profile"),
			link: pathConstants.profile,
		},
		{
			key: "setting",
			icon: <SettingOutlined />,
			title: translateMessage(userData.language, "Settings"),
			link: pathConstants.setting,
		},
	];
	const getMenuActive = () => {
		const pathname = location.pathname;
		const menuItem = menuItems.find((item) => item.link === pathname);
		return menuItem ? menuItem.key : "profile";
	};
	const socket = useRef(io(APP_SOCKET_URL));
	useEffect(() => {
		socket.current.emit("addUser", userData._id);
	}, [socket, userData._id]);
	return (
		<>
			<Header />
			<CollapsedMenu />
			<Layout style={{ position: "relative" }} hasSider>
				<Sider
					width={280}
					style={{
						overflow: "auto",
						height: "100vh",
						position: "fixed",
						left: 0,
						marginTop: 64,
						zIndex: 50,
						borderRight: "1px solid #eee",
					}}
					breakpoint="lg"
					collapsedWidth="0"
					collapsed={isCollapsable}
					onBreakpoint={(broken) => {
						broken
							? dispatch(closeMenu()) && setIsMobile(true)
							: dispatch(openMenu()) && setIsMobile(false);
					}}
				>
					<Menu
						mode="inline"
						selectedKeys={[getMenuActive()]}
						style={{ height: "100%", borderRight: 0 }}
					>
						{menuItems.map((item) => (
							<Menu.Item
								key={item.key}
								onClick={() => {
									isMobile && dispatch(closeMenu());
								}}
							>
								<Link to={item.link}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
							</Menu.Item>
						))}
					</Menu>
				</Sider>
				<Outlet />
			</Layout>
		</>
	);
}

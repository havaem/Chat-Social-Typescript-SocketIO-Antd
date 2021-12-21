import { ReactElement } from "react";
import { Header as Container } from "antd/lib/layout/layout";
import logo from "assets/icons/logo.svg";
import { Avatar, Button, Dropdown, Menu, Tooltip } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { pathConstants } from "constant/pathConstant";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "app/hook";
import coin from "assets/icons/coin.svg";
import {
	MoneyCollectOutlined,
	LogoutOutlined,
	LoginOutlined,
	PlusOutlined,
	AppstoreOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { logOut } from "reducers/userSlice";
import { openNoti } from "utils/Notification";
import { translateMessage } from "constant/messageLanguage";
interface Props {}
export default function Header(props: Props): ReactElement {
	const isLogin = Cookies.get("token");
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.user.data);
	const avatarUrl = userData.avatar;
	const handleLogout = () => {
		dispatch(logOut());
		openNoti({
			type: "success",
			message: translateMessage(Cookies.get("language"), "Logout successfully!"),
			description: "",
		});
		navigate(pathConstants.login);
	};
	const menu = (
		<Menu>
			{isLogin ? (
				<>
					<Menu.Item key="user0" className="header_item" disabled>
						<div className="header_item-info">
							<Avatar
								src={avatarUrl}
								size={50}
								style={{
									marginRight: "10px",
									borderRadius: "50%",
									overflow: "hidden",
								}}
							/>
							<div>
								<p>{userData.name}</p>
								<span>
									<p>{translateMessage(Cookies.get("language"), "Wallet")}:</p>{" "}
									{userData.sCoin}
									<Tooltip placement="bottomRight" title={"sCoin"} arrowPointAtCenter>
										<img src={coin} alt="sCoin" />
									</Tooltip>
								</span>
							</div>
						</div>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="user1">
						<Link to={pathConstants.login}>
							<Button type="text" size="small" icon={<MoneyCollectOutlined />}>
								{translateMessage(Cookies.get("language"), "Recharge")}
							</Button>
						</Link>
					</Menu.Item>
					<Menu.Item key="user2" onClick={handleLogout}>
						<Button type="link" size="small" style={{ color: "#000" }} icon={<LogoutOutlined />}>
							{translateMessage(Cookies.get("language"), "Log out")}
						</Button>
					</Menu.Item>
				</>
			) : (
				<>
					<Menu.Item key="user1">
						<Link to={pathConstants.register}>
							<Button type="text" size="small" icon={<PlusOutlined />}>
								{translateMessage(Cookies.get("language"), "Register")}
							</Button>
						</Link>
					</Menu.Item>
					<Menu.Item key="user2">
						<Link to={pathConstants.login}>
							<Button type="text" size="small" icon={<LoginOutlined />}>
								{translateMessage(Cookies.get("language"), "Login")}
							</Button>
						</Link>
					</Menu.Item>
				</>
			)}
		</Menu>
	);
	return (
		<Container className="header" style={{ position: "fixed", zIndex: 1, width: "100%" }}>
			<Link to="/" className="header_logo">
				<img src={logo} alt="" />
				South
			</Link>
			<Menu
				className="header_nav"
				theme="light"
				mode="horizontal"
				overflowedIndicator={<MenuOutlined />}
				triggerSubMenuAction="click"
			>
				<Menu.Item key="nav1" icon={<MailOutlined />}>
					Thông báo
				</Menu.Item>
				<Menu.Item key="nav2" icon={<AppstoreOutlined />}>
					Thông báo
				</Menu.Item>
			</Menu>
			<Dropdown className="header_menu-user" overlay={menu} placement="bottomRight" trigger={["click"]}>
				{isLogin ? (
					<button>
						<Avatar size="large" src={avatarUrl} />
					</button>
				) : (
					<button>
						<Avatar size="large" icon={<UserOutlined />} />
					</button>
				)}
			</Dropdown>
		</Container>
	);
}

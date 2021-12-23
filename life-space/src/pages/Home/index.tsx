import { ReactElement } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button } from "antd";
import logo from "assets/icons/logo.svg";
import "./style.scss";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "app/hook";
import { translateMessage } from "constant/messageLanguage";
import Cookies from "js-cookie";
interface Props {}

export default function Home(props: Props): ReactElement {
	const isLogin = useAppSelector((state) => state.user.data._id) ? true : false;
	return !isLogin ? (
		<Content className="home">
			<img src={logo} alt="" />
			<div className="home_wrapper">
				<p>
					{translateMessage(
						Cookies.get("language"),
						"A small project containing large projects created for the purpose of hard work"
					)}
				</p>
				<div className="home_wrapper-button">
					<Button type="primary" shape="round" size="large">
						<Link to="/login">
							{translateMessage(Cookies.get("language"), "Getting Started")}
						</Link>
					</Button>
					<Button type="default" shape="round" size="large">
						<Link to="/about">{translateMessage(Cookies.get("language"), "About Me")}</Link>
					</Button>
				</div>
			</div>
		</Content>
	) : (
		<Navigate to="/profile" />
	);
}

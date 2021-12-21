import { ReactElement } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { pathConstants } from "constant/pathConstant";
import { iLogin } from "models/userModels";
import { useAppDispatch, useAppSelector } from "app/hook";
import { userLogin, userLoginGoogle } from "reducers/asyncThunk/userThunk";
import { openNoti } from "utils/Notification";
import { translateMessage } from "constant/messageLanguage";
import Layout from "antd/lib/layout/layout";
import Cookies from "js-cookie";
interface Props {}

export default function Login(props: Props): ReactElement {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const onFinish = async (values: iLogin) => {
		try {
			const response = await dispatch(userLogin(values)).unwrap();
			openNoti({
				message: translateMessage(Cookies.get("language"), "Login successfully!"),
				type: "success",
				description: translateMessage(Cookies.get("language"), "Hello!") + " " + response.user.name,
				duration: 2,
			});
			navigate(pathConstants.root);
		} catch (error: any) {
			openNoti({
				message: translateMessage(Cookies.get("language"), "Login failed!"),
				type: "error",
				description: translateMessage(Cookies.get("language"), error.message),
			});
		}
	};
	const responseGoogle = async (data: any) => {
		try {
			const response = await dispatch(userLoginGoogle({ token: data.tokenId })).unwrap();
			openNoti({
				message: translateMessage(Cookies.get("language"), "Login successfully!"),
				type: "success",
				description: translateMessage(Cookies.get("language"), "Hello!") + " " + response.user.name,
				duration: 2,
			});
			navigate(pathConstants.root);
		} catch (error: any) {
			openNoti({
				message: translateMessage(Cookies.get("language"), "Login failed!"),
				type: "error",
				description: translateMessage(Cookies.get("language"), error.message),
			});
		}
	};
	return (
		<Layout className="login">
			<Form onFinish={onFinish}>
				<Form.Item className="login_form-title">Login</Form.Item>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: translateMessage(Cookies.get("language"), "Username cannot be null"),
						},
					]}
				>
					<Input
						allowClear
						prefix={<UserOutlined />}
						placeholder={translateMessage(Cookies.get("language"), "Username")}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: translateMessage(Cookies.get("language"), "Password cannot be null"),
						},
					]}
				>
					<Input.Password
						allowClear
						prefix={<LockOutlined />}
						placeholder={translateMessage(Cookies.get("language"), "Username")}
					/>
				</Form.Item>
				<Form.Item className="login_button">
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{translateMessage(Cookies.get("language"), "Login")}
					</Button>
					<Link to={pathConstants.forgetPassword}>
						{translateMessage(Cookies.get("language"), "Forgot password")}
					</Link>
				</Form.Item>
				<div className="login_break" />
				<Form.Item className="login_other">
					<GoogleLogin
						clientId="881457424747-717tft1ger3227jm4ahk5b3895si6hdl.apps.googleusercontent.com"
						onSuccess={responseGoogle}
						isSignedIn={false}
						cookiePolicy={"single_host_origin"}
						render={(renderProps) => (
							<button
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								type="button"
								className="login_form-google"
							>
								<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
									<g fill="#000" fillRule="evenodd">
										<path
											d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
											fill="#EA4335"
										></path>
										<path
											d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
											fill="#4285F4"
										></path>
										<path
											d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
											fill="#FBBC05"
										></path>
										<path
											d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
											fill="#34A853"
										></path>
										<path fill="none" d="M0 0h18v18H0z"></path>
									</g>
								</svg>
							</button>
						)}
					/>
					<div>
						{translateMessage(Cookies.get("language"), "If you don't have an account. Sign up")}{" "}
						<Link to={pathConstants.register}>
							{translateMessage(Cookies.get("language"), "here!")}
						</Link>
					</div>
				</Form.Item>
			</Form>
		</Layout>
	);
}

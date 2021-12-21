import { ReactElement } from "react";
import { Form, Input, Button } from "antd";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { pathConstants } from "constant/pathConstant";
import { useForm } from "antd/lib/form/Form";
import { formRegisterItemLayout } from "constant/layoutForm";
import { useAppDispatch, useAppSelector } from "app/hook";
import { userRegister } from "reducers/asyncThunk/userThunk";
import { translateMessage } from "constant/messageLanguage";
import { openNoti } from "utils/Notification";
import Layout from "antd/lib/layout/layout";
import Cookies from "js-cookie";
interface Props {}

export default function Register(props: Props): ReactElement {
	const [form] = useForm();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const navigate = useNavigate();
	const onFinish = async (values: any) => {
		try {
			delete values.repassword;
			await dispatch(userRegister(values)).unwrap();
			openNoti({
				message: translateMessage(Cookies.get("language"), "Register successfully!"),
				type: "success",
				description: translateMessage(
					Cookies.get("language"),
					"Please check your email to verify your account!"
				),
			});
			navigate(pathConstants.login);
		} catch (error: any) {
			openNoti({
				message: translateMessage(Cookies.get("language"), "Register failed!"),
				type: "error",
				description: translateMessage(Cookies.get("language"), error.message),
			});
		}
	};
	const onFill = () => {
		form.setFieldsValue({
			email: "vhnvohoainam@gmail.com",
			name: "Võ Hoài Nam",
			password: "nAm01653789969",
			repassword: "nAm01653789969",
			username: "vhnvohoainam",
		});
	};
	return (
		<Layout className="register">
			<Form
				{...formRegisterItemLayout}
				form={form}
				onFinish={onFinish}
				scrollToFirstError={true}
				autoComplete="off"
			>
				<Form.Item className="register_form-title">Register</Form.Item>
				<Form.Item
					name="name"
					label={translateMessage(Cookies.get("language"), "User Name")}
					rules={[{ required: true, whitespace: true, min: 5, max: 40 }]}
				>
					<Input allowClear />
				</Form.Item>
				<Form.Item
					name="username"
					label={translateMessage(Cookies.get("language"), "Username")}
					tooltip={translateMessage(
						Cookies.get("language"),
						"Username has 8 characters or more and can contain letters, numbers and underscores"
					)}
					rules={[
						{
							required: true,
							pattern: /^[a-zA-Z0-9_]+\w{8,20}$/,
						},
					]}
				>
					<Input allowClear />
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							type: "email",
							required: true,
						},
					]}
				>
					<Input allowClear />
				</Form.Item>

				<Form.Item
					name="password"
					label={translateMessage(Cookies.get("language"), "Password")}
					tooltip={translateMessage(
						Cookies.get("language"),
						"Password min 8 and max 30 characters including uppercase, lowercase and numbers!"
					)}
					rules={[
						{
							required: true,
							pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*].{8,30}$/,
						},
					]}
				>
					<Input.Password allowClear />
				</Form.Item>
				<Form.Item
					name="repassword"
					label={translateMessage(Cookies.get("language"), "Confirm password")}
					dependencies={["password"]}
					rules={[
						{
							required: true,
							message: translateMessage(
								Cookies.get("language"),
								"Please confirm the password!"
							),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										translateMessage(
											Cookies.get("language"),
											"Re-entered password does not match!"
										)
									)
								);
							},
						}),
					]}
				>
					<Input.Password allowClear />
				</Form.Item>

				<Form.Item className="register_button">
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{translateMessage(Cookies.get("language"), "Register")}
					</Button>
					<Button type="default" htmlType="button" onClick={onFill}>
						Fill
					</Button>
				</Form.Item>
				<div className="register_break" />
				<Form.Item className="register_other">
					<div>
						{translateMessage(Cookies.get("language"), "If you already have an account. Log in")}{" "}
						<Link to={pathConstants.login}>
							{translateMessage(Cookies.get("language"), "here!")}
						</Link>
					</div>
				</Form.Item>
			</Form>
		</Layout>
	);
}

import { ReactElement } from "react";
import { Form, Input, Button } from "antd";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { pathConstants } from "constant/pathConstant";
import { useForm } from "antd/lib/form/Form";
import { formRegisterItemLayout } from "constant/layoutForm";
import { useAppDispatch, useAppSelector } from "app/hook";
import { userResetPassword } from "reducers/asyncThunk/userThunk";
import { translateMessage } from "constant/messageLanguage";
import { openNoti } from "utils/Notification";
import Layout from "antd/lib/layout/layout";
import Cookies from "js-cookie";
interface Props {}

export default function ResetPassword(props: Props): ReactElement {
	const [form] = useForm();
	const { token } = useParams();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const navigate = useNavigate();
	const onFinish = async (values: any) => {
		try {
			delete values.repassword;
			const response = await dispatch(userResetPassword({ token, ...values })).unwrap();
			openNoti({
				message: translateMessage(Cookies.get("language"), "Success"),
				type: "success",
				description: translateMessage(Cookies.get("language"), response.message),
			});
			navigate(pathConstants.login);
		} catch (error: any) {
			openNoti({
				message: translateMessage(Cookies.get("language"), "Failed"),
				type: "error",
				description: translateMessage(Cookies.get("language"), "Server Error"),
			});
		}
	};
	return (
		<Layout className="reset-password">
			<Form
				{...formRegisterItemLayout}
				form={form}
				onFinish={onFinish}
				scrollToFirstError={true}
				autoComplete="off"
				name="reset-password"
			>
				<Form.Item className="reset-password_form-title">
					{translateMessage(Cookies.get("language"), "Reset Password")}
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
							pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*].{8,}$/,
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

				<Form.Item className="reset-password_button">
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{translateMessage(Cookies.get("language"), "Submit")}
					</Button>
				</Form.Item>
			</Form>
		</Layout>
	);
}

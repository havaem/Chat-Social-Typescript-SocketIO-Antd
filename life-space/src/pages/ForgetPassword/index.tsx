import { ReactElement } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "constant/pathConstant";
import { useAppDispatch, useAppSelector } from "app/hook";
import { userForgetPassword } from "reducers/asyncThunk/userThunk";
import { openNoti } from "utils/Notification";
import { translateMessage } from "constant/messageLanguage";
import { Content } from "antd/lib/layout/layout";
import Cookies from "js-cookie";

export default function ForgetPassword(): ReactElement {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const onFinish = async (values: any) => {
		try {
			const response = await dispatch(userForgetPassword({ email: values.Email })).unwrap();
			openNoti({
				message: translateMessage(Cookies.get("language"), "Success"),
				type: "success",
				description: translateMessage(Cookies.get("language"), response.message),
			});
			navigate(pathConstants.root);
		} catch (error: any) {
			openNoti({
				message: translateMessage(Cookies.get("language"), "Failed"),
				type: "error",
				description: translateMessage(Cookies.get("language"), "Server Error"),
			});
		}
	};
	return (
		<Content className="login">
			<Form onFinish={onFinish}>
				<Form.Item className="login_form-title">
					{translateMessage(Cookies.get("language"), "Forget Password")}
				</Form.Item>
				<Form.Item name="Email" rules={[{ required: true, type: "email" }]}>
					<Input allowClear prefix={<MailOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item className="login_button">
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{translateMessage(Cookies.get("language"), "Submit")}
					</Button>
				</Form.Item>
			</Form>
		</Content>
	);
}

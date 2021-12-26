import { Card, Col, message, Row, Tooltip, Form, Input, DatePicker, Select, Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Content } from "antd/lib/layout/layout";
import { translateMessage } from "constant/messageLanguage";
import { ReactElement, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "app/hook";
import { userChangePassword, userUpdate } from "reducers/asyncThunk/userThunk";
import { openNoti } from "utils/Notification";
import { imageCreateOne } from "reducers/asyncThunk/imageThunk";
interface Props {
	data: any;
}

export default function AccountTab({ data }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const [userAvatar, setUserAvatar] = useState(data.avatar);
	const beforeUpload = async (file: any) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		if (!isLt2M) {
			message.warning("Image must smaller than 2MB!");
		}
		if (isJpgOrPng && isLt2M) {
			const formData = new FormData();
			formData.append("avatar", file);
			formData.append("description", "Avatar");
			try {
				const responseImage = await dispatch(imageCreateOne(formData)).unwrap();
				const response = await dispatch(userUpdate({ avatar: responseImage.url })).unwrap();
				setUserAvatar(responseImage.url);
				openNoti({
					type: "success",
					description: translateMessage(data.language, response.message),
					message: translateMessage(data.language, "Success"),
				});
			} catch (error: any) {
				openNoti({
					type: "error",
					message: translateMessage(data.language, "Failed"),
					description: translateMessage(data.language, error.message),
				});
			}

			return false;
		}
		return false;
	};
	const initialData = {
		username: data.username,
		slug: data.slug,
		name: data.name,
		email: data.email,
		phone: data.phone,
		language: data.language,
		birthday: moment(data.birthday),
	};
	const handleSubmitChangeInfo = async (data: any) => {
		try {
			data.birthday = moment(data.birthday).format("YYYY-MM-DD");
			const response = await dispatch(userUpdate(data)).unwrap();
			openNoti({
				type: "success",
				description: translateMessage(data.language, response.message),
				message: translateMessage(data.language, "Success"),
			});
		} catch (error: any) {
			openNoti({
				type: "error",
				message: translateMessage(data.language, "Failed"),
				description: translateMessage(data.language, error.message),
			});
		}
	};
	const handleSubmitChangePassword = async (data: any) => {
		try {
			delete data.confirmPassword;
			const response = await dispatch(userChangePassword(data)).unwrap();
			openNoti({
				type: "success",
				description: translateMessage(data.language, response.message),
				message: translateMessage(data.language, "Success"),
			});
		} catch (error: any) {
			openNoti({
				type: "error",
				message: translateMessage(data.language, "Failed"),
				description: translateMessage(data.language, error.message),
			});
		}
	};
	const disabledDate = (current: any) => {
		const userDate = moment(data.birthday);
		const startTime = moment().date(0).month(0).year(1950);
		const endTime = userDate;
		return !(startTime.isSameOrBefore(current) && endTime.isAfter(current));
	};
	return (
		<>
			<Card bordered title={translateMessage(data.language, "Basic Infomation")}>
				<Content className="setting_tab-basic">
					<ImgCrop
						quality={1}
						zoom
						shape="round"
						rotate
						modalTitle={translateMessage(data.language, "Edit image")}
					>
						<Upload beforeUpload={beforeUpload} showUploadList={false}>
							<Tooltip title={translateMessage(data.language, "Update avatar")}>
								<Avatar className="basic_avatar" src={userAvatar} size={100} />
							</Tooltip>
						</Upload>
					</ImgCrop>
					<Form
						className="basic_form"
						initialValues={initialData}
						onFinish={handleSubmitChangeInfo}
						colon={false}
					>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={8} xl={8}>
								<Form.Item
									name="username"
									label={translateMessage(data.language, "Username")}
									tooltip={translateMessage(data.language, "Username cannot be changed")}
								>
									<Input disabled={!data.status.is_admin} />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={16} xl={16}>
								<Form.Item
									name="slug"
									label="Slug"
									tooltip={translateMessage(
										data.language,
										"Upgrade your account to use this feature"
									)}
								>
									<Input disabled={!data.status.is_admin} />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={12} xl={12}>
								<Form.Item name="email" label="Email">
									<Input disabled />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} xl={12}>
								<Form.Item
									name="name"
									label={translateMessage(data.language, "User Name")}
									rules={[{ required: true, whitespace: true, min: 5, max: 40 }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={8} xl={8}>
								<Form.Item
									name="phone"
									label={translateMessage(data.language, "Phone Number")}
								>
									<Input placeholder={translateMessage(data.language, "Phone Number")} />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={8} xl={8}>
								<Form.Item
									name="birthday"
									label={translateMessage(data.language, "Date of Birth")}
								>
									<DatePicker
										disabledDate={disabledDate}
										style={{ width: "100%" }}
										format="DD/MM/YYYY"
										placeholder="Date of Birth"
										allowClear={false}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={8} xl={8}>
								<Form.Item
									name="language"
									label={translateMessage(data.language, "Language")}
								>
									<Select
										style={{ width: "100%" }}
										placeholder={translateMessage(data.language, "Language")}
									>
										<Select.Option value="en">English</Select.Option>
										<Select.Option value="vi">Tiếng Việt</Select.Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Button
							type="primary"
							htmlType="submit"
							style={{ marginLeft: "auto" }}
							loading={isLoading}
						>
							{translateMessage(data.language, "Save changes")}
						</Button>
					</Form>
				</Content>
			</Card>
			<Card bordered className="setting_tab" title={translateMessage(data.language, "Change Password")}>
				<Content className="setting_tab-password">
					<Form
						name="change-password"
						className="password_form"
						initialValues={initialData}
						onFinish={handleSubmitChangePassword}
					>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={8} xl={8}>
								<Form.Item
									name="password"
									label={translateMessage(data.language, "Password")}
									rules={[
										{
											required: true,
										},
									]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={9} xl={9}>
								<Form.Item
									name="newPassword"
									label={translateMessage(data.language, "New Password")}
									tooltip="Mật khẩu tối thiểu 8 và tối đa 30 ký tự bao gồm chữ hoa, chữ thường và số!"
									rules={[
										{
											required: true,
											pattern:
												/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*].{8,30}$/,
										},
									]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={7} xl={7}>
								<Form.Item
									name="confirmPassword"
									label={translateMessage(data.language, "Confirm")}
									rules={[
										{
											required: true,
											message: translateMessage(
												data.language,
												"Please confirm the password!"
											),
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue("newPassword") === value) {
													return Promise.resolve();
												}
												return Promise.reject(
													new Error("Mật khẩu nhập lại không trùng khớp!")
												);
											},
										}),
									]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
							<Button type="primary" htmlType="submit" loading={isLoading}>
								{translateMessage(data.language, "Save")}
							</Button>
						</Row>
					</Form>
				</Content>
			</Card>
		</>
	);
}

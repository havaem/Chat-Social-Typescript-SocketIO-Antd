import { ReactElement, useEffect, useState } from "react";
import { Button, Card, Image, Input, Tag, Tooltip, Typography, Upload } from "antd";
import { translateMessage } from "constant/messageLanguage";
import {
	SmileOutlined,
	FileImageOutlined,
	MenuUnfoldOutlined,
	CloseOutlined,
	SettingOutlined,
	EllipsisOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";
import { BsFillReplyFill } from "react-icons/bs";
import Avatar from "antd/lib/avatar/avatar";
import { useAppDispatch } from "app/hook";
import { messageCreateOne, messageGetAllFromConversation } from "reducers/asyncThunk/messageThunk";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";
interface Props {
	userData: any;
	isSiderCollapsed: boolean;
	setIsSiderCollapsed: (isSiderCollapsed: boolean) => void;
}

TimeAgo.addLocale(en);
TimeAgo.addLocale(vi);
export default function ChatBox({ userData, isSiderCollapsed, setIsSiderCollapsed }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [messageImageFiles, setMessageImageFiles] = useState<any>([]);
	const [messageImageSrc, setMessageImageSrc] = useState<{ uid: string; url: string }[]>([]);
	const handleRemoveImage = (uid: string) => {
		setMessageImageFiles(messageImageFiles.filter((item: any) => item.uid !== uid));
	};
	useEffect(() => {
		setMessageImageSrc(
			messageImageFiles.map((item: any) => ({
				uid: item.uid,
				url: window.URL.createObjectURL(item),
			}))
		);
	}, [messageImageFiles]);
	const beforeUpload = (file: File) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
		}
		return false;
	};
	const handleChangeImage = async ({ file }: any) => {
		let isExist = messageImageFiles.find((item: any) => item.name === file.name);
		!isExist && setMessageImageFiles((pre: any) => [...pre, file]);
	};
	const handleSendMessage = async () => {
		if (message.trim() === "") return;
		setMessage("");
		setMessageImageFiles([]);
		setMessageImageSrc([]);
		const formData = new FormData();
		if (messageImageFiles.length > 0) {
			for (let i = 0; i < messageImageFiles.length; i++) {
				formData.append(`images`, messageImageFiles[i]);
			}
		}
		formData.append("message", message);
		formData.append("conversation", "61c74b80c9de5ae944e64903");
		await dispatch(messageCreateOne(formData));
	};
	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const response = await dispatch(
					messageGetAllFromConversation("61c74b80c9de5ae944e64903")
				).unwrap();
				setMessages(response);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMessage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const renderMessage = (messages: any) => {
		let lastUser = messages[0].user._id;
		let xhtml = null;
		messages?.map((item: any, index: number) => {
			<div className="card_content-item" key={item._id}>
				<Avatar size={50} shape="circle" src={item.user.avatar} />
				<div className="item_content">
					<Typography.Title level={5} className="item_content-name">
						{item.user.name} <Tag color="#fe1b0a">Admin</Tag>{" "}
						<span style={{ fontSize: 14, color: "#ccc", fontWeight: 400 }}>
							{/* {moment(item.updateAt).fromNow()} */}
							{new TimeAgo("vi-VN").format(new Date(item.updatedAt))}
						</span>
					</Typography.Title>
					{item.images?.map((image: any) => (
						<div className="item_content-image" key={image}>
							<Image height={150} src={image} />
							<div className="item_content-actions">
								<Tooltip title="Reply">
									<button>
										<BsFillReplyFill />
									</button>
								</Tooltip>
								<Tooltip title="Comment">
									<button>
										<EllipsisOutlined />
									</button>
								</Tooltip>
							</div>
						</div>
					))}
					<Typography.Text className="item_content-text">
						<Tooltip
							title={new TimeAgo("vi-VN").format(new Date(item.updatedAt))}
							placement="left"
						>
							{item.message}
						</Tooltip>
						{item.createdAt !== item.updatedAt && (
							<Tag className="text-edited" color="purple">
								Đã chỉnh sửa
							</Tag>
						)}
						<div className="item_content-actions">
							<Tooltip title="Reply">
								<button>
									<BsFillReplyFill />
								</button>
							</Tooltip>
							<Tooltip title="Comment">
								<button>
									<EllipsisOutlined />
								</button>
							</Tooltip>
						</div>
					</Typography.Text>
				</div>
			</div>;
		});
	};
	return (
		<Card className="row_chat-card">
			<div className="card_header">
				<h1>Public Chat</h1>
				<div>
					<Button
						type="text"
						onClick={() => {
							setIsSiderCollapsed(!isSiderCollapsed);
						}}
					>
						{isSiderCollapsed ? (
							<MenuFoldOutlined style={{ fontSize: 22 }} />
						) : (
							<MenuUnfoldOutlined style={{ fontSize: 22 }} />
						)}
					</Button>
					<Button type="text">
						<SettingOutlined style={{ fontSize: 22 }} />
					</Button>
				</div>
			</div>
			<div className="card_content">
				{messages?.map((item: any) => (
					<div className="card_content-item" key={item._id}>
						<Avatar size={50} shape="circle" src={item.user.avatar} />
						<div className="item_content">
							<Typography.Title level={5} className="item_content-name">
								{item.user.name} <Tag color="#fe1b0a">Admin</Tag>{" "}
								<span style={{ fontSize: 14, color: "#ccc", fontWeight: 400 }}>
									{/* {moment(item.updateAt).fromNow()} */}
									{new TimeAgo("vi-VN").format(new Date(item.updatedAt))}
								</span>
							</Typography.Title>
							{item.images?.map((image: any) => (
								<div className="item_content-image" key={image}>
									<Image height={150} src={image} />
									<div className="item_content-actions">
										<Tooltip title="Reply">
											<button>
												<BsFillReplyFill />
											</button>
										</Tooltip>
										<Tooltip title="Comment">
											<button>
												<EllipsisOutlined />
											</button>
										</Tooltip>
									</div>
								</div>
							))}
							<Typography.Text className="item_content-text">
								<Tooltip
									title={new TimeAgo("vi-VN").format(new Date(item.updatedAt))}
									placement="left"
								>
									{item.message}
								</Tooltip>
								{item.createdAt !== item.updatedAt && (
									<Tag className="text-edited" color="purple">
										Đã chỉnh sửa
									</Tag>
								)}
								<div className="item_content-actions">
									<Tooltip title="Reply">
										<button>
											<BsFillReplyFill />
										</button>
									</Tooltip>
									<Tooltip title="Comment">
										<button>
											<EllipsisOutlined />
										</button>
									</Tooltip>
								</div>
							</Typography.Text>
						</div>
					</div>
				))}
				{/* <div className="card_content-item">
						<Avatar
							size={50}
							shape="circle"
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						/>
						<div className="item_content">
							<Typography.Title level={5} className="item_content-name">
								{userData.name} <Tag color="#fe1b0a">Admin</Tag>{" "}
								<span style={{ fontSize: 14, color: "#ccc", fontWeight: 400 }}>
									{new TimeAgo("en-US").format(Date.now() - 60 * 1000)}
								</span>
							</Typography.Title>
							<div className="item_content-image">
								<Image height={150} src={userData.avatar} />
								<div className="item_content-actions">
									<Tooltip title="Reply">
										<button>
											<BsFillReplyFill />
										</button>
									</Tooltip>
									<Tooltip title="Comment">
										<button>
											<EllipsisOutlined />
										</button>
									</Tooltip>
								</div>
							</div>
							<Typography.Text className="item_content-text">
								<Tooltip title="4 minutes ago" placement="left">
									Day la noi dung tin nhan dau tien cua trang web Day la noi dung tin nhan
									dau tien cua trangDay la noi dung tin nhan dau tien cua trang web Day la
									noi dung tin nhan dau tien cua trangDay la noi dung tin nhan dau tien cua
									trang web Day la noi dung tin nhan dau tien cua trang
								</Tooltip>

								<Tag className="text-edited" color="purple">
									Đã chỉnh sửa
								</Tag>
								<div className="item_content-actions">
									<Tooltip title="Reply">
										<button>
											<BsFillReplyFill />
										</button>
									</Tooltip>
									<Tooltip title="Comment">
										<button>
											<EllipsisOutlined />
										</button>
									</Tooltip>
								</div>
							</Typography.Text>
						</div>
					</div> */}
			</div>
			<div className="card_bottom">
				<div className="card_bottom-more">
					{messageImageSrc.map((item) => (
						<div className="input_image" key={item.uid}>
							<Button
								className="input_image-close"
								type="primary"
								danger
								size="small"
								icon={<CloseOutlined />}
								onClick={() => {
									handleRemoveImage(item.uid);
								}}
							/>
							<Image height={150} src={item.url} />
						</div>
					))}
				</div>
				<div className="card_bottom-input">
					<Input
						bordered={false}
						placeholder={translateMessage(userData.language, "Type a message")}
						onPressEnter={handleSendMessage}
						maxLength={200}
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						className="input-message"
					/>
					<Tooltip title="Emoji">
						<Button type="text" icon={<SmileOutlined style={{ fontSize: 22 }} />} />
					</Tooltip>
					<Tooltip title={translateMessage(userData.language, "Attach a photo")}>
						<Upload
							beforeUpload={beforeUpload}
							onChange={handleChangeImage}
							showUploadList={false}
							multiple={true}
							accept="image/*"
						>
							<Button type="text" icon={<FileImageOutlined style={{ fontSize: 22 }} />} />
						</Upload>
					</Tooltip>{" "}
				</div>
			</div>
		</Card>
	);
}

import { ReactElement, useEffect, useRef, useState } from "react";
import { Button, Card, Dropdown, Image, Input, Menu, Popover, Tag, Tooltip, Upload } from "antd";
import { translateMessage } from "constant/messageLanguage";
import ScrollableFeed from "react-scrollable-feed";
import {
	SmileOutlined,
	FileImageOutlined,
	MenuUnfoldOutlined,
	CloseOutlined,
	SettingOutlined,
	MenuFoldOutlined,
	ClearOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "app/hook";
import {
	messageCreateOne,
	messageDeleteAll,
	messageGetAllFromConversation,
} from "reducers/asyncThunk/messageThunk";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";
import { conversationGetOne, conversationUpdateOne } from "reducers/asyncThunk/conversationThunk";

import MessageItem from "./MessageItem";
interface Props {
	userData: any;
	isSiderCollapsed: boolean;
	setIsSiderCollapsed: (isSiderCollapsed: boolean) => void;
	socket: any;
	conversation: any;
	setConversation: (conversation: any) => void;
	userRole: any;
}

TimeAgo.addLocale(en);
TimeAgo.addLocale(vi);
export default function ChatBox({
	userData,
	isSiderCollapsed,
	setIsSiderCollapsed,
	socket,
	conversation,
	setConversation,
	userRole,
}: Props): ReactElement {
	const dispatch = useAppDispatch();
	const [messages, setMessages] = useState<any[]>([]);
	const [message, setMessage] = useState("");

	const [messageImageFiles, setMessageImageFiles] = useState<any[]>([]);
	const [messageImageSrc, setMessageImageSrc] = useState<{ uid: string; url: string }[]>([]);

	const [newMessage, setNewMessage] = useState<any>(null);
	const timeRef = useRef(new TimeAgo("vi-VN"));
	console.log(messages[0]);
	useEffect(() => {
		socket.current.on("joinUser", (data: any) => {
			setMessages((pre) => [
				...pre,
				{
					_id:
						Math.random().toString(36).substring(2, 15) +
						Math.random().toString(36).substring(2, 15),
					message: data + " đang hoạt động",
					user: {
						avatar: "http://res.cloudinary.com/dmiv5wxbm/image/upload/v1640649014/ms1jll3qjvfcesot0fhf.jpg",
						name: "BOT NOTIFICATION",
						_id: "61c82f7bc42fb88d3f911ee9",
					},
					updatedAt: Date.now(),
				},
			]);
		});
		socket.current.emit("addUser", userData._id);
		socket.current.on("newMessagePublicRoom", (data: any) => {
			setNewMessage(data);
		});
		socket.current.on("newMessageData", () => {
			setMessages([]);
		});
	}, [socket, userData._id]);
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
		if (message.trim() === "" && messageImageFiles.length === 0) return;
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
		try {
			socket.current.emit("sendMessagePublicRoom", await dispatch(messageCreateOne(formData)).unwrap());
		} catch (error) {
			console.log("error: ", error);
		}
	};
	const handleCloseChat = async () => {
		try {
			const response = await dispatch(
				conversationUpdateOne({
					id: conversation._id,
					data: {
						...conversation,
						settings: conversation.settings.map((item: any) =>
							item.name === "CLOSE_CHAT" ? { ...item, value: true } : item
						),
					},
				})
			).unwrap();
			socket.current.emit("updateConversation", response);
		} catch (error) {
			console.log(error);
		}
	};
	const handleOpenChat = async () => {
		try {
			const response = await dispatch(
				conversationUpdateOne({
					id: conversation._id,
					data: {
						...conversation,
						settings: conversation.settings.map((item: any) =>
							item.name === "CLOSE_CHAT" ? { ...item, value: false } : item
						),
					},
				})
			).unwrap();
			socket.current.emit("updateConversation", response);
		} catch (error) {
			console.log(error);
		}
	};
	const handleClearChat = async () => {
		try {
			await dispatch(messageDeleteAll("61c74b80c9de5ae944e64903")).unwrap();
			socket.current.emit("clearMessageAll");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		newMessage && setMessages((pre: any) => [...pre, newMessage]);
	}, [newMessage]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				Promise.all([
					dispatch(messageGetAllFromConversation("61c74b80c9de5ae944e64903")),
					dispatch(conversationGetOne("61c74b80c9de5ae944e64903")),
				]).then(async ([messageRes, conversationRes]) => {
					setMessages(messageRes.payload);
					setConversation(conversationRes.payload);
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const menu = (
		<Menu>
			{userRole?.permissions?.includes("CLEAR_CHAT") && (
				<Menu.Item key="menu1">
					<Button
						type="text"
						block
						icon={<ClearOutlined />}
						size="small"
						style={{ textAlign: "left" }}
						onClick={handleClearChat}
					>
						Xóa tất cả tin nhắn
					</Button>
				</Menu.Item>
			)}
			{conversation?.settings.find((item: any) => item.name === "CLOSE_CHAT").value === true
				? userRole?.permissions?.includes("OPEN_CHAT") && (
						<Menu.Item key="menu2">
							<Button
								type="text"
								block
								icon={<PoweroffOutlined />}
								size="small"
								style={{ textAlign: "left" }}
								onClick={handleOpenChat}
							>
								Mở tin nhắn
							</Button>
						</Menu.Item>
				  )
				: userRole?.permissions?.includes("CLOSE_CHAT") && (
						<Menu.Item key="menu3">
							<Button
								type="text"
								block
								icon={<PoweroffOutlined />}
								size="small"
								style={{ textAlign: "left" }}
								onClick={handleCloseChat}
							>
								Tắt tin nhắn
							</Button>
						</Menu.Item>
				  )}
		</Menu>
	);
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
					{userRole?.permissions.includes("SETTING_CHAT") && (
						<Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
							<Button type="text">
								<SettingOutlined style={{ fontSize: 22 }} />
							</Button>
						</Dropdown>
					)}
				</div>
			</div>
			<div className="card_content">
				<ScrollableFeed>
					{messages.length !== 0 &&
						conversation &&
						messages?.map((item: any) => {
							let userMessageRole = conversation?.members.find(
								(member: any) => member.user._id === item.user._id
							);
							let role = (
								<Tag color={userMessageRole.role.color}>{userMessageRole.role.name}</Tag>
							);
							return (
								<MessageItem key={item._id} role={role} message={item} timeRef={timeRef} />
							);
						})}
				</ScrollableFeed>
			</div>
			{!conversation?.settings.find((item: any) => item.name === "CLOSE_CHAT").value === true &&
				userRole?.permissions.includes("CHAT") && (
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
							<Popover placement="topLeft" content={<>HIHIHi</>} trigger="click">
								<Tooltip title="Emoji">
									<Button type="text" icon={<SmileOutlined style={{ fontSize: 22 }} />} />
								</Tooltip>
							</Popover>
							<Tooltip title={translateMessage(userData.language, "Attach a photo")}>
								<Upload
									beforeUpload={beforeUpload}
									onChange={handleChangeImage}
									showUploadList={false}
									multiple={true}
									accept="image/*"
								>
									<Button
										type="text"
										icon={<FileImageOutlined style={{ fontSize: 22 }} />}
									/>
								</Upload>
							</Tooltip>
						</div>
					</div>
				)}
		</Card>
	);
}

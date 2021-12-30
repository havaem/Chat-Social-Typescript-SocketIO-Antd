import { Col, Row } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useAppSelector } from "app/hook";
import { ReactElement, useEffect, useRef, useState } from "react";
import "./style.scss";
import ChatBox from "./components/ChatBox";
import ChatOnline from "./components/ChatOnline";
import { io } from "socket.io-client";
import { APP_SOCKET_URL } from "constant";
export default function PublicChat(): ReactElement {
	const userData = useAppSelector((state) => state.user.data);
	const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
	const socket = useRef(io(APP_SOCKET_URL));
	const [conversation, setConversation] = useState<any>(null);
	const [userRole, setUserRole] = useState<any>(null);
	useEffect(() => {
		socket.current.on("newConversation", (data: any) => {
			setConversation(data);
		});
	}, []);
	useEffect(() => {
		setUserRole(conversation?.members.find((item: any) => item.user._id === userData._id).role);
	}, [conversation, userData._id]);
	return (
		<Layout className="public resize">
			<Content className="public_content">
				<Row className="public_content-row">
					<Col flex="19 19 70%" className="row_chat">
						<ChatBox
							userRole={userRole}
							conversation={conversation}
							setConversation={setConversation}
							socket={socket}
							userData={userData}
							isSiderCollapsed={isSiderCollapsed}
							setIsSiderCollapsed={setIsSiderCollapsed}
						/>
					</Col>
					<Col flex="0 4 30%" className={`row_online ${isSiderCollapsed && "d-none"}`}>
						<ChatOnline userRole={userRole} conversation={conversation} socket={socket} />
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

import { Avatar, Image, Tag, Tooltip, Typography } from "antd";
import TimeAgo from "javascript-time-ago";
import { ReactElement, useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { EllipsisOutlined } from "@ant-design/icons";
interface Props {
	message: any;
	role: JSX.Element;
	timeRef: React.MutableRefObject<TimeAgo>;
}

export default function MessageItem({ message, role, timeRef }: Props): ReactElement {
	const [timeMessage, setTimeMessage] = useState(timeRef.current.format(new Date(message.updatedAt)));
	setInterval(() => {
		setTimeMessage(timeRef.current.format(new Date(message.updatedAt)));
	}, 60000);
	return (
		<div className="card_content-item" key={message._id}>
			<Avatar size={50} shape="circle" src={message.user.avatar} />
			<div className="item_content">
				<Typography.Title level={5} className="item_content-name">
					{message.user.name} {role}{" "}
					<span style={{ fontSize: 14, color: "#ccc", fontWeight: 400 }}>{timeMessage}</span>
				</Typography.Title>
				<div className="item_content-message">
					{message.images?.map((image: any) => (
						<div className="message_image" key={image}>
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
					<Typography.Text className="message_text">
						{message.message}
						<div className="item_content-actions">
							<Tooltip title="Reply">
								<button>
									<BsFillReplyFill />
								</button>
							</Tooltip>
							<Tooltip title="Delete">
								<button>
									<EllipsisOutlined />
								</button>
							</Tooltip>
						</div>
					</Typography.Text>
				</div>
			</div>
		</div>
	);
}

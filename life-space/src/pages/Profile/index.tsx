import { Button, Card, Col, Row, Modal, Tooltip, Skeleton, Layout } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useAppSelector } from "app/hook";
import { ReactElement } from "react";
import QRCode from "qrcode";
import {
	MailTwoTone,
	PhoneTwoTone,
	CalendarTwoTone,
	FacebookOutlined,
	TwitterOutlined,
	GithubOutlined,
	CheckCircleFilled,
} from "@ant-design/icons";
import "./style.scss";
import { translateMessage } from "constant/messageLanguage";
import Paragraph from "antd/lib/typography/Paragraph";
import { Navigate, useParams } from "react-router-dom";

export default function Profile(): ReactElement {
	const { slug } = useParams();
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const userData = useAppSelector((state) => state.user.data);
	const isLogin = useAppSelector((state) => state.user.data._id) ? true : false;
	const handleShowQRCode = async () => {
		Modal.info({
			centered: true,
			maskClosable: true,
			content: (
				<img style={{ width: "100%" }} src={await QRCode.toDataURL(userData.slug)} alt="qrcode" />
			),
		});
	};
	// useLayoutEffect(() => {}, [slug]);
	return isLogin ? (
		<>
			<Layout className="profile resize">
				<Card bordered={false}>
					{isLoading ? (
						<Skeleton avatar paragraph={{ rows: 4 }} />
					) : (
						<Row gutter={[8, 16]} className="profile_card">
							<Col xs={24} sm={24} md={15}>
								<div className="profile_card-content">
									<Avatar size={150} src={userData.avatar} className="content_avatar" />
									<div className="content_info">
										<p className="content_info-name">
											{userData.name}
											{userData.status.is_admin && (
												<Tooltip
													title={translateMessage(userData.language, "Verify")}
												>
													<CheckCircleFilled style={{ color: "#3f87f5" }} />
												</Tooltip>
											)}
										</p>
										<p className="content_info-slug">@{userData.slug}</p>
										<Button
											className="content_info-button"
											type="primary"
											onClick={handleShowQRCode}
											style={{ marginBottom: 10 }}
										>
											{translateMessage(userData.language, "Message")}
										</Button>
										<Button
											className="content_info-button"
											type="primary"
											danger
											onClick={handleShowQRCode}
										>
											{translateMessage(userData.language, "QR Code")}
										</Button>
									</div>
								</div>
							</Col>
							<Col xs={24} sm={24} md={9} className="profile_card-wrapper">
								<div className="profile_card-info">
									{userData.birthday && (
										<div className="info_item">
											<div className="info_item-title">
												<CalendarTwoTone />
												<p>{translateMessage(userData.language, "Birthday")}: </p>
											</div>
											<p className="info_item-text">{getDate(userData.birthday)}</p>
										</div>
									)}
									<div className="info_item">
										<div className="info_item-title">
											<MailTwoTone />
											<p>Email: </p>
										</div>
										<p className="info_item-text">{userData.email}</p>
									</div>
									{userData.phone && (
										<div className="info_item">
											<div className="info_item-title">
												<PhoneTwoTone />
												<p>{translateMessage(userData.language, "Phone Number")}: </p>
											</div>
											<p className="info_item-text">{userData.phone}</p>
										</div>
									)}
								</div>
								<div className="profile_card-social">
									<Tooltip title="Facebook">
										<Button
											type="link"
											href="https://google.com"
											icon={<FacebookOutlined />}
											target="_blank"
										></Button>
									</Tooltip>
									<Tooltip title="Twitter">
										<Button
											type="link"
											href="https://google.com"
											icon={<TwitterOutlined />}
											target="_blank"
										></Button>
									</Tooltip>
									<Tooltip title="Github">
										<Button
											type="link"
											href="https://google.com"
											icon={<GithubOutlined />}
											target="_blank"
										></Button>
									</Tooltip>
								</div>
							</Col>
						</Row>
					)}
				</Card>
				<Card bordered={false}>Music Player</Card>
				<Row gutter={[20, 16]}>
					<Col xs={24} sm={24} md={16}>
						<Card bordered={false} title={translateMessage(userData.language, "Bio")}>
							<Paragraph
								ellipsis={{
									rows: 2,
									expandable: true,
									symbol: translateMessage(userData.language, "More"),
								}}
							>
								{userData.bio ? userData.bio : translateMessage(userData.language, "No bio")}
							</Paragraph>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={8}>
						<Card bordered={false}>Archived</Card>
					</Col>
				</Row>
			</Layout>
		</>
	) : (
		<Navigate to="/login" />
	);
}
function getDate(dateStr: string) {
	const date = new Date(dateStr);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

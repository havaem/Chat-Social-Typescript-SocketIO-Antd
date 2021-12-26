import { Button, Col, Divider, Dropdown, Menu, Radio, Row, Space, Tag, Typography } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useAppSelector } from "app/hook";
import { ReactElement, useState } from "react";
import { UserAddOutlined, StopOutlined, FormOutlined } from "@ant-design/icons";
import "./style.scss";
import Avatar from "antd/lib/avatar/avatar";
import ChatBox from "./components/ChatBox";
export default function PublicChat(): ReactElement {
	const userData = useAppSelector((state) => state.user.data);
	const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
	const menu = (
		<Menu>
			<Menu.Item>
				<Button type="text" block size="small" style={{ textAlign: "left" }}>
					<UserAddOutlined />
					Kết bạn
				</Button>
			</Menu.Item>
			<Menu.Item>
				<Button type="text" block size="small" style={{ textAlign: "left" }}>
					<StopOutlined />
					Cấm chat
				</Button>
			</Menu.Item>
			<Menu.SubMenu
				title={
					<Button type="text" block size="small" style={{ textAlign: "left" }}>
						<FormOutlined />
						Vai trò
					</Button>
				}
			>
				<Radio.Group className="role_menu" size="small">
					<Space direction="vertical">
						<Radio value={0} style={{ fontWeight: "bold", color: "red" }}>
							Admin
						</Radio>
						<Radio value={1} style={{ fontWeight: "bold", color: "blue" }}>
							Mod
						</Radio>
						<Radio value={2} style={{ fontWeight: "bold", color: "#00aa77" }}>
							Member
						</Radio>
					</Space>
				</Radio.Group>
			</Menu.SubMenu>
		</Menu>
	);
	return (
		<Layout className="public resize">
			<Content className="public_content">
				<Row className="public_content-row">
					<Col flex="19 19 70%" className="row_chat">
						<ChatBox
							userData={userData}
							isSiderCollapsed={isSiderCollapsed}
							setIsSiderCollapsed={setIsSiderCollapsed}
						/>
					</Col>
					<Col flex="0 4 30%" className={`row_online ${isSiderCollapsed && "d-none"}`}>
						<Content>
							<Divider orientation="left" className="row_online-role admin">
								Admin
							</Divider>
							<Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
								<div className="row_online-item">
									<Avatar src={userData.avatar} />
									<Typography.Text strong className="item_name">
										Võ Hoài Nam
									</Typography.Text>
									<Tag color="#fe1b0a">Admin</Tag>
								</div>
							</Dropdown>

							<Divider orientation="left" className="row_online-role mod">
								Mod
							</Divider>
							<Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
								<div className="row_online-item">
									<Avatar src={userData.avatar} />
									<Typography.Text strong className="item_name">
										Võ Hoài Nam
									</Typography.Text>
									<Tag color="#0000ff">Mod</Tag>
								</div>
							</Dropdown>
							<Divider orientation="left" className="row_online-role mem">
								Member
							</Divider>
							<Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
								<div className="row_online-item">
									<Avatar src={userData.avatar} />
									<Typography.Text strong className="item_name">
										Võ Hoài Nam
									</Typography.Text>
									<Tag color="#00aa77">Member</Tag>
								</div>
							</Dropdown>
						</Content>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

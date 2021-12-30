import { Avatar, Button, Dropdown, Menu, Radio, RadioChangeEvent, Space, Tag, Typography } from "antd";
import { ReactElement } from "react";
import { UserAddOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "constant/pathConstant";
// import { useAppDispatch } from "app/hook";
interface Props {
	user: any;
	role: any;
	roles: any[];
	userRole: any;
	handleChangeRole: any;
}

export default function UserOnlineItem({
	user,
	role,
	roles,
	userRole,
	handleChangeRole,
}: Props): ReactElement {
	console.log("user: ", user);
	console.log("role: ", role);
	const navigate = useNavigate();
	const menu = (
		<Menu>
			<Menu.Item key={"menu1"}>
				<Button
					type="text"
					block
					size="small"
					style={{ textAlign: "left" }}
					onClick={() => {
						navigate(pathConstants.profile + "/" + user.slug);
					}}
				>
					<UserAddOutlined />
					Trang cá nhân
				</Button>
			</Menu.Item>
			{userRole?.permissions.includes("MANAGE_ROLE") && (
				<Menu.SubMenu
					title={
						<Button type="text" block size="small" style={{ textAlign: "left" }}>
							<FormOutlined />
							Vai trò
						</Button>
					}
					key={"menu3"}
				>
					<Radio.Group
						className="role_menu"
						size="small"
						defaultValue={role._id}
						onChange={(event) => {
							handleChangeRole(user, event.target.value);
						}}
					>
						<Space direction="vertical">
							{roles.map((rl, id) => {
								if (userRole?.name === "ADMIN")
									return (
										<Radio
											key={rl._id}
											value={rl._id}
											style={{ fontWeight: "bold", color: rl.color }}
										>
											{rl.name}
										</Radio>
									);
								else if (userRole?.name === "MOD" && id !== 0)
									return (
										<Radio
											key={rl._id}
											value={rl._id}
											style={{ fontWeight: "bold", color: rl.color }}
										>
											{rl.name}
										</Radio>
									);
							})}
						</Space>
					</Radio.Group>
				</Menu.SubMenu>
			)}
		</Menu>
	);
	return (
		<Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]} key={user._id}>
			<div className="row_online-item">
				<div className="item_avatar">
					<Avatar src={user.avatar} />
					<div className="online"></div>
				</div>
				<Typography.Text strong className="item_name">
					{user.name}
				</Typography.Text>
			</div>
		</Dropdown>
	);
}

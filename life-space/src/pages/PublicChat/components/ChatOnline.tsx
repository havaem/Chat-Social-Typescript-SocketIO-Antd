import { Fragment, ReactElement, useEffect, useState } from "react";
import { Divider } from "antd";
import { Content } from "antd/lib/layout/layout";
import UserOnlineItem from "./UserOnlineItem";
import { useAppDispatch } from "app/hook";
import { roleGetAll } from "reducers/asyncThunk/roleThunk";
import { conversationUpdateOne } from "reducers/asyncThunk/conversationThunk";

interface Props {
	socket: any;
	userRole: any;
	conversation: any;
}

export default function ChatOnline({ socket, userRole, conversation }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const [userOnline, setUserOnline] = useState<any[]>([]);
	const [roles, setRoles] = useState<any[]>([]);
	const handleChangeRole = async (user: any, data: any) => {
		try {
			const response = await dispatch(
				conversationUpdateOne({
					id: conversation._id,
					data: {
						...conversation,
						members: conversation.members.map((item: any) => {
							if (item.user._id === user._id) {
								return { ...item, role: data };
							}
							return item;
						}),
					},
				})
			).unwrap();
			socket.current.emit("updateConversation", response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		socket.current.on("getUsers", (data: any) => {
			setUserOnline(data);
		});
	}, [socket]);
	useEffect(() => {
		const fetchAllRole = async () => {
			const res = await dispatch(roleGetAll()).unwrap();
			setRoles(res);
		};
		fetchAllRole();
	}, [dispatch]);
	return (
		<Content>
			{conversation &&
				roles.map((rl) => {
					let itemUserOnline = userOnline.map((userItem: any) => {
						const { user, role } = conversation.members.find(
							(item: any) => item.user._id === userItem.userId
						);
						return (
							role.name === rl.name && (
								<UserOnlineItem
									key={user._id}
									roles={roles}
									user={user}
									role={role}
									userRole={userRole}
									handleChangeRole={handleChangeRole}
								/>
							)
						);
					});
					return (
						<Fragment key={rl._id}>
							<Divider
								orientation="left"
								className="row_online-role"
								style={{ color: rl.color }}
							>
								{rl.name}
							</Divider>
							{itemUserOnline}
						</Fragment>
					);
				})}
		</Content>
	);
}

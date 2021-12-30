import { Avatar, Button, Card, Col, Input, Row, Select, Switch, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { translateMessage } from "constant/messageLanguage";
import Cookies from "js-cookie";
import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useAppDispatch } from "app/hook";
import { socialGetAll } from "reducers/asyncThunk/socialThunk";
import { userUpdate } from "reducers/asyncThunk/userThunk";
import { openNoti } from "utils/Notification";

interface Props {
	data: any;
}

export default function NetworkTab({ data }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const [networks, setNetworks] = useState<any>(null);
	const [network, setNetwork] = useState<any>("");
	const [username, setUsername] = useState(() => {
		let id = 0;
		data.social.find((item: any, index: number) => {
			id = index;
			return item.social_id._id === "61c410f1532482851b9d016e";
		});
		return data?.social[id]?.username || "";
	});
	function handleChange(value: string) {
		setNetwork(networks.find((item: any) => item._id === value));
		data.social.forEach((item: any, index: number) => {
			if (item.social_id._id === value) return setUsername(data.social[index].username);
		});
	}
	const fetchData = async () => {
		try {
			const response = await dispatch(socialGetAll()).unwrap();
			setNetworks(response);
		} catch (error) {
			console.log(error);
		}
	};
	const handleRemoveItem = async (id: string) => {
		try {
			const response = await dispatch(
				userUpdate({
					social: [...data.social].filter((item: any) => item._id !== id),
				})
			).unwrap();
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
	const handleToggleShow = async (id: string) => {
		try {
			let dataSocial = [...data.social];
			let index = dataSocial.findIndex((item: any) => item._id === id);
			let item = { ...dataSocial.find((item: any) => item._id === id) };
			item.status = !item.status;
			dataSocial.splice(index, 1, item);
			const response = await dispatch(
				userUpdate({
					social: dataSocial,
				})
			).unwrap();
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
	const handleAddNetwork = async () => {
		try {
			let dataSocial = [...data.social];
			let index = dataSocial.findIndex((item: any) => item.social_id._id === network._id);
			if (index !== -1) {
				let item = { ...dataSocial.find((item: any) => item.social_id._id === network._id) };
				item.username = username;
				dataSocial.splice(index, 1, item);
			} else {
				dataSocial.push({
					social_id: network._id,
					username,
				});
			}
			const response = await dispatch(
				userUpdate({
					social: dataSocial,
				})
			).unwrap();
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
	useEffect(() => {
		networks && setNetwork(networks[0]);
	}, [networks]);
	useLayoutEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Card
			bordered
			className="setting_tab"
			title={translateMessage(Cookies.get("language"), "Network Integration")}
		>
			<Content className="setting_tab-network">
				{data.social.map((item: any) => (
					<div className="network_item" key={item._id}>
						<div className="network_item-title">
							<Avatar size={"large"} src={item.social_id.icon} />
							<Typography.Title style={{ marginBottom: 0 }} level={5}>
								{item.social_id.name}
							</Typography.Title>
						</div>
						<Typography.Text style={{ marginBottom: 0, marginLeft: "auto" }}>
							{item.username}
						</Typography.Text>
						<div className="network_item-status">
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								defaultChecked={item.status}
								onChange={() => handleToggleShow(item._id)}
								style={{ marginRight: 10 }}
							/>
							<Button
								size="small"
								type="primary"
								shape="circle"
								danger
								onClick={() => {
									handleRemoveItem(item._id);
								}}
								icon={<CloseOutlined />}
							/>
						</div>
					</div>
				))}

				<Row className="network_form" gutter={[16, 16]}>
					<Col xs={24} sm={24} md={7} xl={8}>
						{networks && (
							<Select
								defaultValue={networks[0]._id}
								style={{ width: "100%" }}
								onChange={handleChange}
							>
								{networks?.map((item: any) => (
									<Select.Option key={item._id} value={item._id}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						)}
					</Col>
					<Col xs={24} sm={24} md={14} xl={13}>
						<Input
							addonBefore={network.prefix}
							value={username}
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
					</Col>
					<Col xs={24} sm={24} md={3} xl={3}>
						<Button type="primary" block onClick={handleAddNetwork}>
							Thêm
						</Button>
					</Col>
				</Row>
			</Content>
		</Card>
	);
}

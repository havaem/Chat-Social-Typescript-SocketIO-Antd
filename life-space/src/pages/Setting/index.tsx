import { Tabs } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useAppSelector } from "app/hook";
import { translateMessage } from "constant/messageLanguage";
import { ReactElement } from "react";
import AccountTab from "./components/AccountTab";
import MoreTab from "./components/MoreTab";
import NetworkTab from "./components/NetworkTab";
import "./style.scss";
const { TabPane } = Tabs;

export default function Setting(): ReactElement {
	const userData = useAppSelector((state) => state.user.data);
	function callback(key: any) {
		console.log(key);
	}
	return (
		<Layout className="setting resize">
			<Content>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane
						className="setting_account"
						tab={translateMessage(userData.language, "Account")}
						key="1"
					>
						<AccountTab data={userData} />
					</TabPane>
					<TabPane tab={translateMessage(userData.language, "Network")} key="2">
						<NetworkTab data={userData} />
					</TabPane>
					<TabPane tab={translateMessage(userData.language, "More")} key="3">
						<MoreTab data={userData} />
					</TabPane>
				</Tabs>
			</Content>
		</Layout>
	);
}

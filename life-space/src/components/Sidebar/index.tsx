import Sider from "antd/lib/layout/Sider";
import { ReactElement } from "react";
import "./style.scss";
interface Props {}

export default function Sidebar(props: Props): ReactElement {
	return (
		<Sider
			collapsedWidth={0}
			breakpoint="lg"
			className="sidebar"
			collapsible
			width={300}
			trigger={null}
		></Sider>
	);
}

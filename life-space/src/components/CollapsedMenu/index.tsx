import { ReactElement } from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "app/hook";
import { toggleMenu } from "reducers/menuSlice";

export default function CollapsedMenu(): ReactElement {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector((state) => state.user.data._id) ? true : false;
	const isCollapsable = useAppSelector((state) => state.menu.isCollapsed);
	const handleToggle = () => {
		dispatch(toggleMenu());
	};
	return (
		<>
			{isLogin && (
				<button className={`collapse-button ${!isCollapsable && "open"}`} onClick={handleToggle}>
					<MenuUnfoldOutlined />
				</button>
			)}
		</>
	);
}

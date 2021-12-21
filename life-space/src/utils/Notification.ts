import { notification } from "antd";
export const openNoti = ({
	message,
	description,
	duration,
	type,
}: {
	message: string;
	description: string;
	duration?: number;
	type?: "success" | "error" | "info" | "warning";
}) => {
	switch (type) {
		case "success":
			notification["success"]({
				message,
				description,
				duration: duration || 4,
			});
			break;
		case "info":
			notification["info"]({
				message,
				description,
				duration: duration || 4,
			});
			break;
		case "warning":
			notification["warning"]({
				message,
				description,
				duration: duration || 4,
			});
			break;
		case "error":
			notification["error"]({
				message,
				description,
				duration: duration || 4,
			});
			break;
		default:
			notification.open({
				message,
				description,
				duration: duration || 4,
			});
			break;
	}
};

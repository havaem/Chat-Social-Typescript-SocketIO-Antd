const messageConstant = [
	{
		eng: "Type a message",
		vn: "Nhập tin nhắn",
	},
	{
		eng: "Attach a photo",
		vn: "Đính kèm ảnh",
	},
	{
		eng: "Click to edit your bio",
		vn: "Nhấn vào đây để chỉnh sửa tiếu sử",
	},
	{
		eng: "Public Chat",
		vn: "Phòng Chat Chung",
	},
	{
		eng: "Download",
		vn: "Tải xuống",
	},
	{
		eng: "Network Integration",
		vn: "Tích hợp mạng",
	},
	{
		eng: "No bio",
		vn: "Không có tiểu sử nào",
	},
	{
		eng: "QR Code",
		vn: "Mã QR",
	},
	{
		eng: "Message",
		vn: "Nhắn tin",
	},
	{
		eng: "Birthday",
		vn: "Sinh nhật",
	},
	{
		eng: "Wallet",
		vn: "Ví",
	},
	{
		eng: "Recharge",
		vn: "Nạp tiền",
	},
	{
		eng: "Log out",
		vn: "Đăng xuất",
	},
	{
		eng: "A small project containing large projects created for the purpose of hard work",
		vn: "Một dự án nho nhỏ chứa các dự án lớn được tạo ra nhằm mục đích trị bệnh chăm chỉ",
	},
	{
		eng: "About Me",
		vn: "Giới thiệu",
	},
	{
		eng: "Getting Started",
		vn: "Bắt đầu nào",
	},
	{
		eng: "Re-entered password does not match!",
		vn: "Mật khẩu nhập lại không trùng khớp!",
	},
	{
		eng: "Password min 8 and max 30 characters including uppercase, lowercase and numbers!",
		vn: "Mật khẩu tối thiểu 8 và tối đa 30 ký tự bao gồm chữ hoa, chữ thường và số!",
	},
	{
		eng: "Username has 8 characters or more and can contain letters, numbers and underscores",
		vn: "Tên tài khoản gồm 8 ký tự trở lên và có thể chứa chữ cái, số và dấu gạch dưới",
	},
	{
		eng: "Did you make a mistake? This page doesn't exist!",
		vn: "Bạn có nhần lẫm gì không? Trang này có tồn tại đâu!",
	},
	{
		eng: "If you already have an account. Log in",
		vn: "Nếu đã có tài khoản. Đăng nhập",
	},
	{
		eng: "If you don't have an account. Sign up",
		vn: "Nếu chưa có tài khoản. Đăng ký",
	},
	{
		eng: "here!",
		vn: "tại đây",
	},
	{
		eng: "Confirm password",
		vn: "Nhập lại mật khẩu",
	},
	{
		eng: "Forgot password",
		vn: "Quên mật khẩu",
	},
	{
		eng: "Password cannot be null",
		vn: "Vui lòng nhập mật khẩu",
	},
	{
		eng: "Username cannot be null",
		vn: "Vui lòng nhập tên tài khoản",
	},
	{
		eng: "Username",
		vn: "Tên tài khoản",
	},
	{
		eng: "Username cannot be changed",
		vn: "Tên tài khoản không thể thay đổi",
	},
	{
		eng: "Please confirm the password!",
		vn: "Vui lòng xác nhận mật khẩu!",
	},
	{
		eng: "Upgrade your account to use this feature",
		vn: "Nâng cấp tài khoản để sử dụng tính năng này",
	},
	{
		eng: "Password",
		vn: "Mật khẩu",
	},
	{
		eng: "New Password",
		vn: "Mật khẩu mới",
	},
	{
		eng: "Confirm",
		vn: "Xác nhận",
	},
	{
		eng: "Password",
		vn: "Mật khẩu",
	},
	{
		eng: "Language",
		vn: "Ngôn ngữ",
	},
	{
		eng: "Phone Number",
		vn: "Số điện thoại",
	},
	{
		eng: "Date of Birth",
		vn: "Ngày sinh",
	},
	{
		eng: "User Name",
		vn: "Họ và tên",
	},
	{
		eng: "Save",
		vn: "Lưu",
	},
	{
		eng: "Change",
		vn: "Đổi",
	},
	{
		eng: "Save changes",
		vn: "Lưu thay đổi",
	},
	{
		eng: "Update avatar",
		vn: "Cập nhật ảnh đại diện",
	},
	{
		eng: "Change Password",
		vn: "Đổi mật khẩu",
	},
	{
		eng: "Edit image",
		vn: "Chỉnh sửa hình ảnh",
	},
	{
		eng: "Basic Infomation",
		vn: "Thông tin cơ bản",
	},
	{
		eng: "More",
		vn: "Xem thêm",
	},
	{
		eng: "Network",
		vn: "Mạng xã hội",
	},
	{
		eng: "Account",
		vn: "Tài khoản",
	},
	{
		eng: "Account",
		vn: "Tài khoản",
	},
	{
		eng: "More",
		vn: "Xem thêm",
	},
	{
		eng: "Bio",
		vn: "Tiểu sử",
	},
	{
		eng: "Verify",
		vn: "Đã xác minh",
	},
	{
		eng: "Account",
		vn: "Tài khoản",
	},
	{
		eng: "Profile",
		vn: "Hồ Sơ",
	},
	{
		eng: "Settings",
		vn: "Cài Đặt",
	},
	{
		eng: "Server Error",
		vn: "Lỗi máy chủ",
	},
	{
		eng: "Reset Password",
		vn: "Đặt lại mật khẩu",
	},
	{
		eng: "Password changed successfully!",
		vn: "Thay đổi mật khẩu thành công!",
	},
	{
		eng: "Password reset successfully!",
		vn: "Đặt lại mật khẩu thành công!",
	},
	{
		eng: "Forget Password",
		vn: "Quên mật khẩu",
	},
	{
		eng: "We sent a password reset link to your email!",
		vn: "Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến email của bạn!",
	},
	{
		eng: "Failed",
		vn: "Thất bại",
	},
	{
		eng: "Success",
		vn: "Thành công",
	},
	{
		eng: "Forget Password",
		vn: "Quên mật khẩu",
	},
	{
		eng: "Submit",
		vn: "Gửi",
	},
	{
		eng: "Welcome to us! Wish you have a good experience.",
		vn: "Chào mừng bạn đến với chúng tôi! Chúc bạn có một trải nghiệm tốt.",
	},
	{
		eng: "Successful verification!",
		vn: "Xác minh tài khoản thành công",
	},
	{
		eng: "Successful verification!",
		vn: "Xác minh tài khoản thành công",
	},
	{
		eng: "Login",
		vn: "Đăng nhập",
	},
	{
		eng: "Register",
		vn: "Đăng ký",
	},
	{
		eng: "Hello!",
		vn: "Xin chào!",
	},
	{
		eng: "Register failed!",
		vn: "Đăng ký thất bại!",
	},
	{
		eng: "Your account is not verified!",
		vn: "Tài khoản chưa được xác minh!",
	},
	{
		eng: "Please check your email to verify your account!",
		vn: "Vui lòng kiểm tra email để xác minh tài khoản!",
	},
	{
		eng: "Logout successfully!",
		vn: "Đăng xuất thành công!",
	},
	{
		eng: "Login failed!",
		vn: "Đăng nhập thất bại!",
	},
	{
		eng: "Register successfully!",
		vn: "Đăng ký thành công!",
	},
	{
		eng: "Login successfully!",
		vn: "Đăng nhập thành công!",
	},
	{
		eng: "User created successfully!",
		vn: "Tạo tài khoản thành công!",
	},
	{
		eng: "Username is exist!",
		vn: "Tên tài khoản đã tồn tại!",
	},
	{
		eng: "Email is exist!",
		vn: "Email đã tồn tại!",
	},
	{
		eng: "User not found!",
		vn: "Tài khoản này không tồn tại!",
	},
	{
		eng: "Please verify your account!",
		vn: "Vui lòng xác minh tài khoản của bạn!",
	},
	{
		eng: "Account was banned! Contact me for any questions.",
		vn: "Tài khoản bị khóa! Liên hệ chúng tôi nếu có câu hỏi",
	},
	{
		eng: "Password incorrect!",
		vn: "Sai mật khẩu!",
	},
	{
		eng: "Email address is not verified!",
		vn: "Email của bạn chưa được xác minh!",
	},
	{
		eng: "User updated successfully!",
		vn: "Cập nhật thông tin thành công!",
	},
];
export const translateMessage = (type = "vi", message: string): string => {
	switch (type) {
		case "en":
			const messageResEN = messageConstant.find((item) => item.eng === message);
			!messageResEN && console.log("message: ", message);
			return messageResEN ? messageResEN.eng : message;
		case "vi":
			const messageResVN = messageConstant.find((item) => item.eng === message);
			!messageResVN && console.log("message: ", message);
			return messageResVN ? messageResVN.vn : message;
		default:
			return message;
	}
	// eslint-disable-next-line no-unreachable
	if (!type) return message;
};

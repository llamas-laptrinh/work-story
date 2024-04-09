import { Avatar, Typography, Button, Flex } from "antd";

export default function LeaderBoardItem() {
  return (
    <Flex vertical justify="center" align="center">
      <Button type="primary">1</Button>
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
      />
      <Typography.Title level={5}>User name</Typography.Title>
      <Typography.Text>XP: 5000</Typography.Text>
    </Flex>
  );
}

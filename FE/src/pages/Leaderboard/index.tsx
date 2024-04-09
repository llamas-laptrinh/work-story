import { Flex, List } from "antd";
import LeaderBoardItem from "../../components/LeaderBoardItem";
import { FolderOutlined } from "@ant-design/icons";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const top3 = items.splice(0, 3);
export default function LeaderBoard() {
  return (
    <Flex>
      <Flex flex={3} vertical gap={36}>
        <Flex gap={36} justify="center">
          {top3.map(() => (
            <LeaderBoardItem />
          ))}
        </Flex>

        <Flex justify="space-around" gap="small">
          {items.map(() => (
            <LeaderBoardItem />
          ))}
        </Flex>
      </Flex>
      <Flex flex={1} vertical>
        <List
          dataSource={[1, 2, 3]}
          renderItem={() => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<FolderOutlined />}
                  title={<a href="https://ant.design">{"item.title"}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                ajsdljasdlk
              </List.Item>
            );
          }}
        />
      </Flex>
    </Flex>
  );
}

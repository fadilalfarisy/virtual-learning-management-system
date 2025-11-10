import { Flex, Button, Input } from "antd";

type Props = {
  onSearch: (value: any) => void;
  showDrawer: (value: any) => void;
};

export const SearchBar = ({ onSearch, showDrawer }: Props) => {
  return (
    <Flex gap={"large"}>
      <Input.Search
        placeholder="Search"
        onSearch={onSearch}
        enterButton
        allowClear
      />
      <Button color="primary" variant="outlined" onClick={showDrawer}>
        Filter
      </Button>
    </Flex>
  );
};

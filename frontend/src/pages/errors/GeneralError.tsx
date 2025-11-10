import { Result } from "antd";
import { BackButton, RefreshButton } from "../../components";

export const ErrorPage = () => {
  return (
    <div className="center-content">
      <Result
        status="error"
        title="404 Not Found"
        subTitle="Sorry, your page is not available"
        extra={[
          <BackButton type="primary" key={1} />,
          <RefreshButton key={2} />,
        ]}
      />
    </div>
  );
};

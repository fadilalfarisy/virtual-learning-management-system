import { useParams } from "react-router-dom";
import { Result, Typography, Button } from "antd";
import { BackButton } from "../../components";
import { useGetReferenceByIdQuery } from "../../state/api";

const { Title, Paragraph } = Typography;

interface IReferences {
  _id: string;
  title: string;
  link: string;
  channel: string;
  summary: string;
}

export const ReferenceDetail = () => {
  const { id } = useParams();

  const { data, isError, isSuccess } = useGetReferenceByIdQuery(id);

  if (isError) {
    return (
      <Result
        status="error"
        title="Something Error"
        subTitle="Oops, Your can't access this page."
      />
    );
  }
  if (isSuccess) {
    const { title, link, channel, summary }: IReferences = data;
    return (
      <>
        <Title level={4} className="margin-0">
          {title}
        </Title>
        <Paragraph type="secondary">{channel}</Paragraph>

        <Button type="primary" style={{ marginBottom: "12px" }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Watch
          </a>
        </Button>
        <Paragraph style={{ textAlign: "justify" }}>{summary}</Paragraph>

        <div style={{ display: "flex", justifyContent: "end" }}>
          <BackButton />
        </div>
      </>
    );
  }
};

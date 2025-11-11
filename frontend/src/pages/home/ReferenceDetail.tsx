import { useParams } from "react-router-dom";
import { Result, Typography, Button, message } from "antd";
import { BackButton } from "../../components";
import {
  useGenerateSummaryMutation,
  useGetReferenceByIdQuery,
} from "../../state/api";
import { useState } from "react";

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
  const [summaryValue, setSummaryValue] = useState("");

  const { data, isError, isSuccess } = useGetReferenceByIdQuery(id);
  const [generateSummary, { isLoading: onGenerate }] =
    useGenerateSummaryMutation();

  const onGenerateSummary = async (link: string) => {
    try {
      const response = await generateSummary({ link }).unwrap();
      console.log(response);
      setSummaryValue(response.summary);
      console.log(link);
    } catch (error: any) {
      console.log(error);
      if (error.data) {
        message.error(error.data.error);
      } else {
        message.error("Failed to summarize youtube video");
      }
    }
  };

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
        <Paragraph style={{ textAlign: "justify" }}>
          {" "}
          {summaryValue == "" ? summary : summaryValue}
        </Paragraph>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button loading={onGenerate} onClick={() => onGenerateSummary(link)}>
            Generate new summary
          </Button>
          <BackButton />
        </div>
      </>
    );
  }
};

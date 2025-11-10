import { PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Table, Result, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TitlePage, ActionTable } from "../../components";
import {
  useDeleteReferenceMutation,
  useGetAllCoursesQuery,
  useLazyGetAllCoursesQuery,
  useLazyGetAllReferencesCreatedByQuery,
  useGetAllReferencesCreatedByQuery,
} from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";
import { SearchBar } from "../../components/Form/SearchBar";
import { FilterReference } from "../../components/Form/FilterReference";

interface DataType {
  _id: string;
  title: string;
  channel: string;
  link: string;
  courseId: {
    _id: string;
    course: string;
    semester: number;
  };
  createdBy: {
    _id: string;
    fullName: string;
  };
}

export interface IFilterReference {
  search: string;
  semester: number | undefined;
  sort: number;
  skip: number;
  limit: number;
  courseId: string;
}

const defaultFilter: IFilterReference = {
  search: "",
  semester: undefined,
  sort: 0,
  skip: 0,
  limit: 10,
  courseId: "",
};

export const Reference = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<IFilterReference>(defaultFilter);

  const {
    data: initialValueReference,
    isSuccess,
    isError,
  } = useGetAllReferencesCreatedByQuery({});
  const [getReferencesWithFilter, { data: filteredReferences }] =
    useLazyGetAllReferencesCreatedByQuery();
  const [deleteReference] = useDeleteReferenceMutation();

  const listReferences =
    filteredReferences?.response ?? initialValueReference?.response;
  const pagination =
    filteredReferences?.pagination ?? initialValueReference?.pagination;

  const { data: initialCourse } = useGetAllCoursesQuery({});
  const [getCourseWithFilter, { data: courseBySemester }] =
    useLazyGetAllCoursesQuery();
  const initialOptionCourse = initialCourse?.response.map((item: any) => {
    return { label: item.course, value: item._id };
  });
  const optionCourseBySemester = courseBySemester?.response.map((item: any) => {
    return { label: item.course, value: item._id };
  });

  const optionCourse = optionCourseBySemester ?? initialOptionCourse;

  const onSearch = async (value: any) => {
    try {
      const queryFilter = {
        ...filter,
        search: value,
      };
      setFilter(queryFilter);
      await getReferencesWithFilter(queryFilter);
    } catch (error) {
      errorHandling(error);
    }
  };

  const onChangePagination = async (page: number, pageSize: number) => {
    let skip = (page - 1) * pageSize;
    let limit = pageSize;
    let values = filter;
    try {
      await getReferencesWithFilter({ ...values, skip, limit });
    } catch (error) {
      errorHandling(error);
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      width: "1%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "3%",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      width: "2%",
    },
    {
      title: "Link",
      dataIndex: "link",
      render: (record) => (
        <Button type="primary" size="small">
          <a href={record} target="_blank" rel="noopener noreferrer">
            Watch
          </a>
        </Button>
      ),
      width: "1%",
    },
    {
      title: "Course",
      dataIndex: ["courseId", "course"],
      width: "2%",
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "fullName"],
      width: "1%",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: "1%",
      fixed: "right",
      render: (record) => (
        <ActionTable
          id={record}
          onDelete={deleteReference}
          linkEditButton={`/dashboard/references/update/${record}`}
        />
      ),
    },
  ];

  if (isError) {
    return (
      <Result
        status="error"
        title="403 Forbidden"
        subTitle="Oops, Your can't access this page."
      />
    );
  }

  if (isSuccess) {
    return (
      <>
        <TitlePage title="List Reference" description="Reference course">
          <Button
            type="primary"
            onClick={() => navigate("/dashboard/references/create")}
            icon={<PlusOutlined />}
          >
            Add Reference
          </Button>
        </TitlePage>
        <SearchBar
          onSearch={(value: any) => onSearch(value)}
          showDrawer={() => setOpen(true)}
        />

        <Drawer
          title="Filter"
          width={400}
          onClose={() => setOpen(false)}
          open={open}
          destroyOnClose={false}
        >
          <FilterReference
            optionCourse={optionCourse}
            onFilterCourse={getCourseWithFilter}
            onFilterReference={getReferencesWithFilter}
            filter={filter}
            setFilter={setFilter}
            setOpen={setOpen}
          />
        </Drawer>
        <Table<DataType>
          columns={columns}
          dataSource={listReferences}
          scroll={{ x: "max-content" }}
          rowKey="_id"
          pagination={{
            pageSize: filter.limit,
            total: pagination.totalItems,
            onChange: onChangePagination,
          }}
        />
      </>
    );
  }
};

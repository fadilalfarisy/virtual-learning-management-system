import { HeartFilled, HeartTwoTone } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Table, Result, Drawer, theme } from "antd";
import { useState } from "react";
import { TitlePage } from "../../components";
import {
  useGetAllReferencesQuery,
  useGetAllCoursesQuery,
  useLazyGetAllCoursesQuery,
  useLazyGetAllReferencesQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarkQuery,
} from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";
import { SearchBar } from "../../components/Form/SearchBar";
import { FilterReference } from "../../components/Form/FilterReference";
import { useNavigate } from "react-router-dom";

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
  bookmark: boolean;
}

export interface FilterReference {
  search: string;
  semester: number | undefined;
  sort: number;
  skip: number;
  limit: number;
  courseId: string;
}

const defaultFilter: FilterReference = {
  search: "",
  semester: undefined,
  sort: 0,
  skip: 0,
  limit: 10,
  courseId: "",
};

export const ListReferences = () => {
  const {
    token: { colorError },
  } = theme.useToken();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterReference>(defaultFilter);

  const { data: initialBookmarks } = useGetBookmarkQuery({});
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [addBookmark] = useAddBookmarkMutation();

  const {
    data: initialValueReference,
    isSuccess,
    isError,
  } = useGetAllReferencesQuery({});
  const [getReferencesWithFilter, { data: filteredReferences }] =
    useLazyGetAllReferencesQuery();

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
      console.log({ ...values, skip, limit });
    } catch (error) {
      errorHandling(error);
    }
  };

  const onDeleteBookmark = async (referenceId: string) => {
    try {
      await removeBookmark({ referenceId }).unwrap();
    } catch (error) {
      errorHandling;
    }
  };

  const onAddBookmark = async (referenceId: string) => {
    try {
      await addBookmark({ referenceId }).unwrap();
    } catch (error) {
      errorHandling;
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      width: 1,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 15,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      width: 3,
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
      width: 1,
    },
    {
      title: "Course",
      dataIndex: ["courseId", "course"],
      width: 3,
    },
    {
      title: "Bookmark",
      dataIndex: "_id",
      align: "center",
      hidden: !initialBookmarks,
      width: 1,
      render: (value, record) => (
        <>
          {initialBookmarks?.bookmarks.some(
            (item: any) => item._id == value
          ) ? (
            <HeartFilled
              onClick={() => onDeleteBookmark(record._id)}
              style={{ fontSize: 20, color: colorError, padding: 6 }}
            />
          ) : (
            <HeartTwoTone
              onClick={() => onAddBookmark(record._id)}
              twoToneColor={colorError}
              style={{ fontSize: 20, padding: 6 }}
            />
          )}
        </>
      ),
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "fullName"],
      width: 1,
    },
    {
      title: "Details",
      dataIndex: "_id",
      width: 1,
      render: (value) => {
        return (
          <Button
            type="link"
            size="small"
            onClick={() => navigate(`/references/summary/${value}`)}
          >
            Read
          </Button>
        );
      },
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
        <TitlePage title="List Reference" description="Reference course" />
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

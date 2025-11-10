import { PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Table, Result, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TitlePage, ActionTable } from "../../components";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useLazyGetAllCoursesQuery,
} from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";
import { SearchBar } from "../../components/Form/SearchBar";
import { FilterCourse } from "../../components/Form/FilterCourse";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface DataType {
  _id: string;
  course: string;
  semester: number;
}

export interface IFilterCourse {
  search: string;
  semester: number | undefined;
  sort: number;
  skip: number;
  limit: number;
}

const defaultFilter: IFilterCourse = {
  search: "",
  semester: undefined,
  sort: 0,
  skip: 0,
  limit: 5,
};

export const Course = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<IFilterCourse>(defaultFilter);
  const auth = useSelector((state: RootState) => state.auth);

  const {
    data: initialValueCourse,
    isError,
    isSuccess,
  } = useGetAllCoursesQuery(filter);
  const [getCourseWithFilter, { data: filteredCourses }] =
    useLazyGetAllCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  const listCourse = filteredCourses?.response ?? initialValueCourse?.response;
  const pagination =
    filteredCourses?.pagination ?? initialValueCourse?.pagination;

  const onSearch = async (value: any) => {
    try {
      setFilter({
        ...filter,
        search: value,
      });

      console.log(filter);
      await getCourseWithFilter({
        ...filter,
        search: value,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const onChangePagination = async (page: number, pageSize: number) => {
    let skip = (page - 1) * pageSize;
    let limit = pageSize;
    let values = filter;
    try {
      await getCourseWithFilter({ ...values, skip, limit });
      console.log({ ...values, skip, limit });
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
      title: "Course",
      dataIndex: "course",
      width: "5%",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      width: "5%",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: "1%",
      hidden: auth.role != "ADMIN",
      fixed: "right",
      render: (record) => (
        <ActionTable
          id={record}
          onDelete={deleteCourse}
          linkEditButton={`/dashboard/courses/update/${record}`}
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
        <TitlePage title="List Course" description="Course information system">
          <Button
            type="primary"
            onClick={() => navigate("/dashboard/courses/create")}
            icon={<PlusOutlined />}
          >
            Add Course
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
          <FilterCourse
            onFilterCourse={getCourseWithFilter}
            filter={filter}
            setFilter={setFilter}
            setOpen={setOpen}
          />
        </Drawer>

        <Table<DataType>
          columns={columns}
          dataSource={listCourse}
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

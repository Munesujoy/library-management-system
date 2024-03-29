import React, { useState } from "react";
import { PaginatedTable, ColType } from "chakra-paginated-table";
import { IUserBooks } from "@/types/interfaces";
import { TRowSelection } from "./definitions";
import { Button } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

type handleColumns = (rowData: IUserBooks, action: TRowSelection) => void;

interface IProps {
	data: IUserBooks[];
	handleOpen: handleColumns;
}

const columns: (handleOpen: handleColumns) => ColType<IUserBooks>[] = (
	handleOpen,
) => {
	return [
		{
			title: "Book Name",
			key: "title",
			dataKey: "title",
		},
		{
			title: "Description",
			key: "description",
			dataKey: "description",
		},
		{
			title: "Quantity",
			key: "quantity",
			dataKey: "quantity",
		},
		{
			title: "Action",
			key: "action",
			dataKey: undefined,
			render: (record) => (
				<>
					<Button
						colorScheme="red"
						leftIcon={<BsTrash />}
						size="sm"
						onClick={() => handleOpen(record, "delete")}
						mr={2}
					>
						Delete
					</Button>
					<Button
						colorScheme="blue"
						leftIcon={<AiFillEdit />}
						size="sm"
						onClick={() => handleOpen(record, "edit")}
					>
						Edit
					</Button>
				</>
			),
		},
	];
};

const BooksTable = (props: IProps) => {
	const { handleOpen } = props;
	const [pageNum, setPageNum] = useState(1);

	return (
		<PaginatedTable<IUserBooks>
			dataSource={props?.data}
			columns={columns(handleOpen)}
			rowKey={(record) => record?.id}
			ThProps={{ color: "white" }}
			THeadProps={{
				bgColor: "purple.300",
			}}
			containerProps={{
				maxHeight: { md: "calc(100vh - 300px)", base: "calc(100vh - 200px)" },
				overflowY: "auto",
			}}
			pagination={{
				page: pageNum,
				pageSize: 10,
				total: props?.data?.length,
				onchange(newPage) {
					setPageNum(newPage);
				},
				containerProps: {
					mt: 2,
				},
				position: "bottomRight",
				__selectedBtnProps: { bgColor: "purple.200" },
			}}
		/>
	);
};

export default BooksTable;

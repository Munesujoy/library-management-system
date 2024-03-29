import { RootState } from "@/redux/store";
import {
	createAppointment,
	getAppointments,
	getUserAppointments,
	updateAppointment,
} from "@/services/api/service/appointments";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

interface IValues {
	userId: string;
	email: string;
	date: string;
	phoneNumber: string;
	resolved: boolean;
}

export const useAppointments = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useSelector((settings: RootState) => settings.auth.user);
	const isAuthorized = useSelector(
		(state: RootState) => state.auth.isAuthorized,
	);

	const { data, refetch } = useQuery("appointments", getAppointments, {
		refetchOnMount: false,
		enabled: !!isAuthorized && user?.isadmin,
	});

	const { data: dataSource } = useQuery(
		["user-appointments", user?.id],
		() => getUserAppointments(user?.id ?? ""),
		{
			refetchOnMount: false,
			enabled: !!isAuthorized && !user?.isadmin,
		},
	);

	const { mutate, isLoading } = useMutation(createAppointment, {
		onSuccess: (res) => {
			toast({
				description: res.message,
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			onClose();
		},

		onError: (err: any) => {
			toast({
				description: err.response.data.error,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		},
	});

	const { mutate: updateMutation } = useMutation(
		"updateAppointment",
		updateAppointment,
		{
			onSuccess: (res) => {
				toast({
					description: res.message,
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
				refetch();
			},
			onError: (err: any) => {
				toast({
					description: err.response.data.error,
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
			},
		},
	);
	const formik = useFormik<IValues>({
		initialValues: {
			email: "",
			date: "",
			phoneNumber: "",
			userId: "",
			resolved: false,
		},
		onSubmit: (values) => {
			const payload = {
				...values,
				userId: user?.id || "",
				email: user?.email || "",
			};
			mutate(payload);
		},
	});

	const handleChange = (values: any) => {
		const payload = {
			id: values.id,
			value: true,
		};

		updateMutation(payload);
		console.log(values);
	};

	return {
		formik,
		isOpen,
		onOpen,
		onClose,
		isLoading,
		data,
		dataSource,
		handleChange,
	};
};

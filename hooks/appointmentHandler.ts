import { RootState } from "@/redux/store";
import {
	createAppointment,
	getAppointments,
	getUserAppointments,
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

	const handleChange = (event: any) => {
		console.log(event);
	};

	const { data, refetch } = useQuery("appointments", getAppointments, {
		refetchOnMount: false,
		enabled: !!isAuthorized,
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
				description:
					"Appointment Successfully booked Please wait for the admin to confirm",
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

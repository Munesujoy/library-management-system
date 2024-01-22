import { api } from "../apiClient";

interface IValues {
	userId: string;
	email: string;
	date: string;
	phoneNumber: string;
}
export async function createAppointment(values: IValues) {
	return await api.post("/book-appointment", values).then((res) => res.data);
}
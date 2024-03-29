import { PaginationOptions } from "@/types/interfaces";
import Appointment from "../model/appointments";
import User from "../model/user";

interface AppointmentsResponse {
	data: Appointment[];
	page: number;
	pageCount: number;
	total: number;
}

class AppointmentService {
	async createAppointment(
		email: string,
		date: Date,
		phoneNumber: string,
		userId: string,
		resolved: boolean,
	): Promise<Appointment> {
		try {
			const existingUnresolvedAppointment = await Appointment.findOne({
				where: {
					userId,
					resolved: false,
				},
			});

			if (existingUnresolvedAppointment) {
				const error = new Error(
					"User already has an unresolved appointment.",
				) as any;
				error.statusCode = 402;
				throw error;
			}

			const appointment = await Appointment.create({
				email,
				date,
				phoneNumber,
				userId,
				resolved,
			});

			return appointment;
		} catch (error) {
			console.error("Error creating appointment:", error);
			throw error;
		}
	}

	async updateAppointment(
		appointmentId: string,
		resolved: boolean,
	): Promise<Appointment> {
		try {
			const appointment = await Appointment.findByPk(appointmentId);

			if (!appointment) {
				const error = new Error("Appointment not found.") as any;
				error.statusCode = 404;
				throw error;
			}

			appointment.resolved = resolved;
			await appointment.save();

			return appointment;
		} catch (error) {
			console.error("Error updating appointment:", error);
			throw error;
		}
	}

	async getAppointmentsByUserId(userId: string): Promise<Appointment[]> {
		try {
			const appointments = await Appointment.findAll({
				where: { userId },
				include: [
					{
						model: User,
						attributes: { exclude: ["password"] },
					},
				],
			});

			return appointments;
		} catch (error) {
			console.error("Error getting appointments:", error);
			throw error;
		}
	}
	async getAllAppointments(
		options: PaginationOptions,
	): Promise<AppointmentsResponse> {
		try {
			const { page, pageSize } = options;

			const offset = (page - 1) * pageSize;

			const { rows: data, count } = await Appointment.findAndCountAll({
				offset,
				limit: pageSize,
				include: [
					{
						model: User,
						attributes: { exclude: ["password"] },
					},
				],
				order: [["createdAt", "DESC"]],
			});

			const pageCount = Math.ceil(count / pageSize);

			const response: AppointmentsResponse = {
				data,
				page,
				pageCount,
				total: count,
			};

			return response;
		} catch (error) {
			console.error("Error getting appointments:", error);
			throw error;
		}
	}
}

export default new AppointmentService();

import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";


export function useExistsMutation() {
	return useMutation({
		mutationKey: ['exists'],
		mutationFn: (token: string) => authService.fetchExistsInfo(token),
		onSuccess(data: any) {
			if (data?.email) {
			  console.log(`Аккаунт с email ${data.email} уже существует`);
			}
		  },
		  onError(error) {
			console.error('Ошибка при получении информации об аккаунте:', error);
		  }

	})
}
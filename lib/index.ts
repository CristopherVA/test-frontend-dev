import { AxiosError } from "axios";

export const handlerError = (error: unknown): string[] => {
    const errorsArr: string[] = []

    if (error instanceof AxiosError) {
        const errorsData = Array(error?.response?.data?.errors?.data)

        if (!errorsData[0].length) return [error?.response?.data?.errors?.message]

        for (const iterator of errorsData) {
            for (const iterator2 of iterator) {
                for (const key in iterator2) {
                    if (Object.prototype.hasOwnProperty.call(iterator2, key)) {
                        const element = iterator2[key];
                        errorsArr.push(element[0])
                    }
                }
            }
        }

    }

    return errorsArr
}
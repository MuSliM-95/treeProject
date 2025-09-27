import { AppDispatch, RootState } from "@/app/store/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
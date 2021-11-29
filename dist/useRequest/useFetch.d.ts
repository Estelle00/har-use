import { Ref } from "vue";
import { FetchResult, Options, Plugin, Service } from "./types";
export default function useFetch<TData, TParams extends unknown[]>(serviceRef: Ref<Service<TData, TParams>>, options: Options<TData, TParams>, plugins: Plugin<TData, TParams>[]): FetchResult<TData, TParams>;

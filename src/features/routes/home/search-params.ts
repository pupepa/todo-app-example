import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParam = {
  sort: parseAsString.withDefault("id"),
  order: parseAsString.withDefault("asc"),
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
};

export const searchParamsCache = createSearchParamsCache(searchParam);

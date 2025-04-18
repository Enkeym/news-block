import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { data } from "../data"
import { IData_SnippetNews } from "../interfaces/news"

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getNewsSnippet: builder.query<IData_SnippetNews, number>({
      queryFn: (id: number) => {
        if (id === data.ID) {
          return { data }
        } else {
          return {
            error: {
              status: 404,
              statusText: "Not found",
              data: "News not found"
            }
          }
        }
      }
    })
  })
})

export const { useGetNewsSnippetQuery } = newsApi

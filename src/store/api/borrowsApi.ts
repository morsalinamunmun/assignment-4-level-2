import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface Borrow {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  dueDate: string;
  borrowedAt: string;
}

export interface BorrowSummaryItem {
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

export const borrowsApi = createApi({
  reducerPath: 'borrowsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/borrow`,
  }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<Borrow, BorrowRequest>({
      query: (borrowData) => ({
        url: '',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow'],
    }),

    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/summary',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowsApi;

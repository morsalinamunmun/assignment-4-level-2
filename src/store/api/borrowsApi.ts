
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BorrowRequest {
  bookId: string;
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
    baseUrl: '/api/borrows',
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
      // Mock implementation
      queryFn: async ({ borrowData }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const borrow: Borrow = {
          id: Date.now().toString(),
          bookId: borrowData.bookId,
          bookTitle: 'Sample Book',
          isbn: '978-0-000-00000-0',
          quantity: borrowData.quantity,
          dueDate: borrowData.dueDate,
          borrowedAt: new Date().toISOString(),
        };
        return { data: borrow };
      }
    }),

    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/summary',
      providesTags: ['Borrow'],
      // Mock implementation
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          data: [
            {
              bookTitle: 'The Great Gatsby',
              isbn: '978-0-7432-7356-5',
              totalQuantityBorrowed: 8
            },
            {
              bookTitle: 'To Kill a Mockingbird',
              isbn: '978-0-06-112008-4',
              totalQuantityBorrowed: 5
            }
          ]
        };
      }
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowsApi;

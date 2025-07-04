// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Interfaces
// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   description: string;
//   copies: number;
//   available: boolean;
//   coverImage?: string;
//   length?: number; 
// }

// export interface CreateBookRequest {
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   description: string;
//   copies: number;
//   available?: boolean;
//   coverImage?: string;
// }

// export interface UpdateBookRequest extends Partial<CreateBookRequest> {
//   id: string;
// }

// type BookListResponse = {
//   data: Book[]
// }

// getBooks: builder.query<BookListResponse, void>({
//   query: () => '',
//   providesTags: ['Book'],
// }),


// // Base URL from .env
// const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/books`;

// export const booksApi = createApi({
//   reducerPath: 'booksApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//   }),
//   tagTypes: ['Book'],
//   endpoints: (builder) => ({
//     // GET /api/books
//     getBooks: builder.query<Book[], void>({
//       query: () => '',
//       providesTags: ['Book'],
//     }),

//     // GET /api/books/:id
//     getBook: builder.query<Book, string>({
//       query: (id) => `/${id}`,
//       providesTags: (_result, _error, id) => [{ type: 'Book', id }],
//     }),

//     // POST /api/books
//     createBook: builder.mutation<Book, CreateBookRequest>({
//       query: (newBook) => ({
//         url: '',
//         method: 'POST',
//         body: newBook,
//       }),
//       invalidatesTags: ['Book'],
//     }),

//     // PATCH /api/books/:id
//     updateBook: builder.mutation<Book, UpdateBookRequest>({
//       query: ({ id, ...patch }) => ({
//         url: `/${id}`,
//         method: 'PATCH',
//         body: patch,
//       }),
//       invalidatesTags: (_result, _error, { id }) => [{ type: 'Book', id }],
//     }),

//     // DELETE /api/books/:id
//     deleteBook: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Book'],
//     }),
//   }),
// });

// // Hooks
// export const {
//   useGetBooksQuery,
//   useGetBookQuery,
//   useCreateBookMutation,
//   useUpdateBookMutation,
//   useDeleteBookMutation,
// } = booksApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  coverImage?: string;
}

type BookListResponse = {
  data: Book[];
  length?: number;
};

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/books`,
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<BookListResponse, void>({
      query: () => '',
      providesTags: ['Book'],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),

    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),

    updateBook: builder.mutation<Book, Partial<Book> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Book', id }],
    }),

    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

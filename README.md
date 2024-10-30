# Fastyr Frontend Test

A Next.js application demonstrating frontend development capabilities using modern web technologies.


## Project Structure
```
fastyr-frontend-test/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── users/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── albums/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── users/
│   │   ├── UserCard.tsx
│   │   ├── UserForm.tsx
│   │   └── UserList.tsx
│   ├── albums/
│   │   ├── AlbumTable.tsx
│   │   ├── AlbumForm.tsx
│   │   ├── AlbumImport.tsx
│   │   └── BulkActions.tsx
│   └── ui/
│       └── DataTable.tsx
├── lib/
│   ├── apollo/
│   │   └── client.ts
│   └── utils/
│       ├── file-import.ts
│       └── validation.ts
└── types/
    ├── user.ts
    └── album.ts
```


2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```
NEXT_PUBLIC_GRAPHQL_URL=https://graphqlzero.almansi.me/api
```

4. Run the development server:

```bash
npm run dev
```

## Features

### Users Module
- List all users with card-based layout
- Create, update, and delete users
- Responsive grid layout
- Detail view with user information

### Albums Module
- Advanced data table with search and filter capabilities
- Bulk delete functionality
- CSV/XLSX import feature with validation
- Detailed view for individual albums
- CRUD operations

## Deployment

This project is deployed on Vercel for the following reasons:
- Native Next.js support with zero configuration
- Automatic deployments on git push
- Built-in CI/CD pipeline
- Edge network for optimal performance
- Free tier available for testing
- Easy environment variable management
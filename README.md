# 1. Create Typescript Project and SetUp Prisma

## Create Project

```bash
npm i -D typescript node-ts @types/node nodemon
```

Initialize Typescript:

```bash
npx tsc --init
```

## Install Prisma CLI:

```bash
npm i -D prisma
```

SetUp Prisma:

```bash
npx prisma init --datasource-provider mysql
```

# 2. Model your Data

```ts
// prisma/schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

# 3. Create Tables in Database

```bash
npx prisma migrate dev --name init
```

# 4. Send Queries to Database with Prisma Client

Create a client that allows us to use and generate prisma-client-js (All of the code for interacting with database).

```bash
npm i @prisma/client
```

Manually generate client

```bash
npx prisma generate
```

Create a main.ts file where all of our code will go.

```bash
touch main.ts
```

```ts
// main.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .catch(async (e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

# Deep Dive into Prisma Models and Schema

It consists of 4 fields.

- name
- type
- modifier (Optional)
- attributes (Optional)

e.g:

```ts
model User {
  id Int @id @default(autoincrement())
}

model Post {
  id String @id @default(uuid())
}
```

## Types

- `Int`
- `String`
- `Boolean`
- `DateTime` ( Timestamp )
- `Json` ( Object )
- `Model` ( Existing Model in Your Database that is used for Relations )

Less Used Types:

- `Decimal` ( High Accuracy )
- `BigInt` ( Very Large Number )
- `FLoat` ( General Floating Point Number i.e; Less Specific )
- `Bytes` ( Raw Data / Blob )
- `Unsupported("")`

## Field Type Modifier

- `[]` ( Used for arrays e.g:- `Int[]` )
- `?` ( Optional Field e.g:- `Int?` )

## Attributes

- `@default(`param`)` - ( default value for the field )
- `@updatedAt` - ( whenever Model is updated it sets the value to current timestamp )
- `@unique` - ( Mark field as unique )
- `@relation` - ( Used for Relationships b/w Models )

## Block-Level Attributes

- `@@unique([`fields`])` - ( Specified fields should have unique values )
- `@@index([`fields`])` - ( Specified fields will be used for querying )
- `@@id([`fields`])` - ( Composite id formed by specified fields )

```ts
// users could have same name and different ages
// users could have same age and different names
// But users could not have same names and same ages
model User {
  id             String          @id @default(uuid())
  name           String
  age            Int

  @@unique([age, name])
}
```

## Relationships

`@relation`("optional_relation_name", `fields`: [current_model_field], `references`: [referenced_model_field] )

### 1. One-to-One

```ts

model User {
  id            String  @id @default(uuid())
  userPreference         UserPreference?
}

model UserPreference {
  id            String   @id @default(uuid())
  user        User     @relation(fields: [userId], references: [id])
  userId      String @unique
}
```

### 2. One-to-Many:

```ts

model User {
  id            String  @id @default(uuid())
  posts         Post[]  @relation("posts")
  favoritePosts Post[]  @relation("favoritePosts")
}

model Post {
  id            String   @id @default(uuid())
  author        User     @relation("posts", fields: [authorId], references: [id])
  authorId      String
  favoritedBy   User?    @relation("favoritePosts", fields: [favoritedById], references: [id])
  favoritedById String?
}
```

### 3. Many-to-Many:

```ts

model User {
  id            String  @id @default(uuid())
  posts         Post[]  @relation("posts")
  favoritePosts Post[]  @relation("favoritePosts")
}

model Post {
  id            String   @id @default(uuid())
  author        User     @relation("posts", fields: [authorId], references: [id])
  authorId      String
  favoritedBy   User?    @relation("favoritePosts", fields: [favoritedById], references: [id])
  favoritedById String?
  categories Category[]
}

model Category {
  id String @id @default(uuid())
  posts Post[]
}
```

<br />
<br />
<br />

# Enum

```ts
model User {
  id             String          @id @default(uuid())
  role           Role            @default(NORMAL)
}

enum Role {
  NORMAL
  ADMIN
}


```

<br />
<br />
<br />

# Prisma Client Methods

Create only one instance of prisma client, save in a file and use it everywhere:

```ts
import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()
```

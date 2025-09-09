<div align="center">
  <img src="public/logotype_variant.svg" alt="Project Logo" width="400" />

  ### ARQADE by [mariware](https://github.com/mariware)
  Cascade into your own arcade.
</div>

## 📖 Features 

**ARQADE** is a mock digital game store designed to showcase a curated catalog of games. Users can browse titles, explore game pages, and simulate the shopping cart experience within a sleek and responsive interface. 

- 🕹️ **Game Catalog**: Browse a curated selection of games.  
- 📄 **Game Details**: View ratings, estimated playtime, and screenshots on dedicated pages.  
- 🛒 **Cart & Checkout**: Add games to your cart and calculate totals.  
- 🔎 **Database Queries**: Includes built-in database query handling.  
- 🎨 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile.

## 🚀 Tech Stack

This project leverages the following modern web development stack:  

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" height="14" alt="React" /> [**React**](https://react.dev/): component-based UI, basic state management
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" height="14" alt="ReactRouter" /> [**ReactRouter**](https://reactrouter.com/): app routing, backend services
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="14" alt="TailwindCSS" /> [**TailwindCSS**](https://tailwindcss.com/): utility-first styling  
- [**daisyUI**](https://daisyui.com/): prebuilt, accessible UI components  
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" height="14" alt="MySQL"/> [**MySQL**](https://www.mysql.com/) with [**Drizzle ORM**](https://orm.drizzle.team/): database and schema management

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/product-catalog.git
cd product-catalog
```
Install dependencies:

```bash
npm install
```

Set up MySQL with Docker:
```
docker run --name drizzle-mysql -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql
```

Initialize the database:
```
npx drizzle-kit generate
npx drizzle-kit migrate
npx tsx app/db/seed.ts
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📸 Screenshots

<div align="center">
  <img src="public/screenshots/01.jpeg" alt="screenshot1" width="49%" />
  <img src="public/screenshots/02.jpeg" alt="screenshot2" width="49%" />
  <img src="public/screenshots/03.jpeg" alt="screenshot3" width="49%" />
  <img src="public/screenshots/04.jpeg" alt="screenshot4" width="49%" />
</div>

## 📝 Notes

This project was developed as part of a technical assessment. Deployment was not required as part of its scope.
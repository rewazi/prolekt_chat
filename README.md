# How start next.js app
1. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
2. npx create-next-app@latest chat
    - Would you like to use the recommended Next.js defaults? No, customize settings
    - Would you like to use TypeScript? Yes
    - Which linter would you like to use? None
    - Would you like to use React Compiler? Yes (But if you dont install Rect Compiler it's okay, we download that later)
    - Would you like to use Tailwind CSS? Yes
    - Would you like your code inside a `src/` directory? Yes
    - Would you like to use App Router? (recommended) Yes
    - Would you like to use Turbopack? (recommended) Yes
    - Would you like to customize the import alias (`@/*` by default)? No
3. cd chat
4. npm install @heroui/react@latest  
5. npm install babel-plugin-react-compiler (if you don't download React Compiler)
6. Download project from https://github.com/rewazi/projekt_chat
7. Move the project to chat and replace everything necessary.
8. npm run dev

# How start websocket and chat
1. Turn On Apache and MySQL in XAMPP
2. Load projekt.sql
3. Download Setup Composer PHP https://getcomposer.org/download/
4. Open Setup Composer PHP
5. On Developer Mode
6. Choose folder (doesn't matter) and download
7. Choose the command-line PHP: ...\xampp\php\php.exe
8. Proxy doesn't matter
9. Install
10. "cd path" and "composer require cboden/ratchet"
11. open cd ...\xampp\htdocs\server and php index.php
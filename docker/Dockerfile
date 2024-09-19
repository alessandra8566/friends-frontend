# 1. 使用官方 Node.js 基礎映像，從該映像進行構建
FROM node:20 AS build

# 2. 設置工作目錄
WORKDIR /app

# 3. 複製 package.json 和 package-lock.json (如果有)
COPY package*.json ./

# 4. 安裝項目依賴
RUN npm install

# 5. 複製所有文件到工作目錄
COPY . .

# 6. 構建前端應用
RUN npm run build

# 7. 使用 Nginx 來提供靜態文件
FROM nginx:alpine

# 8. 複製前端構建的輸出到 Nginx 的默認目錄
COPY --from=build /app/build /usr/share/nginx/html

# 9. 暴露端口
EXPOSE 80

# 10. 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
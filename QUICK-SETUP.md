# 🚀 FocoWork Mini App - QUICK SETUP

## ⚠️ IMPORTANTE: Files tạm thời

Repository này chỉ mới upload được 3 files chính:
- ✅ `package.json` - Dependencies
- - ✅ `server.js` - Main server
  - - ✅ `config/database.js` - Database config
   
    - ## 📋 Các files còn lại cần tạo:
   
    - ### Folder: `/models/`
    - - Employee.js
      - - Task.js
        - - Company.js
         
          - ### Folder: `/routes/`
          - - task.js
            - - employee.js
              - - department.js
                - - request.js
                  - - approval.js
                    - - attendance.js
                     
                      - ### Folder: `/middleware/`
                      - - auth.js
                       
                        - ### Root files:
                        - - `.env.example` - Template biến môi trường
                          - - `db-schema.sql` - SQL schema
                           
                            - ## 🚀 Hướng dẫn upload nhanh (Git CLI)
                           
                            - Nếu bạn có máy tính với Git đã cài đặt:
                           
                            - ```bash
                              # 1. Clone repository
                              git clone https://github.com/quangtrucng-svg/focowork-mini-app.git
                              cd focowork-mini-app

                              # 2. Tạo các thư mục
                              mkdir -p models routes middleware

                              # 3. Copy tất cả source code từ file FULL-SOURCE-CODE.md
                              # (Bạn sẽ nhận được tất cả code ở đó)

                              # 4. Commit và push
                              git add .
                              git commit -m "Add complete FocoWork source code"
                              git push origin main
                              ```

                              ## 📦 Database Setup

                              ```bash
                              # Mở MySQL
                              mysql -u root -p

                              # Tạo database
                              CREATE DATABASE focowork_db;
                              USE focowork_db;

                              # Import schema (sẽ upload db-schema.sql sau)
                              source db-schema.sql;
                              ```

                              ## 🔧 Cấu hình .env

                              ```bash
                              # Copy .env.example thành .env
                              cp .env.example .env

                              # Edit .env với thông tin của bạn
                              DB_HOST=localhost
                              DB_USER=root
                              DB_PASSWORD=yourpassword
                              ZALO_APP_ID=your_app_id
                              ZALO_APP_SECRET=your_app_secret
                              ```

                              ## ▶️ Chạy server

                              ```bash
                              npm install
                              npm run dev
                              ```

                              Server sẽ chạy tại: `http://localhost:3000`

                              ## 📚 Bước tiếp theo

                              1. Cấu hình Zalo Developers
                              2. 2. Đăng ký Mini App
                                 3. 3. Liên kết với OA FORZ POWER
                                    4. 4. Test API endpoints
                                      
                                       5. ---
                                      
                                       6. **Liên hệ hỗ trợ nếu gặp vấn đề!**

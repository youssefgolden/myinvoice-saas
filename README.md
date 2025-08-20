# Invoicer (NestJS + Next.js)

Backend: NestJS + TypeORM + PostgreSQL (Render)  
Frontend: Next.js (Vercel)
Github CICD , Jest, Sonar

## Backend progress
- [x] TypeORM config (Render SSL)
- [x] Entities: User, Client, BusinessProfile, Invoice
- [ ] Entity: InvoiceItem
- [ ] DTO + Controllers + Services
- [ ] Auth (JWT)
- [ ] PDF endpoint

## Run backend (dev)
```bash
cd backend
cp .env.example .env
npm i
npm run migration:generate
npm run migration:run
npm run start:dev

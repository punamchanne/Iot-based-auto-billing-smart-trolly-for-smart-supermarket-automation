# Smart QR-Based Billing System (MERN)

A production-ready self-scanning billing system inspired by modern retail. Features include real-time camera-based QR scanning, dynamic cart management, and a robust admin dashboard for product and QR label generation.

---

## 🚀 🔄 COMPLETE PROJECT WORKFLOW

### 🧑‍💻 1) ADMIN SIDE WORKFLOW (System Setup)
👉 **Step-by-step:**
1. Admin login करतो
2. Product add करतो:
   - Name
   - Price
   - Stock
3. System प्रत्येक product साठी unique ID generate करतो
4. त्या ID वरून QR code generate होतो
5. Admin QR download करून product वर stick करतो

🎯 **Result:** 👉 Physical product + QR code ready

---

### 👤 2) USER SIDE WORKFLOW (Customer Experience)
🏠 **Step 1: User Login**
- User app open करतो
- Login/Register करतो
- Dashboard ला जातो

📸 **Step 2: Scanner Open**
- “Scan Product” button click
- Camera ON

🔍 **Step 3: QR Scan**
- User product वरचा QR scan करतो
👉 *Internally:* `QR → Product ID → Backend API call`

⚡ **Step 4: Product Fetch**
- Backend DB check करतो
- Product details return करतो

🛒 **Step 5: Add to Cart**
- Product cart मध्ये add होतो
- Same product scan → quantity increase

🔁 **Step 6: Repeat**
- User multiple products scan करतो

💳 **Step 7: Checkout**
- Cart open & Total amount show
- Payment select (UPI/Cash)

🧾 **Step 8: Order Complete**
- Order DB मध्ये save & Receipt generate

---

### 🖥️ 3) BILLING / POS WORKFLOW (Shop Side)
👉 **Option 1: User Self-Checkout**
- User स्वतः scan करतो
- Direct payment करतो

👉 **Option 2: POS Counter**
- Billing screen open
- Staff scanner वापरतो
- Products scan होतात
- Cart live update होतं
- Discount apply (optional)
- Payment accept & Bill print

---

## 🔄 SYSTEM FLOW (FULL DATA FLOW)

```text
[Camera Scan]
     ↓
[QR Decode]
     ↓
[Product ID]
     ↓
[Backend API]
     ↓
[Database Fetch]
     ↓
[Return Product Data]
     ↓
[Frontend Cart Update]
     ↓
[Billing Calculation]
     ↓
[Order Save]
```

---

## ⚙️ INTERNAL LOGIC FLOW

**🧠 Cart Logic:**
- If product exists → `quantity +1`
- Else → `new item add`

**🧮 Billing Logic:**
- `Subtotal = sum(price × qty)`
- GST add → `Final total`

**🔐 Auth Flow:**
- Login → `JWT token`
- हर API call मध्ये token verify

**🚨 ERROR FLOW (Important)**
- 👉 **If camera denied:** Show “Allow camera access”
- 👉 **If invalid QR:** Show “Invalid product”
- 👉 **If product not found:** Show error
- 👉 **If API fail:** Retry / error message

---

## 🎯 REAL-TIME BEHAVIOR
- Scan → instant add (<1 sec)
- No reload, Smooth UI
- Toast: “Item Added”

🔥 **FINAL SIMPLE UNDERSTANDING**
- 👉 **Admin** → product + QR तयार करतो
- 👉 **User** → scan करून cart बनवतो
- 👉 **System** → auto bill calculate करतो
- 👉 **POS** → payment + receipt

---

## 🛠️ Tech Stack & Setup

- **Frontend**: React.js (Vite), Tailwind CSS, Axios, html5-qrcode.
- **Backend**: Node.js, Express.js, JWT, Bcrypt.js, Mongoose.
- **Database**: MongoDB (Local/Atlas).

### **1. Clone & Setup Backend**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/qr-billing-system
JWT_SECRET=yoursecretkey
```
Start the backend server:
```bash
node server.js
```

### **2. Setup Frontend**
```bash
cd frontend
npm install
```
Start the frontend dev server:
```bash
npm run dev
```

### Developed with ❤️ for Smart Retail.

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");
const setupSwagger = require("./swagger/swagger");

//
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cartItemRoutes = require("./routes/cart_itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const customerAddressRoutes = require("./routes/customer_addressRoutes");
const customerCardRoutes = require("./routes/customer_cardRoutes");
const customerRoutes = require("./routes/customerRoutes");
const deliveryMethodRoutes = require("./routes/delivery_methodRoutes");
const discountRoutes = require("./routes/discountRoutes");
const districtRoutes = require("./routes/districtRoutes");
const eventTypeRoutes = require("./routes/event_typeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const flatRoutes = require("./routes/flatRoutes");
const genderRoutes = require("./routes/genderRoutes");
const humanCategoryRoutes = require("./routes/human_categoryRoutes");
const langRoutes = require("./routes/langRoutes");
const paymentMethodRoutes = require("./routes/payment_methodRoutes");
const regionRoutes = require("./routes/regionRoutes");
const seatTypeRoutes = require("./routes/seat_typeRoutes");
const seatRoutes = require("./routes/seatRoutes");
const sectorRoutes = require("./routes/sectorRoutes");
const ticketStatusRoutes = require("./routes/ticket_statusRoutes");
const ticketTypeRoutes = require("./routes/ticket_typeRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const typesRoutes = require("./routes/typesRoutes");
const venuePhotoRoutes = require("./routes/venue_photoRoutes");
const venueTypesRoutes = require("./routes/venue_typesRoutes");
const venueRoutes = require("./routes/venueRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors({ origin: "*" }));

//
app.use("/api", adminRoutes);
app.use("/api", bookingRoutes);
app.use("/api", cartItemRoutes);
app.use("/api", cartRoutes);
app.use("/api", customerAddressRoutes);
app.use("/api", customerCardRoutes);
app.use("/api", customerRoutes);
app.use("/api", deliveryMethodRoutes);
app.use("/api", discountRoutes);
app.use("/api", districtRoutes);
app.use("/api", eventTypeRoutes);
app.use("/api", eventRoutes);
app.use("/api", flatRoutes);
app.use("/api", genderRoutes);
app.use("/api", humanCategoryRoutes);
app.use("/api", langRoutes);
app.use("/api", paymentMethodRoutes);
app.use("/api", regionRoutes);
app.use("/api", seatTypeRoutes);
app.use("/api", seatRoutes);
app.use("/api", sectorRoutes);
app.use("/api", ticketStatusRoutes);
app.use("/api", ticketTypeRoutes);
app.use("/api", ticketRoutes);
app.use("/api", typesRoutes);
app.use("/api", venuePhotoRoutes);
app.use("/api", venueTypesRoutes);
app.use("/api", venueRoutes);

setupSwagger(app);

sequelize
    .sync()
    .then(() => {
      console.log("Bazaga ulandi");
      app.listen(PORT, '0.0.0.0', () => {
        console.log('Server ishlayapti');
        console.log(`Local: http://localhost:${PORT}/api-docs`);
      });  
    })

    .catch((err) => console.error("Baza xatosi", err));
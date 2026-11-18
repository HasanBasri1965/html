import mongoose from "mongoose";
import dns from "node:dns";

// Bazı yerel/okul ağlarında SRV kaydı çözümleme hatasını (EBADRESP) önlemek için güvenilir DNS eklenir
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Sistem varsayılanı kullanılır
}

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil");
  }
  await mongoose.connect(uri);
  const { host, name } = mongoose.connection;
  const yer = uri.startsWith("mongodb+srv://")
    ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}

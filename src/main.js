import { Client, Users } from "node-appwrite";

export default async ({ req, res, log }) => {
  try {
    // إعداد الاتصال بـ Appwrite
    const client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('68f12002d82428fd9b8d')
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new Users(client);

    // الحصول على ID المستخدم من الحدث
    const userId = req.body?.userId || req.body?.$userId || req.body?.$id;

    if (!userId) {
      log("⚠️ لم يتم العثور على معرف المستخدم.");
      return res.json({ success: false, error: "No user ID found" });
    }

    // تحديث الـ labels
    await users.updateLabels(userId, ["user"]);

    log(`✅ Added label 'user' to user ${userId}`);
    return res.json({
      success: true,
      message: `Label 'user' added to user ${userId}`,
    });

  } catch (error) {
    log(`❌ Error: ${error.message}`);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

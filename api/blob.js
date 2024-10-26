import { put } from "@vercel/blob";

export default async function handler(req, res) {
    // 在访问该 API 时创建 a.txt 文件
    const { url } = await put("a.txt", "Hello World!", { access: "public" });
    
    // 返回文件的 URL
    res.status(200).json({ message: "File created successfully", url });
}

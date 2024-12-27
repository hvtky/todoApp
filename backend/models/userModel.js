const db = require('../config/db');

const User = {
    findByEmail: async (email, callback) => {
        const client = await db();
        const database = client.db('todos');
        const collection = database.collection('users');
        try {
            const user = await collection.findOne({ email: email });
            if(user != null) {callback(false, user);}
            else {callback(false, false);}
        } catch (error) {
            callback(error, null); // Gọi callback với lỗi nếu có
        } finally {
            await client.close(); // Đảm bảo đóng kết nối sau khi hoàn tất
        }
    },
    create: async (user, callback) => {
        User.findByEmail(user.email, async (req, res) =>{
            if(req == false && res != false) {
                callback(null, 'Email đã tồn tại');
            } else {
                const client = await db();
                const database = client.db('todos');
                const collection = database.collection('users');
                try {
                    const result = await collection.insertOne(user);
                    if(result.acknowledged) callback(null, result); // Gọi callback với dữ liệu mới tạo
                    else callback(null, 'Tạo tài khoản thất bại');
                } catch (error) {
                    callback(error, null); // Gọi callback với l��i nếu có
                } finally {
                    await client.close(); // Đảm bảo đóng kết nối sau khi hoàn tất
                }
            }
        })
    }
};

module.exports = User;
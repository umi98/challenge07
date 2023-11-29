const express = require('express');
const { PrismaClient } = require('@prisma/client')
const { sendMail, sendMailHtml } = require('../../../../utils/nodemailer');
const { encryptPassword, checkPassword } = require('../../../../utils/auth');
const { JWTsign } = require('../../../../utils/jwt');
const randtoken = require('rand-token');

const prisma = new PrismaClient();

function sendEmailReset(email, token) {
    // const { email } = req.body;
    // const token = token;
    const subject = "Reset password";
    let content = `<p>Permintaan mengubah password diterima. Untuk melanjutkan harap klik <a href="http://localhost:3000/reset-password?token=${token}">di sini</a>`;
    sendMail(email, subject, content);
}

module.exports = {
    async resetPasswordEmail(req, res) {
        const { email } = req.body;
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (user) {
            const resetLink = toString(JWTsign(user));
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    resetLink: resetLink
                }
            })
            sendEmailReset(email, resetLink);

            return res.status(200).json({
                message: "Check email"
            })
        }
    },

    async resetPassword(req, res) {
        const resetLink = req.params.token;
        const newPassword = req.body;

        const user = await prisma.user.findFirst({
            resetLink: resetLink
        })

        if (user) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    password: await encryptPassword(newPassword),
                    resetLink: null
                }
            });

            return res.status(200).json({
                message: "Password updated"
            })
        }
    },

    async getAll (req, res) {
        const { search, page = 1, limit = 10} = req.query;
        let users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        });

        if (!users.length) {
            return res.status(200).json({
                status: 'success', 
                code: 200, 
                message: 'Data empty',
                data: users
            })
        }
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Daftar user',
            data: users
        })
    }
}
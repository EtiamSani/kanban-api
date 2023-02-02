const { sequelize , Card } = require('./models');

async function createUserTest()
{
    console.log('bbbbbbrrrr')
}

async function updateUserTest()
{
    console.log('bbbbbbrrrr')
}

async function deleteUserTest()
{
    console.log('bbbbbbrrrr')
}

async function getUserTest()
{
    const recuperation = await Invite.findByPk(1)

    if(recuperation.nom != "")
    {
        console.log("Test getUserTest : OK")
    }else{
        console.log("Test getUserTest : KO")
    }
}

async function getAllUserTest()
{
    console.log('bbbbbbrrrr')
}

async function main() {
    createUserTest()
    updateUserTest()
    deleteUserTest()
    getUserTest()
    getAllUserTest()
}

main()
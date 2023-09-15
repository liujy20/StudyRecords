export default {
    namespace:"",
    actions:{
        async deleteUser(){
            return await this.asyncdeleteUser()
        }
    }
}

mapAction(["deleteUser"])

const res = await deleteUser()
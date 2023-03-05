const sequelize = require('sequelize');
const model = require('../models');
const categoria = model.Categoria;

module.exports = {
    async create(request, response){
        try{
            const {
                descricao
            } = request.body

            const Categoria = await categoria.create({
                descricao
            });

            return response.json({msg: "Categoria register with sucess!!!"});

        }catch (error) {
            return response.json({msg: "Impossible register Categoria!!!" + error})
        }
    },

    async update(request, response){
        try {
            const { id } = request.params;

            const{
                descricao
            } = request.body

            const Categoria = await categoria.update({
                descricao
            }, { where: { id } });

            return response.json({msg: "Categoria updated with sucess!!!"})

        } catch (error) {
            return response.json({msg: "Impossible update Categoria!!!" + error})
        }
    },

    async findAll(request, response){
        try {
            const { page } = request.params;
            const limite = 5;

            const Categoria = await categoria.findAndCountAll({
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            })
            
            return response.json(Categoria);

        } catch (error) {
            return response.json("Error list Categoria" + error);
        }
    },

    async delete(request, response){
        try {
            const {id} = request.params
            const Categoria = await categoria.destroy({
                where: {
                    id:id
                }
            });
            return response.json({msg: "Delete with sucess"});
        } catch (error) {
            return response.json({msg: "Error delete" + error})
        }
    }
}
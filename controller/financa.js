const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const financa = model.Financa;
const categoria = model.Categoria;

module.exports = {
    async create(request, response){
        try{
            const {
                data,
                categoria_id,
                titulo,
                valor
            } = request.body

            const Financa = await financa.create({
                data,
                categoria_id,
                titulo,
                valor
            });

            return response.json({msg: "Financa register with sucess!!!"});

        }catch (error) {
            return response.json({msg: "Impossible register Financa!!!" + error})
        }
    },

    async update(request, response){
        try {
            const { id } = request.params;

            const{
                data,
                categoria_id,
                titulo,
                valor
            } = request.body

            const Financa = await financa.update({
                data,
                categoria_id,
                titulo,
                valor
            }, { where: { id } });

            return response.json({msg: "Financa updated with sucess!!!"})

        } catch (error) {
            return response.json({msg: "Impossible update Financa!!!" + error})
        }
    },

    async findAll(request, response){
        try {
            const { page } = request.params;
            const limite = 20;

            const Financa = await financa.findAndCountAll({
                order: [
                    ['data', 'ASC']
                ],
                include: {
                    all:true
                },
                limit: limite,
                offset: parseInt(page)
            })
            
            return response.json(Financa);

        } catch (error) {
            return response.json("Error list Financa" + error);
        }
    },

    async findAllDate(request, response){
        try {
            const { page, dataInicial, dataFinal } = request.params;
            const limite = 20;

            const Financa = await financa.findAndCountAll({
                limit: limite,
                offset: parseInt(page),
                include: {
                    all: true
                },
                where:{
                    data:{
                        [Op.gte]: dataInicial,
                        [Op.lte]: dataFinal
                    }
                }
               
            })
            
            return response.json(Financa);

        } catch (error) {
            return response.json("Error list Financa" + error);
        }
    },

    async delete(request, response){
        try {
            const {id} = request.params
            const Financa = await financa.destroy({
                where: {
                    id:id
                }
            });
            return response.json({msg: "Delete with sucess"});
        } catch (error) {
            return response.json({msg: "Error delete" + error})
        }
    },

    async findByIdCategoria(request, response){
        try{
        const {id} = request.params;
        var saldo = 0;
        var soma = 0;

        const Categoria = await categoria.findOne({
            where: { id: id }
        });

        const Financa = await financa.findAll({
            where: {
                categoria_id : parseInt(id)
            },
            include:{
                all:true
            }
        });

        if (Financa.lenght ===0){
            return response.json({Categoria, saldo});
        }
        else{
            for(soma of Financa){
                saldo = saldo + soma.valor;
            }
            return response.json({Categoria, saldo});
        }

    }catch (error){
        return response.json("Error list financas by categoria " + error)
    }

    }
}
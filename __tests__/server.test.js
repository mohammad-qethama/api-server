'use strict';

const { server } = require('../src/server.js');
const superGoose = require('@code-fellows/supergoose');
const { it, expect } = require('@jest/globals');
const request = superGoose(server);


describe('api server', () => {
    let idFood;
    let idClothes;
    it('should create a new food/clothes using post request', async () => {
        //arrange
        let food = {
            name: 'angus prime',
            type: 'beef'
        }
        let shirt = {
            size:'medium',
            color: 'black'
        }
        //act
        const responseFood = await request.post('/food').send(food);
        const responseClothes = await request.post('/clothes').send(shirt);
        //assert
        expect(responseFood.status).toEqual(201);
        expect(responseFood.body.name).toEqual('angus prime');
        expect(responseFood.body.type).toEqual('beef');
        expect(responseFood.body._id.length).toBeGreaterThan(0);

        expect(responseClothes.status).toEqual(201);
        expect(responseClothes.body.size).toEqual('medium');
        expect(responseClothes.body.color).toEqual('black');
        expect(responseClothes.body._id.length).toBeGreaterThan(0);

        idFood = responseFood.body._id;
        idClothes = responseClothes.body._id;
        // console.log({idFood});
    });

      
    it('should read the food/clothes list',async ()=>{

        const responseFood = await request.get('/food');
        const responseClothes = await request.get('/clothes');
        
        
        expect(responseClothes.status).toEqual(200);
        expect(responseClothes.body.length).toBeGreaterThan(0);
        expect(responseClothes.body[0].size).toEqual('medium');
        expect(responseClothes.body[0].color).toEqual('black');
        
        expect(responseFood.status).toEqual(200);
        expect(responseFood.body.length).toBeGreaterThan(0);
        expect(responseFood.body[0].name).toEqual('angus prime');
        expect(responseFood.body[0].type).toEqual('beef');
        


    });

    it('should read the food/clothes item',async ()=>{

        const responseFood = await request.get(`/food/${idFood}`);
        const responseClothes = await request.get(`/clothes/${idClothes}`);
        
        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

       expect(responseFood.body[0].name).toEqual('angus prime');
        expect(responseFood.body[0].type).toEqual('beef');

        expect(responseClothes.body[0].size).toEqual('medium');
        expect(responseClothes.body[0].color).toEqual('black');



    });



    it('should update a clothes/food using put request', async () => {
        //arrange
        let editFood = {
            name: 'seabass',
            type: 'fish'
        };

        let editShirt = {
            size :'large',
            color:'grey'
        }
        //act
        const responseFood = await request.put(`/food/${idFood}`).send(editFood);
        const responseClothes = await request.put(`/clothes/${idClothes}`).send(editShirt);
                   
        //asert
        
        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

        expect(responseFood.body.name).toEqual('seabass');
        expect(responseFood.body.type).toEqual('fish');

        expect(responseClothes.body.size).toEqual('large');
        expect(responseClothes.body.color).toEqual('grey');

    });

    it('should delete the clothes/food item(s)',async()=>{

        const responseFood  = await request.delete(`/food/${idFood}`) ;
        const responseClothes  = await request.delete(`/Clothes/${idClothes}`) ;

        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

        expect(responseFood.body.name).toEqual('seabass');
        expect(responseFood.body.type).toEqual('fish');

        expect(responseClothes.body.size).toEqual('large');
        expect(responseClothes.body.color).toEqual('grey');

        // expect(responseFood.status).toEqual(200);
        // expect(responseClothes.status).toEqual(200);

        // expect(responseFood.body.length).toEqual(0);
        // expect(responseClothes.body.length).toEqual(0);
        
        

    })
        it('should be notFound error',async ()=>{
        const res = await request.patch('/food');
        expect(res.status).toEqual(404);
      
        });

    it('should be notFound error',async ()=>{
        const res = await request.get('/sad');
        expect(res.status).toEqual(404);
      
      });
});



    


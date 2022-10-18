import pool from '../database';
import dotenv from 'dotenv';
import { deleteOne } from '../controllers/usersControllers';

dotenv.config();

type orderProduct={
  product_id:number,
  quantity:number

}
export type order={
  products:orderProduct[],
  status:string,
  user_id:number  
}

type returnOrder={
  order_id:number
  products:orderProduct[],
  status:string,
  user_id:number  

}

export class orders{

  async create(o:order):Promise<returnOrder>{
    const {user_id,status,products}=o

    try{
      const conn=await pool.connect()
      const sql=`insert into orders (user_id,status) values ($1 ,$2) returning *`
      const result=await conn.query(sql,[user_id,status])
      const order =result.rows[0]
      

      const orderProductsSql=`insert into order_products (order_id,product_id,quantity) values ($1,$2,$3) returning product_id ,quantity`
      const orderProducts=[]
      for (const p of products){
        const {product_id ,quantity}=p
        const result=await conn.query(orderProductsSql,[order.order_id,product_id,quantity])
        orderProducts.push(result.rows[0])


      }
      conn.release()
      return {
        ...order,
        products:orderProducts
      }

    }
    catch(err){
      throw `couldn't add  a new order for user ${user_id}`
      // throw err

    }
  }
  async index():Promise<returnOrder[]>{
    try{
      const conn=await pool.connect()
      const sql=`select * from orders `
      const result=await conn.query(sql)
      const orderProductSql=`select product_id , quantity from order_products where order_id=($1)    `
      const rows=result.rows
      let orders:returnOrder[]=[];

      for (const o of rows){
        const order=await conn.query(orderProductSql,[o.order_id])
        orders.push(
          {
            products:order.rows,
            ...o

          }
      )




      }
      conn.release()

      return orders
        
      

    }
    
    catch(err){
      throw err
    }
  }
  async deleteOne(id:number){
    try{
      const conn=await pool.connect()
      const orderProductSql=`delete from order_products where order_id=$1`
      await conn.query(orderProductSql,[id])
      const sql='delete from orders where order_id=$1'
      await conn.query(sql,[id])
      conn.release()

 
    }
    
    catch(err){
      throw `the order with id : ${id} couldnt be deleted`
    }
  }

  async delete(){
    try{
      const conn=await pool.connect()
      const orderProductSql=`delete from order_products `
      await conn.query(orderProductSql)
      const sql='delete from orders '
      await conn.query(sql)
      conn.release()

 
    }
    
    catch(err){
      throw err
    }
  }
  async getCompletedOrdersByUser(id:number):Promise<returnOrder[]>{

    try{
      const conn=await pool.connect()
    const sql=`select * from orders where status=$1 AND user_id=$2`
    const result=await conn.query(sql,['complete',id])
    const orderProductSql=`select product_id ,quantity from order_products where order_id=$1`
    const rows=result.rows
    let orders:returnOrder[]=[];

    for (const o of rows){
      const completedOrders=await conn.query(orderProductSql,[o.order_id])
      orders.push({
        ...o,
        products:completedOrders.rows
      })



    }
    conn.release()
    return orders

  }catch(err){
    throw err


  }




    
   
    

  }
  async getCurrentOrder(id:number):Promise<returnOrder[]>{
    try{

      const conn=await pool.connect()
      const sql=`select * from orders where user_id=$1`
      const result=await conn.query(sql,[id])
      const orderProductSql=`select product_id ,quantity from order_products where order_id=$1`
      const rows=result.rows
      let orders:returnOrder[]=[];
      for (const o of rows){
        const currentOrders=await conn.query(orderProductSql,[o.order_id])
        orders.push({
          ...o,
          products:currentOrders.rows
        })
  
  
  
      }

      conn.release()
      return orders
  

    }
    
    catch(err){
      throw err
    }
  }


}